/**
 * GALAXIA ANDINACODE X - Gestor de Audio
 * Manejo centralizado de todos los efectos de audio y música
 */

class AudioManager {
  constructor() {
    this.audioElements = new Map();
    this.isEnabled = this.loadAudioPreference();
    this.masterVolume = GalaxiaConfig.get('DEFAULT_VOLUME');
    this.fadeTimeouts = new Map();
    
    this.initializeAudio();
    this.setupEventListeners();
  }

  /**
   * Inicializa todos los elementos de audio
   */
  initializeAudio() {
    const audioFiles = {
      background: {
        src: 'assets/audio/Space.mp3',
        loop: true,
        volume: 0.3
      },
      travel: {
        src: 'assets/audio/Viaje.mp3',
        loop: false,
        volume: 0.6
      },
      typewriter: {
        src: 'assets/audio/Texto.mp3',
        loop: false,
        volume: 0.4
      },
      success: {
        src: 'assets/audio/success.mp3',
        loop: false,
        volume: 0.7
      },
      error: {
        src: 'assets/audio/error.mp3',
        loop: false,
        volume: 0.5
      }
    };

    Object.entries(audioFiles).forEach(([key, config]) => {
      this.createAudioElement(key, config);
    });
  }

  /**
   * Crea un elemento de audio
   */
  createAudioElement(key, config) {
    try {
      const audio = new Audio(config.src);
      audio.preload = 'auto';
      audio.loop = config.loop;
      audio.volume = config.volume * this.masterVolume;
      
      // Eventos de audio
      audio.addEventListener('loadeddata', () => {
        GalaxiaUtils.log.info(`Audio cargado: ${key}`);
      });
      
      audio.addEventListener('error', (e) => {
        GalaxiaUtils.log.error(`Error cargando audio: ${key}`, e);
      });

      this.audioElements.set(key, {
        element: audio,
        baseVolume: config.volume,
        isPlaying: false
      });

    } catch (error) {
      GalaxiaUtils.log.error(`Error creando elemento de audio: ${key}`, error);
    }
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Activar audio con primera interacción del usuario
    const enableAudio = () => {
      this.enableAudioContext();
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    // Pausar audio cuando la pestaña no está activa
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAll();
      } else {
        this.resumeBackground();
      }
    });
  }

  /**
   * Habilita el contexto de audio
   */
  async enableAudioContext() {
    if (!this.isEnabled) return;

    try {
      // Intentar reproducir todos los audios brevemente para activar el contexto
      for (const [key, audioData] of this.audioElements) {
        const { element } = audioData;
        element.volume = 0;
        await element.play();
        element.pause();
        element.currentTime = 0;
        element.volume = audioData.baseVolume * this.masterVolume;
      }
      
      GalaxiaUtils.log.info('Contexto de audio activado');
      
      // Reproducir música de fondo automáticamente
      this.playBackground();
      
    } catch (error) {
      GalaxiaUtils.log.warn('No se pudo activar el contexto de audio', error);
    }
  }

  /**
   * Reproduce un audio específico
   */
  async play(key, options = {}) {
    if (!this.isEnabled) return false;

    const audioData = this.audioElements.get(key);
    if (!audioData) {
      GalaxiaUtils.log.warn(`Audio no encontrado: ${key}`);
      return false;
    }

    const { element } = audioData;
    
    try {
      // Configurar opciones
      if (options.volume !== undefined) {
        element.volume = options.volume * this.masterVolume;
      }
      
      if (options.currentTime !== undefined) {
        element.currentTime = options.currentTime;
      }

      // Reiniciar si ya está reproduciéndose
      if (!element.paused) {
        element.currentTime = 0;
      }

      await element.play();
      audioData.isPlaying = true;
      
      GalaxiaUtils.log.info(`Reproduciendo audio: ${key}`);
      return true;
      
    } catch (error) {
      GalaxiaUtils.log.error(`Error reproduciendo audio: ${key}`, error);
      return false;
    }
  }

  /**
   * Pausa un audio específico
   */
  pause(key) {
    const audioData = this.audioElements.get(key);
    if (!audioData) return;

    const { element } = audioData;
    element.pause();
    audioData.isPlaying = false;
    
    GalaxiaUtils.log.info(`Audio pausado: ${key}`);
  }

  /**
   * Detiene un audio específico
   */
  stop(key) {
    const audioData = this.audioElements.get(key);
    if (!audioData) return;

    const { element } = audioData;
    element.pause();
    element.currentTime = 0;
    audioData.isPlaying = false;
  }

  /**
   * Fade out de un audio
   */
  fadeOut(key, duration = 1000) {
    const audioData = this.audioElements.get(key);
    if (!audioData) return;

    const { element } = audioData;
    const startVolume = element.volume;
    const fadeStep = startVolume / (duration / 50);

    // Limpiar fade anterior si existe
    if (this.fadeTimeouts.has(key)) {
      clearInterval(this.fadeTimeouts.get(key));
    }

    const fadeInterval = setInterval(() => {
      if (element.volume > fadeStep) {
        element.volume -= fadeStep;
      } else {
        element.volume = 0;
        element.pause();
        element.currentTime = 0;
        audioData.isPlaying = false;
        clearInterval(fadeInterval);
        this.fadeTimeouts.delete(key);
      }
    }, 50);

    this.fadeTimeouts.set(key, fadeInterval);
  }

  /**
   * Fade in de un audio
   */
  async fadeIn(key, duration = 1000, targetVolume = null) {
    const audioData = this.audioElements.get(key);
    if (!audioData) return;

    const { element, baseVolume } = audioData;
    const finalVolume = (targetVolume || baseVolume) * this.masterVolume;
    const fadeStep = finalVolume / (duration / 50);

    element.volume = 0;
    await this.play(key);

    // Limpiar fade anterior si existe
    if (this.fadeTimeouts.has(key)) {
      clearInterval(this.fadeTimeouts.get(key));
    }

    const fadeInterval = setInterval(() => {
      if (element.volume < finalVolume - fadeStep) {
        element.volume += fadeStep;
      } else {
        element.volume = finalVolume;
        clearInterval(fadeInterval);
        this.fadeTimeouts.delete(key);
      }
    }, 50);

    this.fadeTimeouts.set(key, fadeInterval);
  }

  /**
   * Reproduce música de fondo
   */
  playBackground() {
    this.play('background', { volume: 0.3 });
  }

  /**
   * Pausa todos los audios
   */
  pauseAll() {
    this.audioElements.forEach((audioData, key) => {
      if (audioData.isPlaying) {
        this.pause(key);
      }
    });
  }

  /**
   * Reanuda la música de fondo
   */
  resumeBackground() {
    if (this.isEnabled) {
      this.playBackground();
    }
  }

  /**
   * Reproduce efecto de sonido para escritura
   */
  playTypewriterSound() {
    this.play('typewriter', { currentTime: 0 });
  }

  /**
   * Reproduce sonido de viaje entre planetas
   */
  async playTravelSound() {
    this.fadeOut('background');
    await GalaxiaUtils.time.delay(500);
    return this.play('travel');
  }

  /**
   * Reproduce sonido de éxito
   */
  playSuccessSound() {
    this.play('success');
  }

  /**
   * Reproduce sonido de error
   */
  playErrorSound() {
    this.play('error');
  }

  /**
   * Alterna el estado del audio
   */
  toggle() {
    this.isEnabled = !this.isEnabled;
    this.saveAudioPreference();
    
    if (!this.isEnabled) {
      this.pauseAll();
    } else {
      this.playBackground();
    }
    
    return this.isEnabled;
  }

  /**
   * Establece el volumen principal
   */
  setMasterVolume(volume) {
    this.masterVolume = GalaxiaUtils.math.clamp(volume, 0, 1);
    
    this.audioElements.forEach((audioData, key) => {
      const { element, baseVolume } = audioData;
      element.volume = baseVolume * this.masterVolume;
    });
  }

  /**
   * Obtiene el estado del audio
   */
  isAudioEnabled() {
    return this.isEnabled;
  }

  /**
   * Verifica si un audio está reproduciéndose
   */
  isPlaying(key) {
    const audioData = this.audioElements.get(key);
    return audioData ? audioData.isPlaying : false;
  }

  /**
   * Carga preferencia de audio del localStorage
   */
  loadAudioPreference() {
    return GalaxiaUtils.storage.get(GalaxiaConfig.get('STORAGE_KEYS.SOUND_ENABLED'), true);
  }

  /**
   * Guarda preferencia de audio en localStorage
   */
  saveAudioPreference() {
    GalaxiaUtils.storage.set(GalaxiaConfig.get('STORAGE_KEYS.SOUND_ENABLED'), this.isEnabled);
  }

  /**
   * Limpia recursos de audio
   */
  destroy() {
    // Limpiar timeouts de fade
    this.fadeTimeouts.forEach(timeout => clearInterval(timeout));
    this.fadeTimeouts.clear();

    // Pausar y limpiar elementos de audio
    this.audioElements.forEach((audioData) => {
      const { element } = audioData;
      element.pause();
      element.src = '';
      element.load();
    });

    this.audioElements.clear();
  }
}

// Exportar para uso global
window.AudioManager = AudioManager;

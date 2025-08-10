/**
 * GALAXIA ANDINACODE X - Aplicación Principal
 * Controlador principal de la aplicación
 */

class GalaxiaApp {
  constructor() {
    this.audioManager = null;
    this.animationManager = null;
    this.currentModal = null;
    this.playerName = null;
    this.isInitialized = false;
    
    // Bind methods
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
    this.init();
  }

  /**
   * Inicializa la aplicación
   */
  async init() {
    try {
      GalaxiaUtils.log.info('Iniciando Galaxia AndinaCode X...');
      
      // Verificar soporte del navegador
      this.checkBrowserSupport();
      
      // Cargar datos del usuario
      this.loadUserData();
      
      // Inicializar managers
      this.initializeManagers();
      
      // Configurar DOM
      this.setupDOM();
      
      // Configurar eventos
      this.setupEventListeners();
      
      // Mostrar contenido inicial
      await this.showInitialContent();
      
      this.isInitialized = true;
      GalaxiaUtils.log.info('Aplicación inicializada correctamente');
      
      // Disparar evento de inicialización
      GalaxiaUtils.events.emit(document, 'galaxia:initialized', {
        app: this
      });
      
    } catch (error) {
      GalaxiaUtils.log.error('Error inicializando la aplicación', error);
      this.showError('Error al cargar la aplicación. Por favor, recarga la página.');
    }
  }

  /**
   * Verifica soporte del navegador
   */
  checkBrowserSupport() {
    const required = {
      localStorage: typeof(Storage) !== 'undefined',
      audioContext: typeof(AudioContext) !== 'undefined' || typeof(webkitAudioContext) !== 'undefined',
      requestAnimationFrame: typeof(requestAnimationFrame) !== 'undefined',
      customElements: typeof(customElements) !== 'undefined'
    };

    const unsupported = Object.entries(required)
      .filter(([feature, supported]) => !supported)
      .map(([feature]) => feature);

    if (unsupported.length > 0) {
      GalaxiaUtils.log.warn('Características no soportadas:', unsupported);
    }
  }

  /**
   * Carga datos del usuario desde localStorage
   */
  loadUserData() {
    // Cargar nombre del jugador
    this.playerName = GalaxiaUtils.storage.get(
      GalaxiaConfig.get('STORAGE_KEYS.PLAYER_NAME')
    );

    // Cargar nombre desde URL si no está en localStorage
    if (!this.playerName) {
      const urlName = GalaxiaUtils.url.getParam('nombre');
      if (urlName) {
        this.playerName = decodeURIComponent(urlName);
        this.savePlayerName(this.playerName);
      }
    }

    GalaxiaUtils.log.info('Datos de usuario cargados', { playerName: this.playerName });
  }

  /**
   * Inicializa los gestores de la aplicación
   */
  initializeManagers() {
    // Inicializar gestor de audio
    this.audioManager = new AudioManager();
    
    // Inicializar gestor de animaciones
    this.animationManager = new AnimationManager();
    
    GalaxiaUtils.log.info('Gestores inicializados');
  }

  /**
   * Configura elementos del DOM
   */
  setupDOM() {
    // Agregar clases necesarias al body
    document.body.classList.add('galaxy-background');
    
    // Configurar contenedor principal
    const mainContainer = GalaxiaUtils.dom.select('.main-container');
    if (mainContainer) {
      mainContainer.classList.add('fade-in');
    }

    // Configurar botones de planetas
    this.setupPlanetButtons();
    
    // Configurar modal
    this.setupModal();
  }

  /**
   * Configura los botones de planetas
   */
  setupPlanetButtons() {
    const planetButtons = GalaxiaUtils.dom.selectAll('.planet-button');
    
    planetButtons.forEach((button, index) => {
      // Agregar animación de entrada escalonada
      button.style.animationDelay = `${index * 0.2}s`;
      button.classList.add('slide-in-up');
      
      // Mejorar accesibilidad
      button.setAttribute('role', 'button');
      button.setAttribute('aria-describedby', `planet-description-${index}`);
      
      // Configurar estados de planetas
      this.updatePlanetState(button, index);
    });
  }

  /**
   * Actualiza el estado de un planeta (accesible/bloqueado)
   */
  updatePlanetState(button, index) {
    const isAccessible = index === 0; // Solo el primer planeta es accesible inicialmente
    
    if (isAccessible) {
      button.classList.add('accessible');
      button.setAttribute('aria-label', 'Planeta accesible');
    } else {
      button.classList.add('locked');
      button.setAttribute('aria-label', 'Planeta bloqueado');
      button.setAttribute('aria-disabled', 'true');
    }
  }

  /**
   * Configura el modal
   */
  setupModal() {
    const modal = GalaxiaUtils.dom.select('.modal-overlay');
    if (modal) {
      // Agregar botón de cerrar si no existe
      if (!modal.querySelector('.btn-close')) {
        const closeButton = GalaxiaUtils.dom.create('button', {
          className: 'btn-close',
          'aria-label': 'Cerrar modal'
        }, '×');
        
        GalaxiaUtils.events.on(closeButton, 'click', () => this.hideModal());
        modal.querySelector('.modal-content').appendChild(closeButton);
      }
    }
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Eventos de teclado globales
    GalaxiaUtils.events.on(document, 'keydown', this.handleKeydown);
    
    // Eventos de click para activar audio
    GalaxiaUtils.events.on(document, 'click', this.handleClick, { once: true });
    
    // Eventos de planetas
    this.setupPlanetEvents();
    
    // Eventos de modal
    this.setupModalEvents();
    
    // Eventos de formulario
    this.setupFormEvents();
  }

  /**
   * Configura eventos de planetas
   */
  setupPlanetEvents() {
    const planetButtons = GalaxiaUtils.dom.selectAll('.planet-button');
    
    planetButtons.forEach((button, index) => {
      GalaxiaUtils.events.on(button, 'click', (e) => {
        GalaxiaUtils.events.prevent(e);
        this.handlePlanetClick(index);
      });
      
      GalaxiaUtils.events.on(button, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          GalaxiaUtils.events.prevent(e);
          this.handlePlanetClick(index);
        }
      });
    });
  }

  /**
   * Configura eventos del modal
   */
  setupModalEvents() {
    const modal = GalaxiaUtils.dom.select('.modal-overlay');
    if (!modal) return;
    
    // Cerrar modal al hacer click en el overlay
    GalaxiaUtils.events.on(modal, 'click', (e) => {
      if (e.target === modal) {
        this.hideModal();
      }
    });
    
    // Cerrar modal con botón de cerrar
    const closeButton = modal.querySelector('.btn-close');
    if (closeButton) {
      GalaxiaUtils.events.on(closeButton, 'click', () => this.hideModal());
    }
    
    // Botón volver
    const backButton = GalaxiaUtils.dom.select('#btnVolver');
    if (backButton) {
      GalaxiaUtils.events.on(backButton, 'click', () => this.hideModal());
    }
  }

  /**
   * Configura eventos del formulario
   */
  setupFormEvents() {
    const nameInput = GalaxiaUtils.dom.select('#nombreCadete');
    if (nameInput) {
      GalaxiaUtils.events.on(nameInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          GalaxiaUtils.events.prevent(e);
          this.handleNameSubmit();
        }
      });
      
      // Validación en tiempo real
      GalaxiaUtils.events.on(nameInput, 'input', 
        GalaxiaUtils.time.debounce(() => this.validateNameInput(), 300)
      );
    }
  }

  /**
   * Maneja eventos de teclado globales
   */
  handleKeydown(e) {
    switch (e.key) {
      case 'Escape':
        if (this.currentModal) {
          this.hideModal();
        }
        break;
      case 'F1':
        GalaxiaUtils.events.prevent(e);
        this.showHelp();
        break;
      case 'm':
      case 'M':
        if (e.ctrlKey) {
          GalaxiaUtils.events.prevent(e);
          this.toggleAudio();
        }
        break;
    }
  }

  /**
   * Maneja click inicial para activar audio
   */
  handleClick() {
    if (this.audioManager && !this.audioManager.isAudioEnabled()) {
      this.audioManager.toggle();
    }
  }

  /**
   * Maneja click en planetas
   */
  async handlePlanetClick(planetIndex) {
    const button = GalaxiaUtils.dom.selectAll('.planet-button')[planetIndex];
    if (!button) return;
    
    // Verificar si el planeta está accesible
    if (button.classList.contains('locked')) {
      this.showAccessDenied();
      return;
    }
    
    // Crear efecto de partículas en la posición del botón
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    if (this.animationManager) {
      this.animationManager.createParticleEffect(centerX, centerY);
    }
    
    // Procesar según el planeta
    switch (planetIndex) {
      case 0: // Planeta Bitnarys - Accesible
        await this.accessPlanet();
        break;
      default: // Otros planetas - Bloqueados
        this.showAccessDenied();
        break;
    }
  }

  /**
   * Accede a un planeta (muestra modal de acceso)
   */
  async accessPlanet() {
    // Si ya tiene nombre, ir directamente
    if (this.playerName) {
      await this.travelToPlanet();
      return;
    }
    
    // Mostrar modal para ingresar nombre
    this.showAccessModal();
  }

  /**
   * Muestra modal de acceso denegado
   */
  showAccessDenied() {
    if (this.audioManager) {
      this.audioManager.playErrorSound();
    }
    
    this.showModal({
      image: 'assets/images/AccesoNo.png',
      title: 'Acceso Denegado',
      message: GalaxiaConfig.get('MESSAGES.ACCESS_DENIED'),
      showInput: false,
      autoClose: 2000
    });
  }

  /**
   * Muestra modal de acceso permitido
   */
  showAccessModal() {
    this.showModal({
      image: 'assets/images/AccesoSi.png',
      title: 'Acceso Permitido',
      message: 'Ingresa tu nombre de comandante',
      showInput: true,
      inputPlaceholder: 'Nombre del comandante',
      showBackButton: true
    });
  }

  /**
   * Muestra un modal genérico
   */
  showModal(options = {}) {
    const {
      image = '',
      title = '',
      message = '',
      showInput = false,
      inputPlaceholder = '',
      showBackButton = false,
      autoClose = 0
    } = options;
    
    const modal = GalaxiaUtils.dom.select('.modal-overlay');
    if (!modal) return;
    
    // Configurar contenido del modal
    const modalImage = modal.querySelector('.modal-image');
    const nameInput = modal.querySelector('#nombreCadete');
    const backButton = modal.querySelector('#btnVolver');
    
    if (modalImage && image) {
      modalImage.src = image;
      modalImage.alt = title;
    }
    
    if (nameInput) {
      nameInput.style.display = showInput ? 'block' : 'none';
      if (showInput) {
        nameInput.placeholder = inputPlaceholder;
        nameInput.value = '';
      }
    }
    
    if (backButton) {
      backButton.style.display = showBackButton ? 'block' : 'none';
    }
    
    // Mostrar modal
    modal.classList.add(GalaxiaConfig.get('MODAL_SHOW_CLASS'));
    this.currentModal = modal;
    
    // Enfocar input si está visible
    if (showInput && nameInput) {
      setTimeout(() => nameInput.focus(), 300);
    }
    
    // Auto cerrar si se especifica
    if (autoClose > 0) {
      setTimeout(() => this.hideModal(), autoClose);
    }
    
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
  }

  /**
   * Oculta el modal actual
   */
  hideModal() {
    if (!this.currentModal) return;
    
    this.currentModal.classList.remove(GalaxiaConfig.get('MODAL_SHOW_CLASS'));
    this.currentModal = null;
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
  }

  /**
   * Valida la entrada del nombre
   */
  validateNameInput() {
    const nameInput = GalaxiaUtils.dom.select('#nombreCadete');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    const validation = GalaxiaUtils.validation.validatePlayerName(name);
    
    // Mostrar indicador visual de validación
    nameInput.classList.toggle('invalid', !validation.valid);
    nameInput.classList.toggle('valid', validation.valid);
    
    return validation;
  }

  /**
   * Maneja el envío del nombre
   */
  async handleNameSubmit() {
    const validation = this.validateNameInput();
    if (!validation.valid) {
      this.showError(validation.message);
      return;
    }
    
    const nameInput = GalaxiaUtils.dom.select('#nombreCadete');
    const name = nameInput.value.trim();
    
    this.savePlayerName(name);
    await this.travelToPlanet();
  }

  /**
   * Guarda el nombre del jugador
   */
  savePlayerName(name) {
    this.playerName = name;
    GalaxiaUtils.storage.set(GalaxiaConfig.get('STORAGE_KEYS.PLAYER_NAME'), name);
    GalaxiaUtils.log.info('Nombre de jugador guardado:', name);
  }

  /**
   * Viaja al planeta
   */
  async travelToPlanet() {
    try {
      // Ocultar modal
      this.hideModal();
      
      // Reproducir sonido de viaje
      if (this.audioManager) {
        await this.audioManager.playTravelSound();
      }
      
      // Esperar tiempo de transición
      await GalaxiaUtils.time.delay(GalaxiaConfig.get('TRANSITION_DELAY'));
      
      // Navegar a la siguiente página
      const targetUrl = GalaxiaConfig.get('ROUTES.INGRESO');
      const urlWithName = `${targetUrl}?nombre=${encodeURIComponent(this.playerName)}`;
      
      window.location.href = urlWithName;
      
    } catch (error) {
      GalaxiaUtils.log.error('Error durante el viaje', error);
      this.showError('Error durante el viaje. Inténtalo de nuevo.');
    }
  }

  /**
   * Muestra el contenido inicial
   */
  async showInitialContent() {
    // Animar título
    const titleElement = GalaxiaUtils.dom.select('#titulo-galaxia');
    if (titleElement && this.animationManager) {
      this.animationManager.animateTextWithSound(
        titleElement,
        'Galaxia AndinaCode X',
        this.audioManager
      );
    }
    
    // Mostrar saludo si hay nombre
    if (this.playerName) {
      await GalaxiaUtils.time.delay(2000);
      this.showPlayerGreeting();
    }
  }

  /**
   * Muestra saludo al jugador
   */
  showPlayerGreeting() {
    const greetingElement = GalaxiaUtils.dom.select('#comandante');
    if (greetingElement && this.animationManager) {
      const greeting = `${GalaxiaConfig.get('MESSAGES.WELCOME')} ${this.playerName}`;
      this.animationManager.animateText(greetingElement, greeting);
    }
  }

  /**
   * Alterna el estado del audio
   */
  toggleAudio() {
    if (!this.audioManager) return;
    
    const enabled = this.audioManager.toggle();
    const message = enabled ? 'Audio activado' : 'Audio desactivado';
    
    this.showToast(message);
    GalaxiaUtils.log.info(message);
  }

  /**
   * Muestra un mensaje de error
   */
  showError(message) {
    console.error(message);
    // Aquí podrías implementar un sistema de notificaciones más sofisticado
    alert(message); // Temporal, se puede mejorar con un modal personalizado
  }

  /**
   * Muestra un mensaje toast
   */
  showToast(message) {
    // Implementación simple, se puede mejorar
    console.log(`Toast: ${message}`);
  }

  /**
   * Muestra ayuda
   */
  showHelp() {
    this.showModal({
      title: 'Ayuda',
      message: 'Controles:\n- ESC: Cerrar modal\n- Ctrl+M: Alternar audio\n- F1: Mostrar ayuda',
      showBackButton: true
    });
  }

  /**
   * Limpia recursos de la aplicación
   */
  destroy() {
    // Limpiar event listeners
    GalaxiaUtils.events.off(document, 'keydown', this.handleKeydown);
    
    // Destruir managers
    if (this.audioManager) {
      this.audioManager.destroy();
    }
    
    if (this.animationManager) {
      this.animationManager.destroy();
    }
    
    // Limpiar referencias
    this.currentModal = null;
    this.playerName = null;
    this.isInitialized = false;
    
    GalaxiaUtils.log.info('Aplicación destruida');
  }

  /**
   * Obtiene información del estado de la aplicación
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      playerName: this.playerName,
      audioEnabled: this.audioManager ? this.audioManager.isAudioEnabled() : false,
      animationStatus: this.animationManager ? this.animationManager.getStatus() : null
    };
  }
}

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Esperar a que todos los recursos estén cargados
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.galaxiaApp = new GalaxiaApp();
    });
  } else {
    window.galaxiaApp = new GalaxiaApp();
  }
});

// Exportar para uso global
window.GalaxiaApp = GalaxiaApp;

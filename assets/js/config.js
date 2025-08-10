/**
 * GALAXIA ANDINACODE X - Configuración principal
 * Manejo del estado global y configuración de la aplicación
 */

class GalaxiaConfig {
  static CONFIG = {
    // Audio
    DEFAULT_VOLUME: 0.4,
    AUDIO_FADE_DURATION: 1000,
    
    // Animaciones
    TYPEWRITER_DELAY: 150,
    TRANSITION_DELAY: 2500,
    
    // Estrellas
    STARS_COUNT: {
      small: 30,
      medium: 8,
      large: 4,
      rotating: 2,
      moving: 3
    },
    
    // Elementos
    MODAL_SHOW_CLASS: 'show',
    LOADING_CLASS: 'loading',
    
    // Local Storage keys
    STORAGE_KEYS: {
      PLAYER_NAME: 'nombreCadete',
      SOUND_ENABLED: 'sonidoHabilitado',
      COMPLETED_MISSIONS: 'misionesCompletadas',
      USER_PREFERENCES: 'preferenciasUsuario'
    },
    
    // Rutas
    ROUTES: {
      INGRESO: '../INGRESO/Index.html',
      ASSETS: {
        IMAGES: '../assets/images/',
        AUDIO: '../assets/audio/'
      }
    },
    
    // Mensajes
    MESSAGES: {
      ACCESS_DENIED: 'Acceso denegado a este planeta',
      NAME_REQUIRED: 'Por favor, ingresa tu nombre de comandante',
      WELCOME: 'Bienvenido comandante',
      LOADING: 'Cargando...'
    }
  };

  /**
   * Obtiene una configuración específica
   * @param {string} path - Ruta de la configuración (ej: 'AUDIO.DEFAULT_VOLUME')
   * @returns {*} Valor de la configuración
   */
  static get(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], this.CONFIG);
  }

  /**
   * Establece una configuración específica
   * @param {string} path - Ruta de la configuración
   * @param {*} value - Nuevo valor
   */
  static set(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key], this.CONFIG);
    if (target) {
      target[lastKey] = value;
    }
  }
}

// Exportar para uso global
window.GalaxiaConfig = GalaxiaConfig;

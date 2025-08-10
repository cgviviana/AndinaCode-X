/**
 * GALAXIA ANDINACODE X - Utilidades generales
 * Funciones de ayuda y utilidades reutilizables
 */

class GalaxiaUtils {
  
  /**
   * Manejo de Local Storage con validación
   */
  static storage = {
    /**
     * Guarda un valor en localStorage de forma segura
     * @param {string} key - Clave
     * @param {*} value - Valor a guardar
     * @returns {boolean} - Éxito de la operación
     */
    set(key, value) {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
        return true;
      } catch (error) {
        console.error('Error guardando en localStorage:', error);
        return false;
      }
    },

    /**
     * Obtiene un valor de localStorage de forma segura
     * @param {string} key - Clave
     * @param {*} defaultValue - Valor por defecto
     * @returns {*} - Valor encontrado o valor por defecto
     */
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error leyendo de localStorage:', error);
        return defaultValue;
      }
    },

    /**
     * Elimina un valor de localStorage
     * @param {string} key - Clave a eliminar
     * @returns {boolean} - Éxito de la operación
     */
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error eliminando de localStorage:', error);
        return false;
      }
    },

    /**
     * Verifica si localStorage está disponible
     * @returns {boolean}
     */
    isAvailable() {
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    }
  };

  /**
   * Utilidades DOM
   */
  static dom = {
    /**
     * Selecciona un elemento de forma segura
     * @param {string} selector - Selector CSS
     * @param {Element} parent - Elemento padre (opcional)
     * @returns {Element|null}
     */
    select(selector, parent = document) {
      try {
        return parent.querySelector(selector);
      } catch (error) {
        console.error('Error en selector:', error);
        return null;
      }
    },

    /**
     * Selecciona múltiples elementos de forma segura
     * @param {string} selector - Selector CSS
     * @param {Element} parent - Elemento padre (opcional)
     * @returns {NodeList}
     */
    selectAll(selector, parent = document) {
      try {
        return parent.querySelectorAll(selector);
      } catch (error) {
        console.error('Error en selector:', error);
        return [];
      }
    },

    /**
     * Crea un elemento con atributos
     * @param {string} tag - Etiqueta HTML
     * @param {Object} attributes - Atributos del elemento
     * @param {string} content - Contenido del elemento
     * @returns {Element}
     */
    create(tag, attributes = {}, content = '') {
      const element = document.createElement(tag);
      
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else if (key === 'dataset') {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
            element.dataset[dataKey] = dataValue;
          });
        } else {
          element.setAttribute(key, value);
        }
      });

      if (content) {
        element.textContent = content;
      }

      return element;
    },

    /**
     * Alterna una clase en un elemento
     * @param {Element} element - Elemento
     * @param {string} className - Nombre de la clase
     * @param {boolean} force - Forzar agregar/quitar
     */
    toggleClass(element, className, force) {
      if (!element) return;
      element.classList.toggle(className, force);
    },

    /**
     * Verifica si un elemento es visible
     * @param {Element} element - Elemento a verificar
     * @returns {boolean}
     */
    isVisible(element) {
      return element && element.offsetParent !== null;
    }
  };

  /**
   * Utilidades de validación
   */
  static validation = {
    /**
     * Valida si una cadena no está vacía
     * @param {string} str - Cadena a validar
     * @returns {boolean}
     */
    isNotEmpty(str) {
      return typeof str === 'string' && str.trim().length > 0;
    },

    /**
     * Valida un nombre de usuario
     * @param {string} name - Nombre a validar
     * @returns {Object} - {valid: boolean, message: string}
     */
    validatePlayerName(name) {
      if (!this.isNotEmpty(name)) {
        return {
          valid: false,
          message: 'El nombre no puede estar vacío'
        };
      }

      if (name.length < 2) {
        return {
          valid: false,
          message: 'El nombre debe tener al menos 2 caracteres'
        };
      }

      if (name.length > 50) {
        return {
          valid: false,
          message: 'El nombre no puede exceder 50 caracteres'
        };
      }

      // Validar caracteres permitidos (letras, números, espacios)
      const validPattern = /^[a-zA-ZÀ-ÿ0-9\s]+$/;
      if (!validPattern.test(name)) {
        return {
          valid: false,
          message: 'El nombre solo puede contener letras, números y espacios'
        };
      }

      return {
        valid: true,
        message: 'Nombre válido'
      };
    }
  };

  /**
   * Utilidades de eventos
   */
  static events = {
    /**
     * Agrega un event listener de forma segura
     * @param {Element} element - Elemento
     * @param {string} event - Tipo de evento
     * @param {Function} handler - Manejador del evento
     * @param {Object} options - Opciones del evento
     */
    on(element, event, handler, options = {}) {
      if (!element || typeof handler !== 'function') return;
      
      element.addEventListener(event, handler, options);
    },

    /**
     * Remueve un event listener
     * @param {Element} element - Elemento
     * @param {string} event - Tipo de evento
     * @param {Function} handler - Manejador del evento
     */
    off(element, event, handler) {
      if (!element || typeof handler !== 'function') return;
      
      element.removeEventListener(event, handler);
    },

    /**
     * Dispara un evento personalizado
     * @param {Element} element - Elemento
     * @param {string} eventName - Nombre del evento
     * @param {*} detail - Datos del evento
     */
    emit(element, eventName, detail = null) {
      if (!element) return;
      
      const event = new CustomEvent(eventName, {
        detail,
        bubbles: true,
        cancelable: true
      });
      
      element.dispatchEvent(event);
    },

    /**
     * Previene el comportamiento por defecto y la propagación
     * @param {Event} event - Evento
     */
    prevent(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  /**
   * Utilidades de tiempo
   */
  static time = {
    /**
     * Espera un tiempo determinado
     * @param {number} ms - Milisegundos a esperar
     * @returns {Promise}
     */
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Debounce de una función
     * @param {Function} func - Función a ejecutar
     * @param {number} wait - Tiempo de espera
     * @returns {Function}
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Throttle de una función
     * @param {Function} func - Función a ejecutar
     * @param {number} limit - Límite de tiempo
     * @returns {Function}
     */
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
  };

  /**
   * Utilidades de números
   */
  static math = {
    /**
     * Genera un número aleatorio entre min y max
     * @param {number} min - Valor mínimo
     * @param {number} max - Valor máximo
     * @returns {number}
     */
    random(min, max) {
      return Math.random() * (max - min) + min;
    },

    /**
     * Genera un entero aleatorio entre min y max
     * @param {number} min - Valor mínimo
     * @param {number} max - Valor máximo
     * @returns {number}
     */
    randomInt(min, max) {
      return Math.floor(this.random(min, max + 1));
    },

    /**
     * Limita un número entre un rango
     * @param {number} value - Valor
     * @param {number} min - Mínimo
     * @param {number} max - Máximo
     * @returns {number}
     */
    clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }
  };

  /**
   * Utilidades de URL
   */
  static url = {
    /**
     * Obtiene parámetros de la URL
     * @param {string} param - Nombre del parámetro
     * @returns {string|null}
     */
    getParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    },

    /**
     * Obtiene todos los parámetros de la URL
     * @returns {Object}
     */
    getAllParams() {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {};
      for (const [key, value] of urlParams) {
        params[key] = value;
      }
      return params;
    }
  };

  /**
   * Utilidades de dispositivo
   */
  static device = {
    /**
     * Detecta si es un dispositivo móvil
     * @returns {boolean}
     */
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Detecta si es un dispositivo táctil
     * @returns {boolean}
     */
    isTouch() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    /**
     * Obtiene el tamaño de la ventana
     * @returns {Object}
     */
    getViewportSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
  };

  /**
   * Utilidades de logging mejorado
   */
  static log = {
    /**
     * Log de información
     * @param {string} message - Mensaje
     * @param {*} data - Datos adicionales
     */
    info(message, data = null) {
      console.log(`[GALAXIA INFO] ${message}`, data || '');
    },

    /**
     * Log de advertencia
     * @param {string} message - Mensaje
     * @param {*} data - Datos adicionales
     */
    warn(message, data = null) {
      console.warn(`[GALAXIA WARN] ${message}`, data || '');
    },

    /**
     * Log de error
     * @param {string} message - Mensaje
     * @param {Error} error - Error
     */
    error(message, error = null) {
      console.error(`[GALAXIA ERROR] ${message}`, error || '');
    }
  };
}

// Exportar para uso global
window.GalaxiaUtils = GalaxiaUtils;

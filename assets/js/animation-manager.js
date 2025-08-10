/**
 * GALAXIA ANDINACODE X - Gestor de Animaciones
 * Sistema de partículas y efectos visuales mejorados
 */

class AnimationManager {
  constructor() {
    this.stars = [];
    this.animationId = null;
    this.isAnimating = false;
    this.container = null;
    this.respectMotionPreference = true;
    
    this.init();
  }

  /**
   * Inicializa el gestor de animaciones
   */
  init() {
    // Verificar preferencias de movimiento del usuario
    this.checkMotionPreference();
    
    // Configurar contenedor
    this.container = document.body;
    
    // Crear estrellas
    this.createStars();
    
    // Iniciar animaciones
    this.startAnimations();
    
    // Event listeners
    this.setupEventListeners();
  }

  /**
   * Verifica las preferencias de movimiento del usuario
   */
  checkMotionPreference() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.respectMotionPreference = prefersReducedMotion.matches;
    
    // Escuchar cambios en la preferencia
    prefersReducedMotion.addEventListener('change', (e) => {
      this.respectMotionPreference = e.matches;
      if (this.respectMotionPreference) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Pausar animaciones cuando la pestaña no está activa
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });

    // Redimensionamiento de ventana
    window.addEventListener('resize', GalaxiaUtils.time.throttle(() => {
      this.updateStarPositions();
    }, 250));
  }

  /**
   * Crea el sistema de estrellas
   */
  createStars() {
    const config = GalaxiaConfig.get('STARS_COUNT');
    
    // Estrellas pequeñas
    for (let i = 0; i < config.small; i++) {
      this.createStar('small');
    }
    
    // Estrellas medianas
    for (let i = 0; i < config.medium; i++) {
      this.createStar('medium');
    }
    
    // Estrellas grandes
    for (let i = 0; i < config.large; i++) {
      this.createStar('large');
    }
    
    // Estrellas rotatorias
    for (let i = 0; i < config.rotating; i++) {
      this.createStar('rotating');
    }
    
    // Estrellas en movimiento
    for (let i = 0; i < config.moving; i++) {
      this.createStar('moving');
    }
  }

  /**
   * Crea una estrella individual
   */
  createStar(type) {
    const star = this.createStarElement(type);
    const starData = {
      element: star,
      type: type,
      x: GalaxiaUtils.math.random(0, window.innerWidth),
      y: GalaxiaUtils.math.random(0, window.innerHeight),
      opacity: GalaxiaUtils.math.random(0.3, 1),
      scale: GalaxiaUtils.math.random(0.5, 1.5),
      speed: GalaxiaUtils.math.random(0.5, 2),
      angle: GalaxiaUtils.math.random(0, 360),
      twinklePhase: GalaxiaUtils.math.random(0, Math.PI * 2)
    };

    this.updateStarElement(starData);
    this.container.appendChild(star);
    this.stars.push(starData);
  }

  /**
   * Crea el elemento DOM de una estrella
   */
  createStarElement(type) {
    const star = GalaxiaUtils.dom.create('div', {
      className: `star star-${type}`,
      'aria-hidden': 'true'
    });

    // Aplicar estilos específicos según el tipo
    const styles = this.getStarStyles(type);
    Object.assign(star.style, styles);

    return star;
  }

  /**
   * Obtiene los estilos para un tipo de estrella
   */
  getStarStyles(type) {
    const baseStyles = {
      position: 'absolute',
      borderRadius: '50%',
      background: 'var(--primary-color)',
      pointerEvents: 'none',
      zIndex: '1'
    };

    const typeStyles = {
      small: {
        width: '2px',
        height: '2px'
      },
      medium: {
        width: '4px',
        height: '4px'
      },
      large: {
        width: '6px',
        height: '6px'
      },
      rotating: {
        width: '8px',
        height: '8px'
      },
      moving: {
        width: '3px',
        height: '3px'
      }
    };

    return { ...baseStyles, ...typeStyles[type] };
  }

  /**
   * Actualiza la posición y propiedades de una estrella
   */
  updateStarElement(starData) {
    const { element, x, y, opacity, scale } = starData;
    
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.opacity = opacity;
    element.style.transform = `scale(${scale})`;
  }

  /**
   * Inicia las animaciones
   */
  startAnimations() {
    if (this.respectMotionPreference) return;
    
    this.isAnimating = true;
    this.animate();
  }

  /**
   * Pausa las animaciones
   */
  pauseAnimations() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Reanuda las animaciones
   */
  resumeAnimations() {
    if (!this.respectMotionPreference && !this.isAnimating) {
      this.startAnimations();
    }
  }

  /**
   * Bucle principal de animación
   */
  animate() {
    if (!this.isAnimating) return;

    this.updateStars();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Actualiza todas las estrellas
   */
  updateStars() {
    const time = Date.now() * 0.001; // Tiempo en segundos

    this.stars.forEach(starData => {
      this.updateStarAnimation(starData, time);
    });
  }

  /**
   * Actualiza la animación de una estrella individual
   */
  updateStarAnimation(starData, time) {
    const { type, speed } = starData;

    switch (type) {
      case 'small':
      case 'medium':
        this.updateTwinkle(starData, time);
        break;
      case 'large':
        this.updatePulse(starData, time);
        break;
      case 'rotating':
        this.updateRotation(starData, time);
        break;
      case 'moving':
        this.updateMovement(starData, time);
        break;
    }
  }

  /**
   * Animación de parpadeo
   */
  updateTwinkle(starData, time) {
    const { twinklePhase, speed } = starData;
    const opacity = 0.3 + (Math.sin(time * speed + twinklePhase) + 1) * 0.35;
    const scale = 1 + Math.sin(time * speed * 1.5 + twinklePhase) * 0.3;
    
    starData.opacity = opacity;
    starData.scale = scale;
    this.updateStarElement(starData);
  }

  /**
   * Animación de pulso con brillo
   */
  updatePulse(starData, time) {
    const { twinklePhase, speed } = starData;
    const pulse = Math.sin(time * speed + twinklePhase);
    const opacity = 0.4 + pulse * 0.6;
    const scale = 1 + pulse * 0.5;
    const glow = 5 + pulse * 15;
    
    starData.opacity = opacity;
    starData.scale = scale;
    starData.element.style.boxShadow = `0 0 ${glow}px var(--primary-color)`;
    this.updateStarElement(starData);
  }

  /**
   * Animación de rotación
   */
  updateRotation(starData, time) {
    const { speed } = starData;
    starData.angle = (time * speed * 60) % 360;
    const scale = 1 + Math.sin(time * speed) * 0.3;
    
    starData.scale = scale;
    starData.element.style.transform = `scale(${scale}) rotate(${starData.angle}deg)`;
    this.updateStarElement(starData);
  }

  /**
   * Animación de movimiento
   */
  updateMovement(starData, time) {
    const { speed, twinklePhase } = starData;
    const progress = (time * speed * 0.1 + twinklePhase) % (Math.PI * 2);
    
    // Movimiento en forma de órbita
    const radius = 100;
    const centerX = window.innerWidth * 0.3;
    const centerY = window.innerHeight * 0.3;
    
    starData.x = centerX + Math.cos(progress) * radius;
    starData.y = centerY + Math.sin(progress) * radius * 0.6;
    starData.opacity = 0.6 + Math.sin(progress) * 0.4;
    
    this.updateStarElement(starData);
  }

  /**
   * Actualiza posiciones cuando cambia el tamaño de ventana
   */
  updateStarPositions() {
    this.stars.forEach(starData => {
      // Reposicionar estrellas que están fuera de los límites
      if (starData.x > window.innerWidth) {
        starData.x = window.innerWidth - 50;
      }
      if (starData.y > window.innerHeight) {
        starData.y = window.innerHeight - 50;
      }
      this.updateStarElement(starData);
    });
  }

  /**
   * Efecto de escritura con animación
   */
  animateText(element, text, options = {}) {
    const {
      delay = GalaxiaConfig.get('TYPEWRITER_DELAY'),
      onChar = null,
      onComplete = null
    } = options;

    if (!element) return;

    element.innerHTML = '';
    element.classList.add('text-effect');

    const chars = [...text];
    
    chars.forEach((char, index) => {
      const span = GalaxiaUtils.dom.create('span', {}, char === ' ' ? '\u00A0' : char);
      span.style.animationDelay = `${index * 0.05}s`;
      element.appendChild(span);

      if (onChar && typeof onChar === 'function') {
        setTimeout(() => onChar(char, index), index * delay);
      }
    });

    if (onComplete && typeof onComplete === 'function') {
      setTimeout(onComplete, chars.length * delay + 500);
    }
  }

  /**
   * Efecto de escritura con sonido
   */
  animateTextWithSound(element, text, audioManager, options = {}) {
    const {
      delay = GalaxiaConfig.get('TYPEWRITER_DELAY'),
      onComplete = null
    } = options;

    this.animateText(element, text, {
      delay,
      onChar: () => {
        if (audioManager) {
          audioManager.playTypewriterSound();
        }
      },
      onComplete
    });
  }

  /**
   * Crea efecto de partículas en una posición
   */
  createParticleEffect(x, y, count = 10) {
    if (this.respectMotionPreference) return;

    for (let i = 0; i < count; i++) {
      const particle = this.createParticle(x, y);
      this.container.appendChild(particle);
      
      // Remover partícula después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  /**
   * Crea una partícula individual
   */
  createParticle(x, y) {
    const particle = GalaxiaUtils.dom.create('div', {
      className: 'floating-particle',
      'aria-hidden': 'true'
    });

    const size = GalaxiaUtils.math.randomInt(2, 6);
    const angle = GalaxiaUtils.math.random(0, Math.PI * 2);
    const speed = GalaxiaUtils.math.random(50, 150);
    const duration = GalaxiaUtils.math.random(1, 2);

    Object.assign(particle.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'var(--primary-color)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '1000',
      animation: `float ${duration}s ease-out forwards`
    });

    // Movimiento aleatorio
    const deltaX = Math.cos(angle) * speed;
    const deltaY = Math.sin(angle) * speed;
    
    particle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    return particle;
  }

  /**
   * Limpia todos los recursos de animación
   */
  destroy() {
    this.pauseAnimations();
    
    // Remover todas las estrellas
    this.stars.forEach(starData => {
      if (starData.element.parentNode) {
        starData.element.parentNode.removeChild(starData.element);
      }
    });
    
    this.stars = [];
  }

  /**
   * Obtiene información del estado de las animaciones
   */
  getStatus() {
    return {
      isAnimating: this.isAnimating,
      respectMotionPreference: this.respectMotionPreference,
      starCount: this.stars.length
    };
  }
}

// Exportar para uso global
window.AnimationManager = AnimationManager;

# Galaxia AndinaCode X - Proyecto Educativo Mejorado

## 🚀 Descripción

**Galaxia AndinaCode X** es una plataforma educativa interactiva que combina aprendizaje sobre ciencia de datos y programación con una experiencia de juego inmersiva. Los estudiantes navegan por planetas alienígenas completando misiones que enseñan conceptos fundamentales de tecnología y análisis de datos.

## ✨ Mejoras Implementadas

### 🎯 **1. Arquitectura de Código Modular**
- **Separación de Responsabilidades**: CSS, JavaScript y HTML ahora están separados en módulos especializados
- **Estructura de Assets Organizada**: Nuevas carpetas `assets/css/`, `assets/js/`, `assets/images/`, `assets/audio/`
- **Sistema de Configuración Centralizada**: Archivo `config.js` para manejar todas las constantes y configuraciones

### 🎨 **2. CSS Modularizado con Variables**
- **`variables.css`**: Paleta de colores, tipografía y espaciado consistentes usando CSS Custom Properties
- **`base.css`**: Reset CSS moderno con mejoras de accesibilidad
- **`layout.css`**: Sistema de layout responsivo y componentes de diseño
- **`animations.css`**: Animaciones optimizadas con soporte para `prefers-reduced-motion`
- **`components.css`**: Componentes reutilizables (modales, botones, tarjetas)

### 🧠 **3. JavaScript Orientado a Objetos**
- **`config.js`**: Configuración centralizada y constantes de la aplicación
- **`utils.js`**: Funciones utilitarias para manejo de localStorage, validaciones y helpers del DOM
- **`audio-manager.js`**: Sistema completo de gestión de audio con preloader y efectos
- **`animation-manager.js`**: Manejo de efectos visuales y sistema de partículas
- **`app.js`**: Controlador principal de la aplicación con manejo de estado

### ♿ **4. Mejoras de Accesibilidad**
- **Semántica HTML5**: Uso correcto de elementos `<main>`, `<section>`, `<header>` con roles ARIA
- **Navegación por Teclado**: Soporte completo para navegación con Tab y Enter
- **Lectores de Pantalla**: Etiquetas ARIA, texto alternativo descriptivo y elementos `aria-live`
- **Enlaces de Salto**: "Saltar al contenido principal" para navegación rápida
- **Contraste Mejorado**: Colores que cumplen con WCAG 2.1 AA

### 📱 **5. Responsive Design Mejorado**
- **Mobile-First**: Diseño optimizado para dispositivos móviles
- **Breakpoints Consistentes**: Sistema de responsive design uniforme
- **Imágenes Optimizadas**: Lazy loading y formatos optimizados
- **Touch-Friendly**: Botones y áreas de interacción apropiadas para dispositivos táctiles

### ⚡ **6. Optimización de Rendimiento**
- **Preload de Recursos Críticos**: Fuentes y assets importantes se cargan prioritariamente
- **Lazy Loading**: Imágenes se cargan bajo demanda
- **Audio Optimizado**: Sistema de pooling de audio y precarga inteligente
- **Animaciones Hardware-Accelerated**: Uso de CSS transforms para mejor rendimiento

### 🛡️ **7. Manejo de Errores y Robustez**
- **Error Boundaries**: Manejo graceful de errores en JavaScript
- **Fallbacks**: Alternativas cuando recursos no cargan
- **Validación de Datos**: Validación robusta de entrada de usuario
- **Logging Inteligente**: Sistema de debugging configurable

## 🗂️ Estructura del Proyecto

```

│
├── assets/                          # Recursos organizados
│   ├── css/                        # Estilos modulares
│   │   ├── variables.css           # Variables CSS globales
│   │   ├── base.css               # Reset y estilos base
│   │   ├── layout.css             # Layout y grids
│   │   ├── animations.css         # Animaciones y efectos
│   │   └── components.css         # Componentes reutilizables
│   │
│   ├── js/                        # JavaScript modular
│   │   ├── config.js              # Configuración global
│   │   ├── utils.js               # Utilidades y helpers
│   │   ├── audio-manager.js       # Gestión de audio
│   │   ├── animation-manager.js   # Efectos visuales
│   │   └── app.js                 # Aplicación principal
│   │
│   ├── images/                    # Imágenes optimizadas
│   └── audio/                     # Archivos de audio
│
├── ENTORNO/                       # Página principal mejorada
│   └── index.html                 # HTML semántico y accesible
│
├── INGRESO/                       # Portal de misiones
│   └── Index.html                 # Interfaz mejorada
│
├── MISIONES/                      # Contenido educativo
│   ├── MISION 1/                  # Desafíos interactivos
│   └── ...
│
└── README.md                      # Documentación completa
```

## 🎮 Características Principales

### **Sistema de Navegación Planetaria**
- **Planeta Bitnarys**: Disponible - Misiones introductorias sobre datos y programación
- **Planeta Codara**: Bloqueado - Algoritmos avanzados y estructuras de datos  
- **Planeta Tekron**: Bloqueado - Tecnologías emergentes y AI

### **Sistema de Progreso**
- **4 Estrellas Sagradas**: Una por cada misión completada
- **Insignia Galáctica**: Recompensa por completar todas las misiones
- **Ascenso de Rango**: De Comandante a Almirante Galáctico

### **Sistema de Rangos y Personalización**
- El nombre del usuario se solicita y valida al inicio, y persiste en todas las misiones y desafíos.
- El rango del usuario progresa de forma consistente: Comandante → Capitán → General → Almirante Galáctico, según el avance.
- El progreso y el nombre se almacenan en localStorage para mantener la experiencia personalizada.

### **Manual Técnico (MOT) Limpio y Accesible**
- Los MOTs de cada misión contienen únicamente información técnica y manuales, sin narrativa ni instrucciones de juego.
- Acceso rápido a MOT desde cada misión para consulta técnica.

### **Validación y Experiencia de Usuario Mejorada**
- Validación robusta del nombre de usuario: no se permite avanzar sin ingresar un nombre válido.
- El nombre se muestra en la interfaz de usuario en todas las pantallas y misiones.
- Instrucciones y paneles de arrastrar y soltar mejorados para mayor claridad y usabilidad.
- Las vidas y temporizadores en los desafíos reflejan fielmente la lógica del juego y la interfaz.

### **Mejoras de Jugabilidad y Accesibilidad**
- Paneles de desafíos reordenados para mejor experiencia visual y de interacción.
- Instrucciones actualizadas y consistentes con la lógica real de cada nivel.
- Accesibilidad reforzada en todos los niveles y misiones.

### **Características Educativas**
- **Aprendizaje Interactivo**: Conceptos enseñados a través de gamificación
- **Progreso Persistente**: LocalStorage mantiene el progreso del usuario
- **Retroalimentación Inmediata**: Modales accesibles reemplazan alerts básicos

## 🚀 Instalación y Uso

### **Requisitos**
- Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+)
- JavaScript habilitado
- Resolución mínima: 320px (mobile-first)

### **Instalación**
1. Clona o descarga el repositorio
2. Abre `ENTORNO/index.html` en tu navegador
3. ¡Comienza tu aventura galáctica!

### **Configuración**
El archivo `assets/js/config.js` contiene todas las configuraciones modificables:
- Volúmenes de audio
- Duraciones de animación
- Rutas de recursos
- Mensajes de la aplicación

## 🔧 Tecnologías Utilizadas

### **Frontend**
- **HTML5**: Semántica moderna y accesibilidad
- **CSS3**: Custom Properties, Grid, Flexbox, Animations
- **JavaScript ES6+**: Clases, Modules, Async/Await
- **Web Audio API**: Gestión avanzada de audio
- **Canvas API**: Efectos de partículas y animaciones

### **Herramientas de Desarrollo**
- **CSS Custom Properties**: Variables CSS nativas
- **LocalStorage API**: Persistencia de datos
- **Intersection Observer**: Lazy loading optimizado
- **Media Queries**: Responsive design
- **ARIA Standards**: Accesibilidad web

## 📱 Compatibilidad

### **Navegadores Soportados**
- ✅ Chrome 90+
- ✅ Firefox 88+  
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Internet Explorer: No soportado

### **Dispositivos**
- ✅ Desktop (1920x1080 hasta 1366x768)
- ✅ Tablet (1024x768, iPad, Android tablets)
- ✅ Mobile (iPhone SE hasta iPhone Pro Max, Android phones)
- ✅ TV/Large displays (4K ready)

## 🎯 Mejoras Futuras Planeadas

### **Próximas Funcionalidades**
1. **PWA (Progressive Web App)**: Instalación offline y service workers
2. **Multiplayer**: Sistema colaborativo entre estudiantes
3. **Analytics**: Tracking de progreso educativo para educadores
4. **Más Planetas**: Contenido expandido con nuevos temas
5. **API Integration**: Conexión con sistemas de gestión de aprendizaje (LMS)

### **Optimizaciones Técnicas**
1. **Bundle Optimization**: Minificación y compresión de assets
2. **CDN Integration**: Distribución optimizada de contenido
3. **Database Integration**: Backend para progreso persistente
4. **Testing Suite**: Pruebas unitarias y de integración
5. **CI/CD Pipeline**: Automatización de despliegue

## 👥 Contribución

### **Para Desarrolladores**
1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### **Para Educadores**
- Reporta bugs o sugerencias en Issues
- Comparte feedback sobre efectividad educativa
- Sugiere nuevos contenidos o planetas


## � Estructura Real del Proyecto

```

├── assets/
│   ├── css/
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── js/
│   │   ├── config.js
│   │   ├── utils.js
│   │   ├── audio-manager.js
│   │   ├── animation-manager.js
│   │   └── app.js
│   ├── images/
│   │   └── (imágenes)
│   └── audio/
│       └── (audios)
├── ENTORNO/
│   ├── index.html
│   ├── original-style.css
│   ├── styles-original.css
│   ├── AUDIO/
│   └── IMAGENES/
├── INGRESO/
│   ├── Index.html
│   ├── Index-clean.html
│   ├── Index-simple.html
│   ├── IndexFinal.html
│   ├── Index_colores_cian.html
│   ├── Index_nuevo.html
│   ├── BitnarysClean.html
│   └── Misiones.html
├── MISIONES/
│   └── MISION 1/
│       ├── DESAFIO1/
│       ├── DESAFIO2/
│       ├── DESAFIO3/
│       └── MOT1/
├── .vscode/
│   └── tasks.json
├── README.md
├── DESARROLLO.md
├── CHANGELOG.md
├── manifest.json
├── sw.js
└── (otros archivos)
```

## 🚀 Instalación y Uso Rápido

1. Descarga o clona este repositorio.
2. Abre el archivo `ENTORNO/index.html` en tu navegador web moderno (Chrome, Firefox, Edge, Safari).
3. ¡Comienza tu aventura galáctica!

No se requieren instalaciones adicionales ni dependencias externas.

## 👥 Contribución

¿Quieres mejorar el proyecto? Puedes:
- Sugerir mejoras o reportar bugs creando un Issue.
- Proponer cambios mediante Pull Request (edita archivos HTML, CSS o JS según la estructura real).
- Compartir feedback educativo o ideas para nuevas misiones.

## �📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Prof. Viviana**: Por la visión educativa original
- **Comunidad Educativa**: Por el feedback y testing
- **Desarrolladores**: Por las contribuciones técnicas

---

### 🌟 **¡Únete a la aventura galáctica del aprendizaje!**

*Versión 2.0.0 - Completamente renovado con las mejores prácticas de desarrollo web*

## 📝 Notas de Navegación y Redirección

- Todas las rutas de redirección entre misiones y el menú de ingreso han sido revisadas y corregidas para ser relativas y válidas dentro del proyecto.
- El nombre del usuario se transmite por la URL en cada avance de misión, garantizando que la personalización se mantenga en todo el flujo.
- Si el nombre en la URL no es el esperado, el sistema lo mostrará tal cual; se recomienda verificar el parámetro `nombre` en la URL para asegurar la experiencia personalizada.
- Se prioriza el nombre de la URL sobre el almacenado en localStorage para evitar arrastrar valores incorrectos de sesiones anteriores.
- El flujo de avance entre misiones es: ENTORNO → INGRESO → MISIONES/MISION 1/MOT1 → DESAFIO1 → DESAFIO2 → DESAFIO3, etc., siempre transmitiendo el nombre por la URL.

---

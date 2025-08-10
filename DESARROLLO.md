# Guía de desarrollo para Galaxia AndinaCode X

## Flujo de desarrollo recomendado

1. Abre el proyecto en VS Code o tu editor favorito.
2. Edita los archivos HTML, CSS o JS dentro de las carpetas `assets/`, `ENTORNO/`, `INGRESO/` o `MISIONES/` según lo que quieras modificar.
3. Para ver los cambios, abre el archivo `ENTORNO/index.html` en tu navegador web.
4. Si usas VS Code, puedes crear una tarea para abrir el entorno desde `.vscode/tasks.json`.

## Estructura real del proyecto

```
PROYECTO SRA VIVIANA/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── audio/
├── ENTORNO/
├── INGRESO/
├── MISIONES/
├── .vscode/
├── README.md
├── DESARROLLO.md
├── CHANGELOG.md
├── manifest.json
├── sw.js
└── (otros archivos)
```

## Automatización disponible

Actualmente, la única tarea automatizada es abrir el entorno principal:

```
"Abrir Galaxia AndinaCode X": Abre ENTORNO/index.html en tu navegador
```

No existen scripts de build, pruebas automáticas ni carpetas de testing o documentación adicional.

## Buenas prácticas sugeridas

- Mantén la estructura de carpetas organizada.
- Usa comentarios claros en el código.
- Sigue la modularidad de CSS y JS.
- Prueba los cambios en diferentes navegadores y dispositivos.
- Prioriza la accesibilidad y el responsive design.

## Accesibilidad y performance

El proyecto sigue buenas prácticas de accesibilidad (WCAG 2.1 AA) y optimización de recursos (lazy loading, modularidad, etc.).

## Contribución

Puedes sugerir mejoras, reportar bugs o proponer nuevas misiones mediante Issues o Pull Requests.

---

Última actualización: 9 de agosto de 2025

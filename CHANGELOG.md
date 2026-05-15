# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
El versionado sigue [Semantic Versioning](https://semver.org/lang/es/).

> En la fase `0.x`, la API es inestable. Cualquier versión menor puede introducir cambios que rompan compatibilidad.

---

## [0.1.0] — 2026-05-15

Versión inicial del framework. Establece la arquitectura base, las herramientas SASS y el catálogo de componentes Vue 3.

### Añadido

#### Herramientas SASS (core/tools)
- `spacing($n)` — función de espaciado basada en una escala configurable
- `color($group, $variant?)` — función de acceso al mapa de colores
- `font($group)` — función de acceso a la familia tipográfica
- `z-layer($name)` — función de acceso a la escala de z-index
- `@include bpFrom($bp)` / `@include bpUntil($bp)` — mixins de breakpoints mobile-first
- `@include hover` — mixin de estado hover seguro (excluye touch)
- `@include attr($name, $value?, $mode?)` — selector de atributo `data-*` con modos `or`, `and`, `nor`, `xor`
- `@include attr-join($pairs...)` — encadena múltiples pares atributo/valor en un único selector
- `@include context($name, $value?, $mode?)` — selector de contexto ancestro con los mismos modos lógicos
- `@include context-join($pairs...)` — encadena múltiples pares de contexto en un único selector ancestro
- `@include grid-layout($name)` — activa `display: grid` condicionado a `data-grid-layout`
- `@include grid-area($name)` — asigna `grid-area` condicionado a `data-grid-area`
- `@include setup-wrappers($config)` — define los breakpoints de padding de cada wrapper
- `@include type($typeset)` — aplica una escala tipográfica responsive
- `@include transition($props...)` — transición con curvas y tiempos del sistema
- `@include animation($name)` — aplica una animación del sistema

#### Componentes Vue 3
- `CGridLayout` — contenedor de grid con `data-grid-layout`
- `CGridArea` — celda de grid con `data-grid-area`
- `CWrapper` — contenedor con padding responsivo via `data-wrapper`
- `CButton` — botón/enlace sin estilos con `data-*` de estado
- `CClickableArea` — área accionable accesible (teclado + pointer)
- `CLink` — enlace de texto con estructura `.text`
- `CMenu` — menú de navegación semántico por slots
- `CField` — carcasa de campo de formulario (label + control + hint + error)
- `CInput` — input nativo compatible con `v-model`
- `CCheckbox` — checkbox con label, compatible con `v-model` booleano
- `CPagination` — paginación con `v-model`, slots prev/next/page
- `CBadge` — etiqueta de categoría/estado con slot de icono
- `CImage` — figura semántica con `object-fit` y slot de caption
- `CLogo` — logo de marca con enlace opcional y slot de contenido

#### Documentación
- Site de documentación con VitePress en GitHub Pages
- Guías: instalación, consumo, configuración, herramientas, tipografía, layout, animaciones
- Referencia de cada componente: props, slots, atributos `data-*`, estructura HTML, ejemplos, SCSS consumer
- Guía de arquitectura: encapsulación de componentes y patrón wrapper

#### Infraestructura
- GitHub Action para deploy automático a GitHub Pages en cada push a `main`
- `bedrock-init` — CLI para generar el archivo de configuración en el proyecto consumidor

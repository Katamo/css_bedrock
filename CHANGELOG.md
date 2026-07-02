# Changelog

Todos los cambios notables de este proyecto se documentan aquí.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/).
El versionado sigue [Semantic Versioning](https://semver.org/lang/es/).

> En la fase `0.x`, la API es inestable. Cualquier versión menor puede introducir cambios que rompan compatibilidad.

---

## [0.5.0] — 2026-07-02

### Added
- `BSelect` — select nativo con v-model, opciones por prop u slot, y chevron embebido
- `BTextarea` — textarea nativo con v-model y variante `data-resize`
- `BRadio` / `BRadioGroup` — radio buttons agrupables con name autogenerado y v-model compartido
- `BSwitch` — interruptor on/off accesible (`role="switch"`) con v-model booleano
- `BField` — cableado automático de accesibilidad: provee id, `aria-describedby`, `aria-invalid`, `required` y `disabled` a los controles Bedrock de su slot via provide/inject (requiere Vue ≥ 3.5)
- `BPagination` — prop `siblings` para truncar la lista de páginas con elipsis (slot `ellipsis` personalizable)
- `BMenu` — el `<li>` de un ítem con `aria-current` o `data-active` recibe `data-active`
- `BButton` — los slots `icon` y `arrow` se envuelven en `span.icon` / `span.arrow`
- Tokens por defecto nuevos: grupos de color `surface` y `bg`, variante `text.subtle`, typesets `label`, `input` y `button`

### Changed
- **Breaking:** `BWrapper` emite `data-type` en lugar del atributo HTML inválido `type`; `setup-wrappers()` genera `[data-type="..."]`
- **Breaking:** `setup-wrappers()` envuelve los selectores de tipo en `:where()` — las variantes del componente (`data-height`) ganan siempre; los estilos base deben importarse antes que la configuración
- `BButton` — `disabled` aplica el atributo nativo `disabled` en `<button>`; en modo enlace omite el `href` y aplica `aria-disabled`
- `BPagination` — prev/next son ahora `<button>` nativos (soporte completo de teclado)

### Fixed
- Los defaults de `_core.scss` estaban desincronizados con `core/setup`: el relay machacaba los typesets por defecto y omitía el grupo `primary` — los componentes no compilaban sin configuración explícita
- `BClickableArea` — la tecla Space ahora activa el elemento (convención ARIA para `role="button"`)
- `bedrock-init` — el starter incluye los grupos de color y typesets que los componentes requieren

---

## [0.4.1] — 2026-06-01

### Fixed
- `BBadge` — los atributos externos (`data-*`, clases adicionales, etc.) ahora se propagan correctamente al elemento raíz
- `BMenu` — `flatten` ahora desenrolla todos los niveles de Fragment anidados, independientemente de la profundidad de slot-forwarding

---

## [0.4.0] — 2026-06-01

### Changed
- `BField` — gap entre elementos (`spacing(1)`), tipografía en `.label` (`typeset(label)`)
- `BField` — añadidos estilos para `.hint` y `.error` (tipografía + color semántico)
- `BField` — estado `disabled` con `opacity: 0.6`
- `BInput` — añadidos estilos por defecto: tipografía (`typeset(input)`), padding, fondo, borde, border-radius y color de texto
- `BInput` — estilos de placeholder, foco (outline con color primario) y estado disabled
- `BInput` — transición animada sobre `border-color` y `background-color`

---

## [0.3.0] — 2026-06-01

### Changed
- `BButton` — añadidos estilos por defecto: tipografía (`typeset(button)`), padding, fondo, borde, border-radius y color de texto
- `BButton` — estado hover con cambio de fondo y borde (solo dispositivos no táctiles)
- `BButton` — estado `disabled` completo: `opacity: 0.5` y `cursor: not-allowed`
- `BButton` — transición animada sobre `background-color`, `border-color` y `color`

---

## [0.2.1] — 2026-06-01

### Added
- `BWrapper` — prop `height` con variante `auto` (`data-height="auto"`) para sobrescribir el `height: 100%` por defecto

---

## [0.2.0] — 2026-05-25

### Changed
- Todos los componentes Vue renombrados de prefijo `C` a prefijo `B`
  (`CMenu` → `BMenu`, `CPagination` → `BPagination`, etc.)

### Added
- `@include visuallyHidden` — mixin para ocultar visualmente manteniendo accesibilidad
- Guías de buenas prácticas: encapsulación, orden de declaraciones, CSS global
- Prettier con formato automático al guardar para archivos SCSS

### Fixed
- `BBadge` — correcciones de estructura
- `BLogo` — correcciones menores
- `BMenu` — correcciones de comportamiento y estilos

### Docs
- Documentación de componentes actualizada y ampliada

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
- `BGridLayout` — contenedor de grid con `data-grid-layout`
- `BGridArea` — celda de grid con `data-grid-area`
- `BWrapper` — contenedor con padding responsivo via `data-wrapper`
- `BButton` — botón/enlace sin estilos con `data-*` de estado
- `BClickableArea` — área accionable accesible (teclado + pointer)
- `BLink` — enlace de texto con estructura `.text`
- `BMenu` — menú de navegación semántico por slots
- `BField` — carcasa de campo de formulario (label + control + hint + error)
- `BInput` — input nativo compatible con `v-model`
- `BCheckbox` — checkbox con label, compatible con `v-model` booleano
- `BPagination` — paginación con `v-model`, slots prev/next/page
- `BBadge` — etiqueta de categoría/estado con slot de icono
- `BImage` — figura semántica con `object-fit` y slot de caption
- `BLogo` — logo de marca con enlace opcional y slot de contenido

#### Documentación
- Site de documentación con VitePress en GitHub Pages
- Guías: instalación, consumo, configuración, herramientas, tipografía, layout, animaciones
- Referencia de cada componente: props, slots, atributos `data-*`, estructura HTML, ejemplos, SCSS consumer
- Guía de arquitectura: encapsulación de componentes y patrón wrapper

#### Infraestructura
- GitHub Action para deploy automático a GitHub Pages en cada push a `main`
- `bedrock-init` — CLI para generar el archivo de configuración en el proyecto consumidor

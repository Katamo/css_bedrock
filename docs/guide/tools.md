# Referencia de Herramientas (Tools)

Al importar Bedrock, obtienes acceso a todas las funciones y mixins documentados aquí. Para usarlos en tu proyecto importa tu archivo de configuración:

```scss
@use 'bedrock-config' as *;
```

Con el alias `*` todas las herramientas están disponibles directamente sin prefijo: `spacing(4)`, `@include bpFrom(lg)`, etc.

---

## Índice

1. [Espaciado](#1-espaciado)
2. [Colores](#2-colores)
3. [Breakpoints](#3-breakpoints)
4. [Mutations — Variaciones de estado](#4-mutations--variaciones-de-estado)
5. [Selectores](#5-selectores)
6. [Tipografía](#6-tipografía)
7. [Animación](#7-animación)
8. [Z-Index](#8-z-index)
9. [Detection — Media queries de capacidad](#9-detection--media-queries-de-capacidad)
10. [Utils — Utilidades generales](#10-utils--utilidades-generales)

---

## 1. Espaciado

### `spacing($multiplier)`

Calcula un espaciado multiplicando `$multiplier` por `$spacing-base` (por defecto `8px`).

```scss
.c-card {
  padding: spacing(3);        // 24px
  margin-block-end: spacing(5);  // 40px
  gap: spacing(1);            // 8px
}
```

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `$multiplier` | número | `1` | Factor multiplicador |

> **Consejo:** Usa siempre `spacing()` en lugar de valores `px` hardcodeados. Si cambias `$spacing-base` en tu configuración, todos los espaciados se actualizan automáticamente.

---

## 2. Colores

### `color($color, $variation?)`

Devuelve un color del mapa `$colors`. Si no se especifica variación, devuelve `base`.

```scss
.c-button {
  background-color: color(primary);         // primary.base
  color:            color(text, inverted);  // text.inverted
  border-color:     color(greys, light);    // greys.light
}
```

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `$color` | string | — | Nombre del grupo de color |
| `$variation` | string | `base` | Variante dentro del grupo |

Si el color o la variante no existen, SASS lanza un error de compilación. Asegúrate de tener todos los grupos definidos en tu configuración. Ver [Configuración → Colores](configuration.md).

---

### `contrastColor($color)`

Devuelve `color(white)` o `color(black)` según la luminosidad del color recibido. Útil para garantizar legibilidad automática.

```scss
.c-badge {
  $bg: color(primary);
  background-color: $bg;
  color: contrastColor($bg);  // blanco si primary es oscuro, negro si es claro
}
```

---

### `@include svgTint($color, $prop?, $transitionSpeed?)`

Aplica un color a todos los elementos SVG del elemento actual (`path`, `rect`, `circle`, `line`, `polygon`, `polyline`, `ellipse`) con una transición suave.

```scss
.c-icon {
  @include svgTint(color(primary));

  // En hover, cambia a negro
  @include hover {
    @include svgTint(color(black));
  }
}
```

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `$color` | color | — | Color a aplicar |
| `$prop` | string | `stroke` | Propiedad SVG (`stroke` o `fill`) |
| `$transitionSpeed` | string | `base` | Velocidad de la transición |

---

## 3. Breakpoints

El sistema es **mobile-first**: los estilos base son para el viewport más pequeño; los breakpoints añaden o sobreescriben a medida que la pantalla crece.

| Nombre | Min-width |
|--------|-----------|
| `xxs` | 0 (sin media query) |
| `xs` | 375px |
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `xxl` | 1440px |
| `xxxl` | 1920px |

---

### `@include bpFrom($bp)`

Genera una media query `@media (min-width: ...)` para el breakpoint indicado. Si el breakpoint es `xxs` (0), aplica los estilos sin media query.

```scss
.c-section {
  padding: spacing(6) 0;       // móvil

  @include bpFrom(md) {
    padding: spacing(12) 0;    // tablet en adelante
  }

  @include bpFrom(lg) {
    padding: spacing(20) 0;    // desktop en adelante
  }
}
```

---

### `@include eachBp`

Itera sobre todos los breakpoints definidos en `$breakpoints` y pasa el nombre del breakpoint actual como argumento. Usado internamente por el sistema de typesets y componentes.

```scss
@include eachBp using ($bp) {
  // $bp toma los valores: xxs, xs, sm, md, lg, xl, xxl, xxxl
  [data-cols-#{$bp}="6"] {
    grid-column: span 6;
  }
}
```

---

### `getBpMin($bp)`

Función que devuelve el valor `min-width` en px de un breakpoint. Uso interno principalmente.

```scss
$tablet-width: getBpMin(md); // 768px
```

---

## 4. Mutations — Variaciones de estado

Los mixins de mutations generan selectores CSS encapsulados dentro de la clase raíz del componente. Son la forma estándar de declarar variaciones en Bedrock.

### `@include attr($name, $value?)`

Aplica estilos cuando el **propio elemento** tiene el atributo `data-{name}` (o `data-{name}="value"`).

```scss
.c-button {
  background-color: color(primary);

  // <div class="c-button" data-type="ghost">
  @include attr(type, ghost) {
    background-color: transparent;
    border: 1px solid color(primary);
  }

  // <div class="c-button" data-disabled>
  @include attr(disabled) {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

**CSS generado:**
```css
.c-button[data-type="ghost"] { ... }
.c-button[data-disabled] { ... }
```

---

### `@include context($name, $values?)`

Aplica estilos cuando el componente está **dentro de un ancestro** con `data-{name}="value"`. Permite que los componentes se adapten automáticamente a su entorno.

```scss
.c-button {
  color: color(black);

  // Dentro de: <section data-background="dark">
  @include context(background, dark) {
    color: color(white);
  }

  // Múltiples valores — genera un selector por cada uno
  @include context(background, (dark sky)) {
    border-color: color(white);
  }
}
```

**CSS generado:**
```css
[data-background="dark"] .c-button { color: white; }
[data-background="dark"] .c-button,
[data-background="sky"]  .c-button { border-color: white; }
```

---

### `@include childContext($name, $value?)`

La inversa de `context()`. Aplica estilos a un **descendiente** del componente que tenga el atributo indicado. Permite al componente padre controlar la apariencia de sus hijos dinámicos.

```scss
.m-nav {
  // Controla el estilo del ítem activo dentro del menú
  @include childContext(active) {
    font-weight: bold;
    color: color(primary);
  }

  // <a data-active> dentro de .m-nav recibirá esos estilos
}
```

**CSS generado:**
```css
.m-nav [data-active] { font-weight: bold; color: ...; }
```

---

## 5. Selectores

### `@include hover`

Aplica estilos `:hover` solo en dispositivos que **pueden hacer hover** (ratón o stylus). En dispositivos táctiles no se genera, evitando que los elementos queden "atascados" en estado hover tras un tap.

```scss
.c-link {
  color: color(primary);

  @include hover {
    color: color(primary, dark);
    text-decoration: underline;
  }
}
```

---

### `@include tapAndHover`

Aplica `:hover` **incondicionalmente**, sin detectar la capacidad del dispositivo. Úsalo cuando quieras que el hover funcione también en táctil.

```scss
.c-button {
  @include tapAndHover {
    opacity: 0.8;
  }
}
```

---

### `@include firstChild` / `@include lastChild`

Selectores de posición para el primer y último hijo.

```scss
.c-list-item {
  border-top: 1px solid color(line);

  @include firstChild {
    border-top: none;
  }
}
```

---

### `@include notFirstChild` / `@include notLastChild`

Selectores de posición para todos los hijos excepto el primero o el último. Útiles para añadir separadores o espaciados entre elementos.

```scss
.c-list-item {
  @include notLastChild {
    margin-bottom: spacing(2);
  }
}
```

---

## 6. Tipografía

### `@include typeset($name)` — uso recomendado

Aplica un typeset completo (tamaño, altura de línea, familia, peso, etc.) a través de todos los breakpoints. Es la forma recomendada de aplicar estilos tipográficos. También aplica la versión RTL automáticamente si `$font-typeset-ar` está configurado.

```scss
.c-hero-title {
  @include typeset(h1);
}

.c-body-text {
  @include typeset(body);
}
```

Los typesets se definen en tu archivo de configuración. Ver [Tipografía](typography.md).

---

### `font($family)` y `weight($name)` — uso interno

`font()` y `weight()` son funciones de acceso bajo nivel a los mapas de configuración tipográfica. **No deben usarse directamente en los estilos de componentes o módulos** — para eso existe `typeset()`, que agrupa familia, peso, tamaño y line-height en una sola llamada coherente con el sistema.

Su uso está reservado para la definición interna de typesets dentro del archivo de configuración.

---

### `@include elasticTypeset($name)`

Aplica un typeset fluido cuyo `font-size` se interpola automáticamente entre dos breakpoints. Ideal para títulos grandes.

```scss
.c-display-title {
  @include elasticTypeset(display);
}
```

---

### `@include textEllipsis($lines)`

Trunca el texto con elipsis (`…`) después de `$lines` líneas usando `-webkit-line-clamp`.

```scss
.c-card-title {
  @include textEllipsis(2);  // máximo 2 líneas
}
```

---

### `@include cropLines($typeset, $lines, $forceHeight?)`

Limita el bloque de texto a `$lines` líneas calculando el `max-height` exacto a partir del `line-height` del typeset. Más preciso que `textEllipsis` porque no depende de webkit.

```scss
.c-excerpt {
  @include cropLines(body, 3);         // máximo 3 líneas de texto 'body'
  @include cropLines(body, 3, true);   // además fuerza height fijo
}
```

---

### `@include fontFace($family, $fileName, $weight, $style, $unicode-range?)`

Genera una regla `@font-face` para cargar una fuente local en formato `woff2`.

```scss
@include fontFace('MyFont', '/fonts/myfont-regular', 400, normal);
@include fontFace('MyFont', '/fonts/myfont-bold', 700, normal);

// Con unicode-range (para fuentes con subconjuntos de caracteres)
@include fontFace('MyFont', '/fonts/myfont-latin', 400, normal, 'U+0000-00FF');
```

---

### `@include googleFont($family)`

Importa una fuente de Google Fonts con `display=swap`.

```scss
@include googleFont('Inter:wght@400;700');
```

---

### `@include typesetsClasses($typesets, $elastic?)`

Genera clases CSS `.cr-typography-{nombre}` para cada typeset del mapa. Útil para exponer la escala tipográfica como clases utilitarias.

```scss
@include typesetsClasses($font-typeset);
// Genera: .cr-typography-h1, .cr-typography-body, etc.

@include typesetsClasses($font-typeset-elastic, true);
// Genera: .cr-typography-elastic-display, etc.
```

---

## 7. Animación

### `speed($name)`

Devuelve una duración del mapa `$transition-times`. Si se le pasa un número directamente, lo devuelve tal cual.

```scss
.c-overlay {
  transition: opacity speed(fast);   // 200ms
  transition: opacity speed(slow);   // 800ms
  transition: opacity speed(300ms);  // 300ms (valor directo)
}
```

---

### `curve($type, $ease?)`

Devuelve una curva Bézier del mapa `$transition-curves`. Se pasa como lista `(tipo, variante)`.

```scss
.c-panel {
  transition: transform speed(base) curve(ease, out);
  transition: opacity   speed(fast) curve(quad, in-out);
}
```

Familias disponibles por defecto: `linear`, `ease`, `quad`.
Variantes disponibles: `base`, `in`, `out`, `in-out`.

---

### `@include transition($properties, $speed?, $delay?, $curve?)`

Aplica transiciones CSS de forma semántica. Solo genera código si las animaciones están habilitadas (`canAnimate`).

```scss
.c-card {
  @include transition((opacity transform));                         // múltiples propiedades
  @include transition((background-color), fast);                   // velocidad personalizada
  @include transition((transform), base, 100ms, (ease, out));      // con delay y curva
}
```

| Parámetro | Por defecto | Descripción |
|-----------|-------------|-------------|
| `$properties` | — | Lista de propiedades CSS |
| `$speed` | `base` | Nombre del token de velocidad o valor en ms |
| `$delay` | `0ms` | Retardo inicial |
| `$curve` | `(quad, in-out)` | Curva de animación como lista `(tipo, variante)` |

---

### `@include transition-reveal`

Aplica una transición de aparición por opacidad (fade-in). Se integra con el contexto `data-not-revealed` para el estado inicial de animaciones de scroll.

Respeta automáticamente `prefers-reduced-motion`: si el usuario prefiere reducir el movimiento, desactiva la transición y muestra el elemento directamente.

```scss
.m-hero {
  @include transition-reveal;
  // El elemento empieza invisible cuando un ancestro tiene data-not-revealed
  // y hace fade-in al quitárselo
}
```

---

## 8. Z-Index

### `z-layer($layer)`

Devuelve el valor z-index de una capa definida en `$z-layers`. Centraliza todos los z-index del proyecto, evitando conflictos.

```scss
.c-modal {
  z-index: z-layer(modal);    // 400
}

.c-header {
  z-index: z-layer(header);   // 200
}
```

---

### `zAbove($layer)` / `zBelow($layer)`

Devuelven el z-index una unidad por encima o por debajo de la capa indicada. Útiles cuando necesitas posicionar un elemento justo encima o debajo de una capa conocida sin crear una nueva entrada en el mapa.

```scss
.c-dropdown-overlay {
  z-index: zAbove(dropdown);  // 51 — justo encima de los dropdowns
}

.c-header-shadow {
  z-index: zBelow(header);    // 199
}
```

---

## 9. Detection — Media queries de capacidad

Estos mixins encapsulan media queries de detección de capacidades del dispositivo. Permiten escribir CSS progresivo y accesible sin repetir las media queries manualmente.

### `@include canHover`

Se aplica en dispositivos que **pueden hacer hover** (no táctiles, o IE11).

### `@include noTouch`

Se aplica cuando el dispositivo tiene un puntero de alta precisión (ratón o stylus).

### `@include reducedMotion`

Se aplica cuando el usuario tiene activada la preferencia de sistema **"reducir movimiento"** (`prefers-reduced-motion: reduce`). Úsalo para desactivar o simplificar animaciones.

```scss
.c-banner {
  @include transition((transform), slow);

  @include reducedMotion {
    transition: none;  // sin animación si el usuario lo prefiere
  }
}
```

### `@include print`

Se aplica solo al imprimir.

```scss
.c-nav {
  @include print {
    display: none;
  }
}
```

### `@include screen`

Se aplica solo en pantalla (no impresión). Inverso de `print`.

### `@include monochrome`

Se aplica en pantallas en blanco y negro (e-ink, algunos modos de accesibilidad).

### `@include touchLandscape`

Se aplica en dispositivos táctiles en orientación **landscape**. Útil para ajustar layouts en móviles girados.

### `@include canBuildComplexUI`

Se aplica cuando el dispositivo tiene un puntero preciso (no táctil). Similar a `noTouch`, pero semánticamente indica que el dispositivo puede soportar UIs complejas.

### `@include isIE`

Se aplica en Internet Explorer 11 (vía `-ms-high-contrast`).

### `@include canAnimate`

Se aplica cuando las animaciones están habilitadas. Actualmente equivale a `@media screen`. Usado internamente por el mixin `transition`.

---

## 10. Utils — Utilidades generales

### `pxToRem($values)`

Convierte uno o varios valores en `px` a `rem`, usando `$rem-base` (por defecto `16px`) como referencia. Acepta listas de valores.

```scss
.c-hero {
  padding:       pxToRem(24px);         // 1.5rem
  margin:        pxToRem(16px 32px);    // 1rem 2rem
  border-radius: pxToRem(8px);          // 0.5rem
}
```

---

### `@include RTL` / `@include LTR` / `@include defaultDIR` / `@include notRTL`

Mixins para aplicar estilos según la dirección de lectura del documento (`dir` en `<html>`).

```scss
.c-arrow-icon {
  transform: rotate(0deg);

  // En documentos RTL (árabe, hebreo…)
  @include RTL {
    transform: rotate(180deg);
  }
}
```

| Mixin | Selector generado | Cuándo se aplica |
|-------|-------------------|-----------------|
| `RTL` | `html[dir="rtl"] &` | Documentos RTL |
| `LTR` | `html[dir="ltr"] &` | Documentos LTR explícitos |
| `defaultDIR` | `html:not([dir]) &, html[dir="auto"] &, html[dir="ltr"] &` | LTR por defecto (sin `dir`, `auto`, o `ltr`) |
| `notRTL` | `html:not([dir="RTL"]) &` | Cualquier cosa que no sea RTL |

> Bedrock usa propiedades lógicas CSS (`margin-inline-start`, `padding-block-end`…) siempre que es posible, por lo que `RTL` y `LTR` solo son necesarios para casos que las propiedades lógicas no cubren (transformaciones, animaciones, assets SVG).

---

### `@include visuallyHidden`

Oculta el elemento visualmente pero lo mantiene accesible para lectores de pantalla. Implementa la técnica estándar de accesibilidad.

```scss
.c-skip-link {
  @include visuallyHidden;

  &:focus {
    // Se vuelve visible al recibir foco (para navegación por teclado)
    position: static;
    width: auto;
    height: auto;
  }
}
```

---

### `@include scaleOnHover($scale?)`

Escala el elemento al hacer hover con una transición suave. Solo actúa en dispositivos que pueden hacer hover.

```scss
.c-thumbnail {
  @include scaleOnHover(1.05);  // escala al 105% en hover
}
```

| Parámetro | Por defecto | Descripción |
|-----------|-------------|-------------|
| `$scale` | `1.1` | Factor de escala |

---

### `@include horizontalScrollMobile($padding?, $child-selector?)`

Configura scroll horizontal con momentum y `scroll-snap` en mobile. Se desactiva automáticamente a partir de `lg`.

```scss
.c-stories-row {
  @include horizontalScrollMobile(spacing(4), '.c-story-card');
  // .c-story-card recibirá scroll-snap-align: start
}
```

---

### `@include dot($color?, $size?)`

Genera un punto circular con las dimensiones y color indicados.

```scss
.c-status-indicator {
  @include dot(color(success), 8);  // círculo verde de 8px
}
```

---

### Funciones internas

Estas funciones son usadas internamente por otras herramientas. No suelen necesitarse directamente en los componentes.

| Función | Descripción |
|---------|-------------|
| `strip-unit($value)` | Elimina la unidad de un valor CSS (`16px` → `16`) |
| `is-number($value)` | Devuelve `true` si el valor es un número |
| `is-px($value)` | Devuelve `true` si el valor está en píxeles |
| `elasticValue($values)` | Genera un `calc()` para valores fluidos entre dos breakpoints |
| `getTypeProps($type, $variant, $bp)` | Obtiene las propiedades de un typeset para un breakpoint concreto |

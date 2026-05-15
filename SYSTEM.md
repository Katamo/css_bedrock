# CSS Bedrock — Sistema de componentes y variaciones de estilo

## Índice

1. [Arquitectura en capas](#1-arquitectura-en-capas)
2. [Components — Unidades de UI](#2-components--unidades-de-ui)
3. [Modules — Bloques de página completos](#3-modules--bloques-de-página-completos)
4. [Composición de páginas](#4-composición-de-páginas)
5. [Sistema de variaciones de estilo](#5-sistema-de-variaciones-de-estilo)
   - [Variaciones por breakpoint](#51-variaciones-por-breakpoint)
   - [Variaciones por atributo](#52-variaciones-por-atributo)
   - [Variaciones por contexto](#53-variaciones-por-contexto)
   - [Variaciones por contexto hijo](#54-variaciones-por-contexto-hijo)
   - [Variaciones por hover](#55-variaciones-por-hover)
   - [Variaciones por dirección RTL/LTR](#56-variaciones-por-dirección-rtlltr)
   - [Combinación de variaciones](#57-combinación-de-variaciones)

---

## 1. Arquitectura en capas (Guía para tu proyecto)

Bedrock propone estructurar tu proyecto frontend en dos capas de abstracción, de menor a mayor complejidad. Bedrock proporciona componentes base de layout, y tú construyes las demás capas utilizando las herramientas del framework:

```
Components  →  unidades de UI reutilizables (button, tag, menu, modal…)
Modules     →  bloques de página completos que componen varios componentes
```

Todas las capas cargan `core.scss` usando `@use`, que inyecta las herramientas (mixins, funciones) y los tokens del design system (variables) sin emitir ningún CSS por sí mismo.

```scss
// Patrón estándar en cualquier archivo de estilos
@use '../../../core' as *;

.c-button { ... }
```

---

## 2. Components — Unidades de UI

Los componentes son unidades de interfaz reutilizables. Su clase raíz sigue la convención `.c-{nombre}`. Cada componente:

- Importa solo `core.scss`
- Define sus estilos base dentro de su clase raíz
- Declara todas sus variaciones dentro de esa misma clase, agrupadas al final

```
src/components/
├── article/       rich-text
├── brand/         logo
├── containers/    modal, section, spy, sticky-element
├── covers/        agenda-cover, card-cover, challenge-cover, contact-cover…
├── cta/           arrow-button, button, download, icon-button, lang-switch…
├── fields/        input-checkbox, input-dropdown, input-text, select-dropdown…
├── info/          cookies, dot-label, tag, pretitle, stats, time…
├── layout/        page
├── media/         video, youtube
├── nav/           hamburger, menu, pagination, simple-menu, toggle-filters…
├── progress/      loader
├── seo/           hidden-heading
└── visual/        animated-gradient, animated-value
```

**Ejemplo de componente completo — `.c-tag`:**

```scss
.c-tag {
  // Estilos base
  @include typeset(ac2);
  display: inline-flex;
  border-radius: spacing(3);
  border: 1px solid;
  color: color(black);

  // Variación por atributo: tag de tipo "time"
  @include attr(time) {
    @include typeset(b3);
    border-color: color(primary, dune);
    color: color(primary, dune);
  }

  // Variación por contexto: dentro de fondo sky
  @include context(background, sky) {
    @include attr(time) {
      border-color: color(white);
      color: color(white);
    }
  }
}
```

---

## 3. Modules — Bloques de página completos

Los módulos son la unidad más grande del sistema. Su clase raíz sigue la convención `.m-{nombre}`. Cada módulo:

- Representa una sección completa y autocontenida de una página
- Compone internamente uno o varios componentes
- Tiene sentido semántico propio (una hero section, un listado de eventos, un footer completo)
- Puede vivir solo en una página sin depender de otros módulos

Los módulos **no importan otros módulos**, solo importan `core.scss` y usan clases de componentes dentro de su estructura.

```
src/modules/
├── about-us, agenda, challenges, columns, contact-grid
├── edition-navigation, edition-selector, editions-list
├── error, event-details, event-stats, events-slider
├── featured-event, featured-post, filtered-events
├── footer, hooks-menu, image-grid, images-slider
├── item-details, long-text, main-hero, news-grid
├── ongoing-events, organizations, page-hero, partners
├── pillars-list, post-content, post-hero, posts-mosaic
├── posts-slider, promo, resources-list, rich-text
├── stories-grid, ten-anniversary, text-columns, text-slider
└── video-grid
```

**Ejemplo de módulo — `.m-footer`:**

```scss
// El módulo define su propia estructura
.m-footer {
  @include transition-reveal;
  background-color: color(black);
  border-top: 1px solid color(line, grey);

  .navigation-bar {
    .navigation-bar-wrapper {
      // El módulo orquesta el layout interno de sus componentes
      .menu { margin: spacing(9) 0; }  // .c-menu vive aquí

      .bottom-wrapper {
        .social-buttons {
          display: flex;
          .social-button { ... }  // .c-social-button vive aquí
        }
        .copyright { ... }
      }
    }
  }

  // Variación responsive del módulo completo
  @include bpFrom(xl) {
    .navigation-bar .navigation-bar-wrapper {
      .menu { display: flex; }
      .bottom-wrapper { display: flex; }
    }
  }
}
```

**Diferencia clave entre componente y módulo:**

| | Componente | Módulo |
|--|------------|--------|
| Prefijo de clase | `.c-` | `.m-` |
| Complejidad | Unidad atómica de UI | Composición de varios componentes |
| Autonomía semántica | Parcial (necesita contexto) | Total (sección de página completa) |
| Ejemplo | `.c-button`, `.c-tag` | `.m-footer`, `.m-main-hero` |

---

## 4. Composición de páginas

Una página se construye apilando módulos, cada uno envuelto en su propia estructura de layout:

```html
<!-- Página típica -->
<page>

  <!-- Módulo 1: hero, ocupa todo el ancho -->
  <b-wrapper type="full">
    <div class="m-main-hero">...</div>
  </b-wrapper>

  <!-- Módulo 2: sección con padding estándar -->
  <b-wrapper type="default">
    <div class="m-featured-event">
      <!-- El módulo orquesta el grid internamente -->
      <b-grid>
        <b-cell width-xxs="12" width-lg="8">
          <div class="c-card-cover">...</div>
        </b-cell>
        <b-cell width-xxs="12" width-lg="4">
          <div class="c-tag">...</div>
        </b-cell>
      </b-grid>
    </div>
  </b-wrapper>

  <!-- Módulo 3: footer, fondo oscuro -->
  <div class="m-footer">
    <b-wrapper type="default">
      <div class="c-menu">...</div>
    </b-wrapper>
  </div>

</page>
```

Los módulos son independientes entre sí. El orden y combinación de módulos en una página es responsabilidad de la capa de aplicación (Vue, template HTML, etc.), no del sistema de estilos.

---

## 5. Sistema de variaciones de estilo

Todas las variaciones se declaran **dentro** de la clase raíz del componente o módulo usando mixins de `tools/`. El CSS generado siempre está correctamente encapsulado.

---

### 5.1 Variaciones por breakpoint

**Mixin:** `bpFrom($bp)` — genera un `@media (min-width: ...)` para el breakpoint indicado.

Sistema mobile-first: los estilos base son para móvil, los breakpoints añaden o sobreescriben a partir del tamaño indicado.

**Breakpoints disponibles:**

| Nombre | Min-width |
|--------|-----------|
| `xxs`  | 0 (sin media query) |
| `xs`   | 375px |
| `sm`   | 480px |
| `md`   | 768px |
| `lg`   | 1020px |
| `xl`   | 1280px |
| `xxl`  | 1480px |
| `xxxl` | 1920px |

**Patrón de uso:**

```scss
.c-section {
  // Base (mobile)
  padding: spacing(14) 0 spacing(10);

  @include bpFrom(lg) {
    // Desktop: más padding y layout en fila
    padding: spacing(32) 0 spacing(18);

    .heading-wrapper .header-container {
      display: flex;
      justify-content: space-between;
    }
  }

  @include bpFrom(xl) {
    // Extra-large: ajustes finos de espaciado
    .heading-wrapper .pretitle-wrapper {
      margin-block-end: spacing(20);
    }
  }
}
```

**Los breakpoints pueden anidarse dentro de atributos** para afinar una variación en un rango específico:

```scss
.c-button {
  @include bpFrom(md) {
    .container { height: spacing(12); }

    // El atributo "large" tiene un tamaño diferente en desktop
    @include attr(size, large) {
      .container { height: spacing(15); }
    }
  }
}
```

---

### 5.2 Variaciones por atributo

**Mixin:** `attr($name, $value?)` — aplica estilos cuando el elemento tiene `data-{name}="value"` (o solo `data-{name}` si no se pasa valor).

Los atributos son la forma de declarar **variantes de un mismo componente**: tipos, tamaños, colores, estados configurables.

**CSS generado:**

```scss
@include attr(type, link)   →  &[data-type="link"] { ... }
@include attr(disabled)     →  &[data-disabled] { ... }
@include attr(size, large)  →  &[data-size="large"] { ... }
```

**Uso en HTML:**

```html
<div class="c-button" data-type="link">...</div>
<div class="c-button" data-size="large">...</div>
<div class="c-button" data-disabled>...</div>
```

**Ejemplo completo — `.c-button`:**

```scss
.c-button {
  // Estilo base: botón con fondo sunrise
  .container {
    border-color: color(primary, sunrise);
    background-color: color(primary, sunrise);
    height: spacing(9);
  }

  // data-type="link" → botón estilo enlace sin relleno
  @include attr(type, link) {
    .container {
      background-color: color(white);
      border-color: color(white);
    }
  }

  // data-disabled → botón deshabilitado
  @include attr(disabled) {
    pointer-events: none;
    .container {
      color: color(text, grey);
      background: color(white);
    }
  }

  // data-size="large" → botón más alto
  @include attr(size, large) {
    .container { height: spacing(12); }
  }

  // data-color="transparent" → botón sin fondo
  @include attr(color, transparent) {
    .container {
      border-color: color(black);
      background-color: transparent;
    }
  }
}
```

**Atributos en módulos** — los módulos también usan atributos para variantes de su sección completa:

```scss
.c-section {
  // data-spacing="none" → sección sin padding
  @include attr(spacing, none) {
    padding: 0;
    @include bpFrom(lg) { padding: 0; }
  }

  // data-background="dark" → sección con fondo oscuro
  @include attr(background, dark) {
    background-color: color(black);
    .heading-wrapper .title { color: color(text, white); }
  }

  // data-with-border-top (sin valor) → añade línea superior
  @include attr(with-border-top) {
    .hr { display: block; border-block-start: 1px solid color(greys, grey03); }
  }
}
```

---

### 5.3 Variaciones por contexto

**Mixin:** `context($name, $value?)` — aplica estilos cuando el componente está **dentro de un ancestro** con `data-{name}="value"`.

El contexto es la forma de hacer que un componente **se adapte automáticamente** al entorno donde está colocado, sin que la capa de aplicación tenga que pasar configuraciones explícitas a cada componente interior.

**CSS generado:**

```scss
@include context(background, dark)  →  [data-background="dark"] & { ... }
@include context(is-first)          →  [data-is-first] & { ... }
@include context(not-revealed)      →  [data-not-revealed] & { ... }
```

**Uso en HTML:** el atributo se pone en un ancestro, no en el componente:

```html
<!-- El ancestro declara el contexto -->
<div data-background="dark">

  <!-- Los componentes hijos reaccionan automáticamente -->
  <div class="c-button">...</div>   <!-- se vuelve oscuro -->
  <div class="c-menu">...</div>     <!-- links en blanco -->
  <div class="c-section">...</div>  <!-- títulos en blanco -->

</div>
```

**Ejemplo — `.c-button` que reacciona al contexto oscuro:**

```scss
.c-button {
  .container {
    background-color: color(primary, sunrise);
    color: color(black);
  }

  // Dentro de data-background="dark": se adapta al fondo
  @include context(background, dark) {
    .container {
      background-color: color(black);
      color: color(white);
    }
  }
}
```

**Ejemplo — `.m-main-hero` que reacciona al contexto de posición:**

```scss
.m-main-hero {
  // Estilos base del héroe
  height: 89vh;

  // Cuando es el primer módulo de la página, compensa la altura del header
  // El ancestro <page> añade data-is-first cuando el héroe es el primero
  @include context(is-first) {
    margin-top: -$header-height-mobile;

    @include bpFrom(md) { margin-top: -$header-height-tablet; }
    @include bpFrom(lg) { margin-top: -$header-height; }
  }

  // Estado inicial antes de la animación de reveal (scroll intersection)
  @include context(not-revealed) {
    opacity: 0;
  }
}
```

**El contexto puede recibir múltiples valores** — genera un selector para cada uno:

```scss
// En el mixin:
@include context(background, (dark sky))  →  [data-background="dark"] &, [data-background="sky"] & { ... }
```

**Contextos comunes en el sistema:**

| Atributo de contexto | Significado |
|---------------------|-------------|
| `data-background="dark"` | Fondo oscuro, componentes invierten colores |
| `data-background="sky"` / `"sunrise"` | Fondo de color de marca |
| `data-is-first` | Módulo es el primero visible en la página |
| `data-not-revealed` | Módulo aún no ha sido intersectado (estado inicial de animación) |

---

### 5.4 Variaciones por contexto hijo

**Mixin:** `childContext($name, $value?)` — aplica estilos a un **descendiente** que tenga `data-{name}="value"`, en lugar de reaccionar a un ancestro.

Es la inversa del contexto: permite que el componente padre controle el estilo de un hijo identificado por atributo, sin necesidad de añadir clases adicionales.

**CSS generado:**

```scss
@include childContext(type, primary)  →  & [data-type="primary"] { ... }
@include childContext(active)         →  & [data-active] { ... }
```

**Cuándo usar cada uno:**

| Mixin | Dirección | Caso de uso |
|-------|-----------|-------------|
| `context()` | Ancestro → componente | El componente reacciona al entorno donde está |
| `attr()` | El propio elemento | El componente tiene una variante declarada en sí mismo |
| `childContext()` | Componente → descendiente | El componente controla el estilo de un hijo dinámico |

---

### 5.5 Variaciones por hover

**Mixin:** `hover` — envuelve automáticamente en `@include canHover { &:hover { ... } }`, evitando que el hover se active en dispositivos táctiles.

```scss
.c-button {
  .container { background-color: color(primary, sunrise); }

  // Solo en dispositivos con puntero fino (no táctiles)
  @include hover {
    .container { background-color: color(white); }
  }
}
```

El mixin `canHover` usa la media query `@media (hover: hover) and (pointer: fine)`, así que en móvil táctil el hover nunca se dispara.

Para casos donde se quiere hover incondicional (sin detección de capacidad), existe `tapAndHover`:

```scss
@include tapAndHover {
  // Se activa en :hover sin comprobar si el dispositivo puede hacer hover
}
```

---

### 5.6 Variaciones por dirección RTL/LTR

**Mixins:** `RTL`, `LTR`, `defaultDIR`, `notRTL` — permiten declarar estilos específicos de dirección de escritura dentro del componente.

```scss
.c-menu {
  // Estilos base (neutral)
  .link::before {
    transform-origin: 100% 50%;
  }

  // En RTL: la animación de underline se invierte
  @include RTL {
    @include bpFrom(lg) {
      .link::before { transform-origin: 0% 50%; }

      @include hover {
        .link::before { transform-origin: 100% 50%; }
      }
    }
  }
}
```

El framework asume LTR por defecto y usa propiedades lógicas CSS (`margin-inline-start`, `inset-inline-end`, `padding-block-start`…) siempre que es posible, de modo que el RTL es manejado automáticamente por el navegador en la mayoría de casos. Los bloques `@include RTL` solo son necesarios para ajustes que las propiedades lógicas no cubren (animaciones, transformaciones geométricas, assets SVG).

---

### 5.7 Combinación de variaciones

Las variaciones se pueden anidar libremente. El orden convencional dentro de un componente es:

```scss
.c-componente {

  // 1. Estilos base (mobile-first)
  ...

  // 2. Selectores de posición
  @include firstChild { ... }
  @include notLastChild { ... }

  // 3. Hover
  @include hover { ... }

  // 4. Breakpoints
  @include bpFrom(md) { ... }
  @include bpFrom(lg) { ... }

  // 5. Atributos / variantes
  @include attr(type, secondary) { ... }
  @include attr(size, large) {
    // Los atributos pueden contener breakpoints
    @include bpFrom(lg) { ... }
  }

  // 6. Contextos (reacciones al entorno)
  @include context(background, dark) { ... }
  @include context(not-revealed) { ... }

  // 7. Dirección
  @include RTL { ... }
}
```

**Ejemplo de combinación compleja — `.c-card-cover`:**

```scss
.c-card-cover {
  // Base
  .content .title {
    @include typeset(h2);
    color: color(black);
  }

  // Breakpoint
  @include bpFrom(md) {
    .content .location { margin-block-start: spacing(5); }
  }

  // Atributo: card clickable (imagen con zoom y título con hover)
  @include attr(clickable) {
    .content .card-image {
      @include transition((transform));
      @include hover { transform: scale3d(0.97, 0.97, 1); }
    }
    .content .title {
      @include hover { color: color(greys); }
    }
  }

  // Atributo: truncar título a 2 líneas
  @include attr(title-lines, 2) {
    .title { @include textEllipsis(2, h2); }
  }

  // Atributo: ratio de imagen 16/9
  @include attr(image-ratio, '16/9') {
    .card-image { padding-block-start: 56.25%; }
  }

  // Contexto: dentro de sección oscura
  @include context(background, dark) {
    .content .title { color: color(white); }
    .content .date  { color: color(white); }
  }
}
```

---

## Referencia rápida de mixins de variación

| Mixin | CSS generado | Cuándo usarlo |
|-------|-------------|---------------|
| `bpFrom(lg)` | `@media (min-width: 1020px)` | Cambios responsive |
| `attr(type, link)` | `&[data-type="link"]` | Variantes del propio elemento |
| `attr(disabled)` | `&[data-disabled]` | Estado sin valor en el propio elemento |
| `context(background, dark)` | `[data-background="dark"] &` | El componente reacciona a su entorno |
| `context(is-first)` | `[data-is-first] &` | Contexto sin valor en un ancestro |
| `childContext(type, primary)` | `& [data-type="primary"]` | El padre controla estilos de un descendiente |
| `hover` | `@media(hover:hover) { &:hover }` | Interacción, solo en no-táctil |
| `tapAndHover` | `&:hover` | Hover incondicional |
| `RTL` | `[dir="rtl"] &` | Ajustes de escritura RTL |
| `firstChild` | `&:first-child` | Selector de posición |
| `notLastChild` | `&:not(:last-child)` | Selector de posición |


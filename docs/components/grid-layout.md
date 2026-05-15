# Grid Layout

`CGridLayout` y `CGridArea` son primitivas de estructura para gestionar layouts basados en **CSS Grid** de forma declarativa. El grid se define completamente en SASS — los componentes Vue solo añaden los atributos `data-*` que los mixins necesitan para generar el CSS correcto.

---

## 1. Marcado en Vue

```vue
<template>
  <div class="m-page">
    <CGridLayout layout="page">
      <CGridArea area="header">
        <AppHeader />
      </CGridArea>
      <CGridArea area="main">
        <slot />
      </CGridArea>
      <CGridArea area="footer">
        <AppFooter />
      </CGridArea>
    </CGridLayout>
  </div>
</template>

<script setup>
import { CGridLayout, CGridArea } from '@bedrock/core/vue';
</script>
```

**Props de `CGridLayout`:**
- `layout` — nombre del grid, debe coincidir con el usado en `grid-layout()`.
- `tag` — etiqueta HTML a renderizar (por defecto `div`).

**Props de `CGridArea`:**
- `area` — nombre del área, debe coincidir con el usado en `grid-area()`.
- `tag` — etiqueta HTML a renderizar (por defecto `div`).

---

## 2. Definir el grid en SASS

El mixin `grid-layout()` activa `display: grid` y aplica las propiedades solo cuando el elemento tiene el atributo correspondiente. Los `grid-area()` se anidan dentro del bloque del layout:

```scss
@use 'bedrock-config' as *;

.m-page {
  @include grid-layout('page') {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;

    @include grid-area('header') { }
    @include grid-area('main') { }
    @include grid-area('footer') { }
  }
}
```

---

## 3. Cambiar el grid según el breakpoint

El layout puede cambiar completamente en función del viewport. Los breakpoints se definen dentro del bloque `grid-layout()` con `bpFrom()`.

### Ejemplo: hero que pasa de apilado a dos columnas

En móvil, imagen y texto se apilan. A partir de `md`, se colocan en paralelo. A partir de `lg`, la imagen ocupa más espacio.

```scss
.m-hero {
  @include grid-layout('hero') {
    grid-template-areas:
      "image"
      "content";

    @include bpFrom(md) {
      grid-template-areas: "image content";
      grid-template-columns: 1fr 1fr;
      gap: spacing(8);
    }

    @include bpFrom(lg) {
      grid-template-columns: 3fr 2fr;
    }

    @include grid-area('image') { }
    @include grid-area('content') {
      align-self: center;
    }
  }
}
```

### Ejemplo: panel con sidebar lateral

En móvil, el contenido aparece primero y el sidebar debajo. A partir de `md`, se colocan en paralelo con una columna fija para el sidebar.

```scss
.m-dashboard {
  @include grid-layout('dashboard') {
    grid-template-areas:
      "main"
      "sidebar";

    @include bpFrom(md) {
      grid-template-areas: "sidebar main";
      grid-template-columns: 240px 1fr;
    }

    @include bpFrom(lg) {
      grid-template-columns: 320px 1fr;
    }

    @include grid-area('sidebar') { }
    @include grid-area('main') { }
  }
}
```

### Ejemplo: grid de galería que aumenta columnas

Un grid de cards que pasa de 1 columna a 2 y luego a 3 conforme crece la pantalla.

```scss
.m-gallery {
  @include grid-layout('gallery') {
    grid-template-areas: "card";
    grid-template-columns: 1fr;
    gap: spacing(4);

    @include bpFrom(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include bpFrom(lg) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include grid-area('card') { }
  }
}
```

---

## 4. Referencia de mixins

### `grid-layout($name)`
Aplica reglas de estilo solo cuando el elemento tiene `data-grid-layout="$name"`. Activa automáticamente `display: grid`. Recibe un bloque `@content` con las propiedades del grid y los `grid-area()` anidados.

### `grid-area($name)`
Asigna el elemento a la `grid-area` correspondiente, buscando el atributo `data-grid-area="$name"` en el elemento o sus descendientes directos.

---

## 5. Notas

- **Cada módulo define su propio layout con un nombre único.** Varios módulos pueden usar `CGridLayout` con layouts distintos sin interferir entre sí.
- **Sin Shadow DOM.** Los mixins globales (`spacing()`, `color()`, `typeset()`) funcionan dentro de los componentes sin restricciones.
- **El CSS es la única fuente de verdad.** Los componentes Vue solo añaden atributos `data-*`; toda la lógica visual vive en SASS.

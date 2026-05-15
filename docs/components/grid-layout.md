# Grid Layout

El sistema `grid-layout` es una primitiva de estructura diseñada para gestionar layouts basados en **CSS Grid** de forma declarativa mediante el mapeo de `grid-template-areas`.

Bedrock ofrece dos formas principales de utilizar este sistema: mediante la **Integración con Vue 3** (recomendado para proyectos Vue) o mediante **Mixins SASS** (máxima flexibilidad).

---

## 1. Uso con Vue 3 (Integración Nativa)

Si trabajas con Vue 3, Bedrock proporciona componentes nativos en JS que evitan los warnings de Custom Elements y ofrecen una experiencia de desarrollo fluida con soporte para DevTools y reactividad total.

### Importación

```javascript
import { CGridLayout, CGridArea } from '@bedrock/core/vue';
```

### Marcado en Vue

```html
<template>
  <CGridLayout layout="hero-split" tag="section" class="my-custom-hero">
    <CGridArea area="image">...</CGridArea>
    <CGridArea area="content">...</CGridArea>
  </CGridLayout>
</template>

<script setup>
import { CGridLayout, CGridArea } from '@bedrock/core/vue';
</script>
```

**Ventajas de la integración con Vue:**
- **Sin configuración extra:** No necesitas tocar `isCustomElement` en Vite.
- **Transparencia:** Soporta herencia de atributos (`class`, `id`, `@click`) automáticamente.
- **Etiqueta dinámica:** Puedes usar la prop `tag` para cambiar el elemento HTML renderizado (por defecto `div`).

---

## 2. Uso con Mixins SASS (Avanzado)

Si prefieres no usar componentes o necesitas aplicar grid a elementos existentes (como un `main` o un `section`), puedes usar los mixins directamente.

### Marcado HTML

```html
<section class="m-hero" data-grid-layout="hero-split">
  <div class="visual" data-grid-area="image">...</div>
  <div class="text" data-grid-area="content">...</div>
</section>
```

### SCSS

```scss
@use '@bedrock/core' as *;

.m-hero {
  // El mixin grid-layout activa automáticamente display: grid
  @include grid-layout(hero-split) {
    grid-template-areas: "image content";
    grid-template-columns: 1fr 1fr;
    gap: spacing(4);

    @include bpFrom(lg) {
      grid-template-columns: 2fr 1fr;
    }
  }
}

// Posicionamiento de las áreas
.visual { @include grid-area(image); }
.text   { @include grid-area(content); }
```

---

## 3. Referencia de Mixins

### `grid-layout($name)`
Aplica reglas de estilo solo cuando el elemento tiene `data-grid-layout="$name"`. **Activa automáticamente `display: grid`**.

### `grid-area($name)`
Asigna el elemento a la `grid-area` correspondiente buscando el atributo `data-grid-area="$name"`.

---

## 4. Ejemplo completo en Vue

```vue
<template>
  <CGridLayout layout="dashboard" class="c-dashboard">
    <CGridArea area="sidebar">...</CGridArea>
    <CGridArea area="main">...</CGridArea>
  </CGridLayout>
</template>

<style lang="scss">
@use '@bedrock/core' as *;

.c-dashboard {
  min-height: 100vh;

  @include grid-layout(dashboard) {
    grid-template-areas: "sidebar main";
    grid-template-columns: 300px 1fr;
  }
}
</style>
```

---

## 5. Ventajas de la arquitectura Bedrock

1.  **Soporte para descendientes:** Los mixins `grid-layout` y `grid-area` buscan el atributo tanto en el elemento actual como en sus hijos. Esto permite envolver componentes (como en tu `Shell.vue`) sin romper el vínculo con el CSS.
2.  **Transparencia:** Al no usar Shadow DOM, todos tus mixins globales (`spacing`, `color`, `typography`) funcionan dentro de los componentes sin restricciones.
3.  **Sincronización Automática:** Los componentes traducen las props (`layout`, `area`) a atributos `data-*` automáticamente, manteniendo el CSS como única fuente de verdad para el diseño.

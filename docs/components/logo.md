# Logo

`CLogo` es un componente de marca para mostrar el logotipo de la web. Envuelve `CImage` y opcionalmente convierte el logo en un enlace. Acepta un slot para inyectar contenido adicional (nombre de marca, tagline) junto a la imagen.

---

## Importación

```js
import { CLogo } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/logo';
```

---

## Props

| Prop       | Tipo      | Default | Descripción |
|------------|-----------|---------|-------------|
| `src`      | `String`  | —       | **Requerido.** URL de la imagen del logo. |
| `alt`      | `String`  | `''`    | Texto alternativo de la imagen. |
| `href`     | `String`  | `null`  | Si se pasa, el interior renderiza como `<a>` en lugar de `<div>`. Aplica `data-has-pointer`. |
| `disabled` | `Boolean` | `false` | Aplica `data-disabled`. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Contenido adicional junto a la imagen (nombre de marca, tagline, etc.). Se inyecta directamente dentro de `.logo`, después de la imagen. |

---

## Atributos de datos generados

| Atributo           | Cuándo aparece |
|--------------------|----------------|
| `data-has-pointer` | Cuando se pasa `href`. |
| `data-has-text`    | Cuando el slot `default` tiene contenido. |
| `data-disabled`    | Cuando `disabled` es `true`. |

---

## Estructura HTML generada

```html
<!-- Sin href, sin slot -->
<div class="c-logo">
  <div class="logo">
    <figure class="c-image" data-fit="contain">
      <img src="..." alt="..." loading="eager" draggable="false" />
    </figure>
  </div>
</div>

<!-- Con href y slot -->
<div class="c-logo" data-has-pointer data-has-text>
  <a class="logo" href="/">
    <figure class="c-image" data-fit="contain">
      <img src="..." alt="..." loading="eager" draggable="false" />
    </figure>
    <span>LeMenu</span>
  </a>
</div>
```

---

## Ejemplos de uso

### Logo simple

```html
<CLogo src="/logo.svg" alt="Mi marca" />
```

### Logo como enlace a la home

```html
<CLogo src="/logo.svg" alt="Mi marca" href="/" />
```

### Logo con nombre de marca

```html
<CLogo src="/logo.svg" alt="" href="/">
  <span class="brand-name">Mi marca</span>
</CLogo>
```

### Logo con imagen y tagline

```html
<CLogo src="/logo.svg" alt="" href="/">
  <div class="brand-text">
    <span class="name">Mi marca</span>
    <span class="tagline">Tu solución</span>
  </div>
</CLogo>
```

---

## Estilos en el proyecto consumidor

`CLogo` no impone ningún estilo visual. El proyecto consumidor define dimensiones, layout y variantes.

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/logo';

.c-logo {
  display: block;

  .logo {
    display: flex;
    align-items: center;
    gap: spacing(3);
    text-decoration: none;
    color: inherit;
  }

  .c-image {
    width: spacing(10);
    height: spacing(10);
    flex-shrink: 0;
  }
}
```

---

## Patrón: wrapper para variantes de layout

Si el módulo header necesita un logo horizontal (imagen + texto en fila) y el footer uno vertical, crea un wrapper con su propia API de `data-layout`:

```vue
<!-- src/components/AppLogo.vue -->
<template>
  <CLogo class="app-logo" :src="src" :href="href" :data-layout="layout">
    <slot />
  </CLogo>
</template>

<script setup>
import { CLogo } from '@bedrock/core/vue';
defineProps({ src: String, href: String, layout: String });
</script>

<style scoped>
.app-logo {
  @include attr(layout, horizontal) {
    .logo { flex-direction: row; }
  }

  @include attr(layout, vertical) {
    .logo { flex-direction: column; }
  }
}
</style>
```

```html
<!-- En el header -->
<AppLogo src="/logo.svg" href="/" layout="horizontal">
  <span>Mi marca</span>
</AppLogo>
```

> Ver [Guía 01 — Encapsulación](/guides/encapsulacion) para entender por qué el módulo no debe estilar directamente dentro de `CLogo`.

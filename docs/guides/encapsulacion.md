# Guía 01 — Encapsulación: componentes y módulos son cerrados

## Regla

> Un módulo no puede acceder por estilos a los internos de un componente.  
> Un componente no puede ser forzado desde fuera a comportarse de una manera que él mismo no contempla.

---

## Por qué

Los componentes de Bedrock son **cajas negras** con una API pública definida:

- **Props** — controlan comportamiento y estado
- **Slots** — controlan contenido inyectable
- **Atributos `data-*`** — controlan variantes visuales

Todo lo que ocurre *dentro* del componente (su estructura HTML, sus clases internas, su layout) es un detalle de implementación. Si un módulo accede a esos detalles, queda acoplado a ellos: cualquier cambio interno en el componente rompe el módulo.

---

## Anti-patrón — el módulo accede a los internos del componente

```vue
<!-- AppHeader.vue -->
<template>
  <header class="m-header">
    <CLogo src="/logo.png" href="/" />
  </header>
</template>

<style scoped>
.m-header {
  /* ❌ El módulo conoce la clase interna del componente */
  .c-logo {
    width: 120px;
    flex-direction: row; /* intenta reorganizar los internos del componente */
  }
}
</style>
```

Problemas:

- El módulo depende del nombre de clase `.c-logo`, que es un detalle de implementación.
- Si `CLogo` cambia su estructura interna, el módulo se rompe silenciosamente.
- Es imposible testear o reutilizar el componente de forma aislada porque su apariencia depende del contexto en que se usa.

---

## Patrón correcto — el módulo usa un wrapper que expone su propia API

Cuando el módulo necesita que un componente se comporte de una manera específica, **crea un componente wrapper** en el proyecto consumidor. Ese wrapper encapsula el componente de Bedrock y expone su propia API de `data-*`.

### 1. Crea el wrapper en tu proyecto

```vue
<!-- src/components/AppLogo.vue -->
<template>
  <CLogo
    class="app-logo"
    :src="src"
    :href="href"
  >
    <slot />
  </CLogo>
</template>

<script setup>
import { CLogo } from '@bedrock/core/vue';
defineProps({ src: String, href: String });
</script>

<style scoped>
.app-logo {
  /* ✅ Los estilos viven en el wrapper, no en el módulo */
  width: 120px;
}

/* ✅ El wrapper puede controlar su propio layout mediante data-attrs */
[data-layout="horizontal"] .app-logo {
  flex-direction: row;
}
</style>
```

### 2. El módulo usa el wrapper y le pasa datos mediante atributos

```vue
<!-- AppHeader.vue -->
<template>
  <header class="m-header">
    <AppLogo src="/logo.png" href="/" data-layout="horizontal">
      <span>LeMenu</span>
    </AppLogo>
  </header>
</template>

<style scoped>
.m-header {
  /* ✅ El módulo solo controla su propio layout, no los componentes que contiene */
  height: var(--spacing-20);
  background-color: var(--color-surface-dark);
}
</style>
```

---

## Resumen

| | Anti-patrón | Patrón correcto |
|---|---|---|
| ¿Quién define el aspecto del componente? | El módulo que lo usa | El wrapper que lo envuelve |
| ¿Cómo comunica el módulo sus necesidades? | Sobreescribiendo clases internas | Pasando `data-*` al wrapper |
| ¿Qué pasa si el componente cambia internamente? | El módulo se rompe | El wrapper absorbe el cambio |
| ¿El componente es reutilizable? | No, depende del contexto | Sí, es independiente |

---

## Frontera permitida

Lo único que un módulo puede hacer con un componente directamente es **posicionarlo** dentro de su layout — definir su `grid-area`, `align-self`, `justify-self`, o similares. Esto es posicionar el componente *como bloque*, no manipular sus internos.

```scss
// ✅ Permitido: el módulo posiciona el componente como bloque en su grid
@include grid-area('logo') {
  grid-area: logo;
  justify-self: start;
  align-self: center;
}
```

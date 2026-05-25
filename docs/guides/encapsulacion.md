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
    <BLogo src="/logo.png" href="/" />
  </header>
</template>

<style scoped>
.m-header {
  /* ❌ El módulo conoce la clase interna del componente */
  .b-logo {
    width: 120px;
    flex-direction: row; /* intenta reorganizar los internos del componente */
  }
}
</style>
```

Problemas:

- El módulo depende del nombre de clase `.b-logo`, que es un detalle de implementación.
- Si `BLogo` cambia su estructura interna, el módulo se rompe silenciosamente.
- Es imposible testear o reutilizar el componente de forma aislada porque su apariencia depende del contexto en que se usa.

---

## Patrón correcto — el módulo usa un wrapper que expone su propia API

Cuando el módulo necesita que un componente se comporte de una manera específica, **crea un componente wrapper** en el proyecto consumidor. Ese wrapper encapsula el componente de Bedrock y expone su propia API de `data-*`.

### 1. Crea el wrapper en tu proyecto

```vue
<!-- src/components/AppLogo.vue -->
<template>
  <BLogo
    class="app-logo"
    :src="src"
    :href="href"
  >
    <slot />
  </BLogo>
</template>

<script setup>
import { BLogo } from '@bedrock/core/vue';
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

---

## Variantes visuales — el componente gestiona su propio aspecto en cada contexto

### El caso

Un mismo componente (`CAudioPlayer`, por ejemplo) se usa en dos módulos distintos: el header del mix y un player fijo en el footer. En el footer el player necesita botones más pequeños y sin bloque de tiempo. El módulo intenta resolver esto sobreescribiendo las clases internas del componente.

### Anti-patrón — el módulo fuerza el estilado desde fuera

```scss
// ❌ MBottomPlayer.vue — el módulo conoce y sobreescribe los internos del componente
.m-bottom-player__inner {
    .c-audio-player {
        padding: spacing(4) 0;
    }
    .c-audio-player__btn {
        width: spacing(11);
        height: spacing(11);
    }
    .c-audio-player__time {
        display: none;
    }
}
```

Problemas:

- El módulo está acoplado a los nombres de clase internos del componente.
- Si el componente renombra o reestructura sus internos, el módulo se rompe en silencio.
- El comportamiento visual del componente queda repartido entre dos ficheros: imposible razonarlo de forma aislada.
- El componente no puede ser reutilizado en un tercer contexto sin añadir más overrides en otro módulo.

### Patrón correcto — el componente expone una prop `variant`

El componente define una prop `variant` que se mapea a un atributo `data-variant`. Es el propio componente quien declara, internamente, cómo se comporta en cada variante.

**1. El componente expone la prop y la vincula al atributo:**

```vue
<!-- CAudioPlayer.vue -->
<script setup>
defineProps({
    mix: { type: Object, required: true },
    variant: { type: String, default: null }
})
</script>

<template>
    <div class="c-audio-player" :data-variant="variant || undefined">
        <!-- ... -->
    </div>
</template>
```

**2. El componente se estila a sí mismo para cada variante:**

```scss
// CAudioPlayer.vue — <style>
.c-audio-player {
    @include attr(variant, footer) {
        .c-audio-player__btn {
            width: spacing(11);
            height: spacing(11);
        }
        .c-audio-player__time {
            display: none;
        }

        @include bpFrom(md) {
            .c-audio-player__btn {
                width: spacing(14);
                height: spacing(14);
            }
            .c-audio-player__time {
                display: flex;
            }
        }
    }
}
```

**3. El módulo solo declara qué variante necesita:**

```vue
<!-- MBottomPlayer.vue -->
<CAudioPlayer :mix="mix" variant="footer" />
```

```scss
// ✅ MBottomPlayer no toca ningún interno de CAudioPlayer
.m-bottom-player {
    position: fixed;
    bottom: 0;
}
```

### Resumen

| | Anti-patrón | Patrón correcto |
|---|---|---|
| ¿Quién define el aspecto del componente en cada contexto? | El módulo que lo usa | El propio componente |
| ¿Cómo comunica el módulo sus necesidades visuales? | Sobreescribiendo clases internas | Pasando `variant` como prop |
| ¿Dónde vive la lógica visual de todas las variantes? | Repartida entre módulos | Centralizada en el componente |
| ¿El componente es portable a un tercer contexto? | No, hay que añadir más overrides | Sí, basta con pasar otra variante |

### Cuándo crear una variante vs. cuándo crear un wrapper

Usa **`variant`** cuando el componente mantiene la misma funcionalidad pero cambia su presentación visual (tamaños, visibilidad de partes, densidad). Crea un **wrapper** cuando el componente necesita estructura HTML diferente, slots adicionales o lógica de comportamiento distinta.

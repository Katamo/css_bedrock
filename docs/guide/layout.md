# Sistema de Layout y Grid

Bedrock incluye un sistema de layout fluido y predecible, pensado para trabajar con componentes primitivos estructurales (como contenedores y celdas). Todo el comportamiento de este layout se controla mediante variables y mapas SASS configurables.

---

## 1. Contenedores (Wrappers)

Los wrappers se configuran con el mixin `setup-wrappers()`, que se llama en un archivo que importe `bedrock-config` — lo que hace disponibles `spacing()`, `color()` y el resto de funciones.

El patrón recomendado es un **archivo dedicado** `_wrappers.scss` dentro de tu carpeta de setup:

```scss
// setup/_wrappers.scss
@use 'bedrock-config' as *;

@include setup-wrappers((
  // 1. Wrapper por defecto (padding que crece con la pantalla)
  default: (
    xxs: ( padding-inline: spacing(4) ),
    md:  ( padding-inline: spacing(6) ),
    lg:  ( padding-inline: spacing(8) ),
  ),
  // 2. Wrapper estático (mismo padding en todos los dispositivos)
  static: (
    xxs: ( padding-inline: spacing(6) ),
  ),
  // 3. Wrapper completo (sin padding, toca los bordes)
  full: (
    xxs: ( padding: 0 ),
  ),
  // 4. Wrapper desktop-full (padding en móvil, sin padding desde lg)
  desktop-full: (
    xxs: ( padding-inline: spacing(4) ),
    md:  ( padding-inline: spacing(6) ),
    lg:  ( padding: 0 ),
  ),
));
```

```scss
// main.scss
@use 'setup/bedrock-config' as *;
@use 'setup/wrappers';

@use '@bedrock/core/wrapper'; // estilos base de CWrapper
```

---

## 2. Capas de Profundidad (Z-Index)
Para evitar la clásica "guerra de z-index" (donde un modal queda accidentalmente por debajo de un header), Bedrock centraliza el manejo del eje Z en un único mapa.

Bedrock incluye una escala genérica por defecto (dropdown, sticky, header, backdrop, modal, tooltip), pero puedes sobrescribirla o ampliarla en tu configuración:

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $z-layers: (
    dropdown: 50,
    header: 200,
    modal: 400,
    cookies: 500 // ← Añadiendo una capa específica del proyecto
  )
);
```

--- 

Consumo en los componentes
Para aplicar estas capas en tus estilos, puedes utilizar la función de utilidad `z-layer()` provista por el framework (forma recomendada), o bien acceder directamente al mapa de variables usando la función nativa `map.get` de SASS. Ambas formas son válidas y equivalentes:

```scss
@use 'bedrock-config' as bedrock;
@use 'sass:map';

.c-modal {
  // Opción 1: Usando la función de utilidad
  z-index: bedrock.z-layer(modal);
  
  // Opción 2: Accediendo directamente al mapa
  z-index: map.get(bedrock.$z-layers, modal);
}
```

---

## 4. Componentes de layout en Vue 3

Bedrock proporciona tres componentes primitivos de layout para Vue 3: `CWrapper`, `CGridLayout` y `CGridArea`. No emiten estilos visuales por sí solos — su apariencia la define el proyecto consumidor mediante SASS.

### CWrapper

Aplica el padding horizontal configurado con `setup-wrappers()`. El prop `type` selecciona qué configuración usar.

```vue
<template>
  <CWrapper type="default">
    <div class="m-hero">...</div>
  </CWrapper>

  <CWrapper type="full">
    <div class="m-banner">...</div>
  </CWrapper>
</template>

<script setup>
import { CWrapper } from '@bedrock/core/vue';
</script>
```

El `type` debe coincidir con una clave definida en `setup-wrappers()`. Ver [sección 1](#_1-contenedores-wrappers) para la configuración.

---

### CGridLayout y CGridArea

`CGridLayout` define un contenedor de CSS Grid identificado por nombre. `CGridArea` ubica su contenido en un área concreta de ese grid.

```vue
<template>
  <CGridLayout layout="header">
    <CGridArea area="logo">
      <CLogo src="/logo.svg" href="/" />
    </CGridArea>
    <CGridArea area="nav">
      <CMenu>...</CMenu>
    </CGridArea>
  </CGridLayout>
</template>

<script setup>
import { CGridLayout, CGridArea, CLogo, CMenu } from '@bedrock/core/vue';
</script>
```

El layout se define completamente en SASS mediante los mixins `grid-layout()` y `grid-area()`:

```scss
// m-header.scss
@use 'bedrock-config' as *;

.m-header {
  @include grid-layout(header) {
    grid-template-areas: "logo nav";
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: spacing(4);
  }

  @include grid-area(logo) {
    justify-self: start;
  }

  @include grid-area(nav) {
    justify-self: end;
  }
}
```

Cada módulo define su propio layout con un nombre único. Varios módulos pueden usar `CGridLayout` con layouts distintos sin interferir entre sí.

---

Para la referencia completa de props, slots y atributos generados consulta:

- [CWrapper](/components/wrapper)
- [CGridLayout + CGridArea](/components/grid-layout)
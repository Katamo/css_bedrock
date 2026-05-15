# Wrapper

El componente `CWrapper` es una primitiva de layout diseñada para proporcionar contenedores con padding horizontal responsivo y centrado automático. Es la evolución del `b-wrapper` original, adaptada para integraciones nativas como Vue 3.

---

## 1. Uso con Vue 3

### Importación

```javascript
import { CWrapper } from '@bedrock/core/vue';
```

### Marcado en Vue

```html
<template>
  <CWrapper type="default" tag="section">
    <h1>Contenido envuelto</h1>
    <p>Este contenido tendrá los márgenes laterales configurados.</p>
  </CWrapper>
</template>
```

**Propiedades:**
- `type`: El tipo de wrapper definido en tu `$wrappers` config (ej: `default`, `full`, `static`). Por defecto es `default`.
- `tag`: La etiqueta HTML a renderizar (ej: `div`, `section`, `header`). Por defecto es `div`.

---

## 2. Uso con Mixins SASS (Avanzado)

Si prefieres usar elementos HTML estándar, puedes aplicar la funcionalidad mediante el mixin `wrapper`.

### Marcado HTML

```html
<div class="my-custom-container" data-wrapper-type="default">
  ...
</div>
```

### SCSS

```scss
@use '@bedrock/core' as *;

.my-custom-container {
  // El mixin aplica automáticamente el padding responsivo según el config
  @include wrapper(default) {
    // Puedes añadir estilos extra aquí
    background-color: color(greys, grey01);
  }
}
```

---

## 3. Configuración

Los wrappers se configuran llamando al mixin `setup-wrappers()`. La clave es que el archivo donde lo llames importe `bedrock-config`, lo que hace disponibles `spacing()`, `color()`, `font()` y el resto de funciones.

### Patrón recomendado: archivo dedicado

A medida que el proyecto crece, conviene separar la configuración de wrappers en su propio archivo:

```
src/styles/
├── setup/
│   ├── _bedrock-config.scss   ← tokens
│   ├── _wrappers.scss         ← configuración de wrappers
│   └── ...
└── main.scss
```

```scss
// setup/_wrappers.scss
@use 'bedrock-config' as *;

@include setup-wrappers((
  default: (
    xxs: ( max-width: 1200px, padding-inline: spacing(4) ),
    lg:  ( max-width: 1440px, padding-inline: spacing(8) ),
  ),
  narrow: (
    xxs: ( max-width: 800px, padding-inline: spacing(4) ),
  ),
  full: (
    xxs: ( padding: 0 ),
  ),
));
```

```scss
// main.scss
@use 'setup/bedrock-config' as *;
@use 'setup/wrappers';           // ← aplica los estilos al importar

@use '@bedrock/core/wrapper';    // ← estilos base del componente
```

El archivo `_wrappers.scss` importa `bedrock-config` por su cuenta — no depende de que `main.scss` lo haya importado antes.

---

## 4. Referencia de Mixins

### `wrapper($type)`
Aplica los estilos base de contenedor (`margin-inline: auto`, `width: 100%`) y las propiedades responsivas definidas para ese `$type` en la configuración. Busca el atributo `data-wrapper-type="$type"` tanto en el elemento actual como en sus hijos.

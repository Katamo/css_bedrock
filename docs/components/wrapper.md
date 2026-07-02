# Wrapper

El componente `BWrapper` es una primitiva de layout diseñada para proporcionar contenedores con padding horizontal responsivo y centrado automático.

---

## 1. Uso con Vue 3

### Importación

```javascript
import { BWrapper } from '@bedrock/core/vue';
```

### Marcado en Vue

```html
<template>
  <BWrapper type="default" tag="section">
    <h1>Contenido envuelto</h1>
    <p>Este contenido tendrá los márgenes laterales configurados.</p>
  </BWrapper>
</template>
```

**Propiedades:**
- `type`: El tipo de wrapper definido en tu `$wrappers` config (ej: `default`, `full`, `static`). Por defecto es `default`.
- `tag`: La etiqueta HTML a renderizar (ej: `div`, `section`, `header`). Por defecto es `div`.
- `height`: Variante de altura. Valor aceptado: `auto` — sobrescribe el `height: 100%` por defecto.

---

## Variantes

### `height="auto"`

Por defecto `BWrapper` ocupa el 100% de la altura de su contenedor (`height: 100%`). Usa la variante `auto` cuando el wrapper debe ajustarse a la altura de su contenido.

```html
<BWrapper height="auto">
  <p>El wrapper se adapta al alto del contenido.</p>
</BWrapper>
```

Esto emite el atributo `data-height="auto"` en el elemento raíz y aplica `height: auto` vía el mixin `@include attr(height, auto)` en los estilos del componente.

---

## 2. Configuración

Los wrappers se configuran llamando al mixin `setup-wrappers()`. La clave es que el archivo donde lo llames importe `bedrock-config`, lo que hace disponibles `spacing()`, `color()` y el resto de funciones.

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
@use '@bedrock/core/wrapper';    // ← estilos base del componente (primero)
@use 'setup/wrappers';           // ← configuración de tipos (después, para sobreescribir la base)
```

> ⚠️ El orden importa: los estilos base (`@bedrock/core/wrapper`) deben importarse **antes** que el archivo que llama a `setup-wrappers()`, para que la configuración de cada tipo sobreescriba la base. Las variantes del componente (`data-height`) tienen mayor especificidad y ganan siempre, independientemente del orden.

El archivo `_wrappers.scss` importa `bedrock-config` por su cuenta — no depende de que `main.scss` lo haya importado antes.

---

## 3. Referencia de Mixins

### `setup-wrappers($config)`
Genera, para cada tipo definido en `$config`, un selector `.b-wrapper[data-type="$type"]` con las propiedades responsivas de ese tipo (envuelto en `:where()` para mantener la especificidad baja). El tipo `default` se aplica también a los wrappers sin `data-type`.

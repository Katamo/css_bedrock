# css_bedrock — instrucciones para Claude

**Antes de crear o modificar cualquier componente Vue o archivo SCSS en un proyecto que use `@bedrock/core`, leer este archivo completo y la documentación relevante.**

---

## Documentación disponible

### Guía del framework
- [`docs/guide/installation.md`](docs/guide/installation.md) — Instalación y setup inicial
- [`docs/guide/configuration.md`](docs/guide/configuration.md) — Archivo puente `bedrock-config.scss`, sobreescritura de tokens, colores
- [`docs/guide/consumption.md`](docs/guide/consumption.md) — Cómo importar en componentes (`@use 'bedrock-config' as *`)
- [`docs/guide/tools.md`](docs/guide/tools.md) — Referencia completa de todas las funciones y mixins disponibles
- [`docs/guide/typography.md`](docs/guide/typography.md) — Sistema de typesets: definición, breakpoints, typesets elásticos
- [`docs/guide/layout.md`](docs/guide/layout.md) — Grid y layout
- [`docs/guide/animations.md`](docs/guide/animations.md) — Sistema de animaciones

### Buenas prácticas (leer antes de escribir SCSS)
- [`docs/guides/ordenacion.md`](docs/guides/ordenacion.md) — **Orden de declaraciones dentro de un selector** ← crítico
- [`docs/guides/tipografia.md`](docs/guides/tipografia.md) — **Cómo y cuándo usar typesets** ← crítico
- [`docs/guides/encapsulacion.md`](docs/guides/encapsulacion.md) — Componentes como cajas negras, variantes, wrappers
- [`docs/guides/css-global.md`](docs/guides/css-global.md) — CSS global en sistemas de componentes (keyframes, font-face)
- [`docs/guides/propiedades-logicas.md`](docs/guides/propiedades-logicas.md) — Uso de propiedades lógicas CSS

### Componentes Vue de Bedrock
- [`docs/components/`](docs/components/) — Documentación de cada componente: button, input, field, pagination, grid-layout, wrapper, etc.

---

## Paso previo obligatorio: leer el config del proyecto

Cada proyecto tiene un archivo `src/styles/bedrock-config.scss` que define los tokens concretos disponibles: nombres de typesets, grupos de color, z-layers, spacing-base. **Leerlo siempre antes de escribir cualquier SCSS.**

---

## Patrón de configuración

El archivo puente usa `@forward` con `with (...)` para sobreescribir tokens y re-exponer las herramientas:

```scss
// src/styles/bedrock-config.scss
@forward '@bedrock/core' with (
  $spacing-base: 4px,
  $colors: (
    bg:      (base: #f5f5f5, surface: #ffffff),
    text:    (base: #1a1a1a, muted: #666666),
    primary: (base: #2563eb),
    // ... todos los grupos que usa el proyecto
  ),
  $font-typeset: (
    body:  (bps: (xxs: (font-size: 14px, line-height: 22px, ...))),
    label: (bps: (xxs: (font-size: 12px, font-weight: 600, ...))),
    // ...
  ),
  // breakpoints, z-layers, grid, animaciones...
);
```

> ⚠️ SASS reemplaza el mapa entero al sobrescribirlo — no hace merge. Incluir siempre todos los grupos de color que el proyecto use.

---

## Importación en componentes

```scss
// ✓ Correcto — siempre el archivo puente del proyecto
@use 'bedrock-config' as *;

// ❌ Nunca importar @bedrock/core directamente en componentes
@use '@bedrock/core' as *;
```

Para que `bedrock-config` resuelva sin ruta relativa, Vite necesita `loadPaths`:

```js
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
      loadPaths: ['src/styles'],
    },
  },
},
```

---

## Orden de declaraciones dentro de un selector

Ver [`docs/guides/ordenacion.md`](docs/guides/ordenacion.md). La regla:

1. `@include` primero — todos los mixins que emiten propiedades directas
2. Propiedades CSS literales
3. Selectores hijos
4. `@include bpFrom()` — breakpoint overrides, siempre al final y agrupados

```scss
// ✓ Correcto
.c-card {
  @include typeset(body);
  @include transition((background-color), fast);
  padding: spacing(5);
  background-color: color(surface, alt);

  .title {
    @include typeset(h3);
    color: color(text);
  }

  @include bpFrom(md) {
    padding: spacing(8);
  }
}

// ❌ Incorrecto
.c-card {
  padding: spacing(5);
  @include typeset(body);   // include después de propiedades
  .title {
    @include bpFrom(md) {   // bpFrom anidado dentro de selector hijo
      font-size: 20px;      // propiedad tipográfica directa
    }
  }
}
```

---

## Tipografía: solo typesets, nunca propiedades sueltas

Ver [`docs/guides/tipografia.md`](docs/guides/tipografia.md). Las siguientes propiedades **no deben aparecer directamente** en estilos de componentes:

- `font-size`, `font-weight`, `font-family`, `line-height`, `letter-spacing`, `text-transform`

Siempre `@include typeset(nombre)`. Si no existe un typeset para el caso, crearlo en `bedrock-config.scss`.

```scss
// ✓ Correcto
.c-label {
  @include typeset(label);
  color: color(text, muted);
}

// ❌ Incorrecto
.c-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: color(text, muted);
}
```

---

## Herramientas principales

Referencia completa en [`docs/guide/tools.md`](docs/guide/tools.md).

| Herramienta | Uso |
|---|---|
| `spacing($n)` | Espaciado: `padding: spacing(4)` — nunca px sueltos |
| `color($group, $variant?)` | Color: `color(text, muted)`, `color(primary)` |
| `z-layer($name)` | Z-index: `z-index: z-layer(header)` |
| `@include typeset($name)` | Tipografía completa + responsive |
| `@include bpFrom($bp)` | Media query mobile-first |
| `@include hover` | Hover solo en dispositivos capaces (no táctil) |
| `@include attr($name, $value?)` | Variante por `data-*` del propio elemento |
| `@include context($name, $value?)` | Variante por `data-*` de un ancestro |
| `@include transition($props, $speed?, $delay?, $curve?)` | Transición semántica |
| `@include visuallyHidden` | Oculto visualmente pero accesible |

---

## Preferencia de componentes Bedrock sobre elementos nativos

Siempre que exista un componente Bedrock equivalente, usarlo en lugar del elemento HTML nativo con clase `.b-*` manual:

| En lugar de | Usar |
|---|---|
| `<button class="b-button" type="button">` | `<BButton>` |
| `<input class="b-input" :value="..." @input="...">` | `<BInput :model-value="..." @update:model-value="...">` |
| `<select>` nativo | `<BSelect :model-value="..." :options="...">` |
| `<textarea>` nativo | `<BTextarea :model-value="...">` |
| `<input type="radio">` | `<BRadioGroup v-model="..."><BRadio value="...">` |
| Toggle/interruptor | `<BSwitch v-model="...">` |
| `<label> + <input>` / `<label> + <select>` | `<BField><template #label>...</template> ... </BField>` — el control del slot hereda id/aria-describedby/aria-invalid automáticamente |

Excepciones aceptadas:
- Elementos sin equivalente en Bedrock (`<table>`, `<p>`, elementos semánticos de contenido).

---

## Encapsulación de componentes

Ver [`docs/guides/encapsulacion.md`](docs/guides/encapsulacion.md).

- Los componentes Bedrock son **cajas negras**. Un módulo no accede a sus clases internas.
- Para variantes visuales: el componente expone una prop `variant` mapeada a `data-variant`; él mismo se estila con `@include attr(variant, nombre)`.
- Para reutilización con estructura diferente: crear un **wrapper** en el proyecto consumidor.
- Lo único permitido desde fuera: posicionar el componente como bloque (`grid-area`, `align-self`…).

---

## CSS global en proyectos con componentes

Ver [`docs/guides/css-global.md`](docs/guides/css-global.md).

`@keyframes`, `@font-face` y variables CSS en `:root` deben vivir en los estilos globales del proyecto, **no** en archivos que los componentes importan con `@use`. En Bedrock se exponen siempre como mixins. Incluirlos **una única vez** desde el archivo global del proyecto (`main.scss` o `App.vue`).

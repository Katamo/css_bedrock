# Tipografía con typesets

## La regla

No uses propiedades tipográficas sueltas en las hojas de estilo de componentes. Define un conjunto cerrado de estilos tipográficos en tu configuración y aplícalos siempre con `@include typeset()`.

Las propiedades que no deben aparecer directamente en los estilos de componente son:

- `font-size`
- `font-weight`
- `font-family`
- `line-height`
- `letter-spacing`
- `text-transform`

---

## Por qué

Cuando la tipografía se declara propiedad a propiedad en cada componente, el sistema tipográfico del proyecto se fragmenta: distintos componentes usan tamaños similares pero no idénticos, los pesos no son coherentes, y un cambio en la escala tipográfica obliga a buscar y actualizar cada aparición. El resultado habitual es una hoja de estilos llena de valores como `0.875rem`, `0.75rem` o `font-weight: 500` repetidos sin relación explícita entre ellos.

Un typeset es un bloque de propiedades tipográficas con nombre. Cuando estilizas un componente con `@include typeset(label)`, estás diciendo "este texto tiene el estilo del label del sistema", no "este texto mide 0.875rem y pesa 500". El nombre crea semántica; el valor concreto vive en un único lugar.

---

## Cómo definir typesets

Los typesets se definen en la configuración de Bedrock, junto al resto de tokens:

```scss
// setup/_bedrock-config.scss
@forward '@bedrock/core' with (
  $typesets: (
    body: (
      font-size: 1rem,
      line-height: 1.5,
      font-weight: 400,
    ),
    label: (
      font-size: 0.875rem,
      font-weight: 500,
      line-height: 1.2,
    ),
    caption: (
      font-size: 0.75rem,
      font-weight: 400,
      line-height: 1.4,
    ),
    heading-xl: (
      font-size: clamp(2rem, 5vw, 3.5rem),
      font-weight: 700,
      line-height: 1.1,
      letter-spacing: -0.02em,
    ),
  ),
);
```

---

## Orden de los includes

`@include typeset()` debe ser siempre la **primera declaración** dentro de un selector. El typeset establece la base tipográfica del elemento; el resto de propiedades (color, spacing, layout…) se leen más fácilmente cuando saben sobre qué base tipográfica trabajan.

```scss
// BIEN
.c-label {
  @include typeset(label);
  color: color(text, subtle);
  padding-inline: spacing(2);
}

// MAL
.c-label {
  color: color(text, subtle);
  padding-inline: spacing(2);
  @include typeset(label);
}
```

---

## Cómo aplicarlos

```scss
@use 'bedrock-config' as *;

.c-field {
  .label {
    @include typeset(label);
    color: color(text);
  }

  .hint {
    @include typeset(caption);
    color: color(text, subtle);
  }
}

.m-hero {
  .title {
    @include typeset(heading-xl);
  }

  .body {
    @include typeset(body);
  }
}
```

---

## Antipatrón

```scss
// MAL — propiedades sueltas, sin nombre ni relación con el sistema
.c-field {
  .label {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.2;
  }

  .hint {
    font-size: 0.75rem;
    line-height: 1.4;
  }
}
```

---

## Cuándo sí es aceptable usar propiedades tipográficas directas

- **Overrides puntuales sobre un typeset**: si necesitas ajustar solo `line-height` en un contexto concreto después de aplicar un typeset, una propiedad suelta es aceptable.
- **Estilos de reset o normalize**: en el archivo de reset global, fuera del sistema de componentes.

Fuera de estos casos, cualquier aparición de `font-size`, `font-weight` o similares en un componente es una señal de que falta un typeset en la configuración.

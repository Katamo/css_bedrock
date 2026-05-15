# Button

`CButton` es un componente de botón/enlace sin estilos visuales propios. Proporciona la estructura, el comportamiento y los atributos de datos necesarios para que el proyecto consumidor construya encima cualquier variante de botón mediante SASS.

Renderiza como `<button>` por defecto, o como `<a>` cuando se le pasa `href`.

---

## Importación

### JavaScript (Vue 3)

```js
import { CButton } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .c-button
@use '@bedrock/core/button';
```

---

## Props

| Prop       | Tipo      | Default    | Descripción |
|------------|-----------|------------|-------------|
| `color`    | `String`  | `null`     | Aplica `data-color` al elemento. Úsalo para variantes de color. |
| `width`    | `String`  | `null`     | Aplica `data-width` al elemento. |
| `height`   | `String`  | `null`     | Aplica `data-height` al elemento. |
| `disabled` | `Boolean` | `false`    | Aplica `data-disabled`. Desactiva pointer-events. |
| `href`     | `String`  | `null`     | Si se pasa, el elemento raíz es `<a>` en lugar de `<button>`. |
| `type`     | `String`  | `'button'` | Atributo `type` del `<button>`. Ignorado si se usa `href`. |
| `id`       | `String`  | `null`     | Atributo `id` del elemento raíz. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Contenido principal (texto del botón). |
| `icon`    | Icono delantero (antes del texto). |
| `arrow`   | Icono trasero (después del texto, típicamente una flecha). |

```html
<CButton color="primary">
  <template #icon><img src="./icon.svg" /></template>
  Comprar
  <template #arrow><img src="./arrow.svg" /></template>
</CButton>
```

---

## Estilos en el proyecto consumidor

`CButton` no impone ningún estilo visual. El proyecto consumidor define el aspecto completo en su propio SCSS usando la clase `.c-button` y los atributos de datos como puntos de variación.

```scss
// src/components/cta/_button.scss
@use 'bedrock-config' as *;

.c-button {
  // Estilos base
  padding: spacing(2) spacing(5);
  border-radius: spacing(1);
  border: 2px solid;

  // Variante por color (data-color="primary")
  @include attr(color, primary) {
    @include buttonColor(color(primary), color(primary), color(white));

    @include hover {
      @include buttonColor(color(primary, dark), color(primary, dark), color(white));
    }
  }

  // Variante por color (data-color="ghost")
  @include attr(color, ghost) {
    @include buttonColor(currentColor, transparent, currentColor);
  }

  // Variante por tamaño (data-height="large")
  @include attr(height, large) {
    padding: spacing(3) spacing(6);
  }
}
```

### Mixin `buttonColor`

Bedrock incluye un mixin de utilidad para aplicar los tres valores de color de un botón a la vez (borde, fondo y texto), incluyendo el tintado automático del SVG en el slot `arrow`:

```scss
@include buttonColor($border-color, $background-color, $text-color);
```

---

## Extensión con props propias

Si necesitas añadir props tipadas que no existen en `CButton`, crea un componente envoltorio en tu proyecto:

```js
// src/components/cta/AppButton.js
import { h } from 'vue';
import { CButton } from '@bedrock/core/vue';

export default {
  name: 'AppButton',
  inheritAttrs: false,
  props: {
    ...CButton.props,
    sabor: { type: String, default: null },
  },
  setup(props, { slots, attrs }) {
    return () => h(CButton, {
      color:    props.color,
      type:     props.type,
      disabled: props.disabled,
      href:     props.href,
      width:    props.width,
      height:   props.height,
      id:       props.id,
      ...attrs,
      ...(props.sabor && { 'data-sabor': props.sabor }),
    }, slots);
  },
};
```

Para atributos puntuales sin necesidad de tipado, puedes pasarlos directamente — `CButton` los reenvía al elemento DOM:

```html
<CButton data-sabor="dulce">Click</CButton>
```

# Badge

`BBadge` es una etiqueta de categoría o estado sin estilos visuales propios. Proporciona la estructura y los atributos de datos necesarios para que el proyecto consumidor defina el aspecto mediante SASS.

Opcionalmente acepta `href` o `@click` para convertirse en accionable, delegando en `BClickableArea`.

---

## Importación

### JavaScript (Vue 3)

```js
import { BBadge } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .b-badge
@use '@bedrock/core/badge';
```

---

## Props

| Prop       | Tipo      | Default | Descripción |
|------------|-----------|---------|-------------|
| `href`     | `String`  | `null`  | Si se pasa, el área interior renderiza como `<a>`. |
| `disabled` | `Boolean` | `false` | Aplica `data-disabled`. Desactiva `pointer-events`. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Texto o contenido principal del badge. |
| `icon`    | Icono opcional mostrado antes del contenido. Cuando está presente, aplica `data-has-icon` al elemento raíz. |

---

## Atributos de datos generados

| Atributo        | Cuándo aparece |
|-----------------|----------------|
| `data-disabled` | Cuando `disabled` es `true`. |
| `data-has-icon` | Cuando el slot `icon` está presente. |

---

## Ejemplos de uso

### Badge básico

```html
<BBadge>Oferta</BBadge>
```

### Como enlace

```html
<BBadge href="/categoria/ofertas">Ofertas</BBadge>
```

### Con icono

```html
<BBadge>
  <template #icon><img src="./star.svg" alt="" /></template>
  Destacado
</BBadge>
```

### Con acción

```html
<BBadge @click="removeFilter">Filtro activo ✕</BBadge>
```

### Deshabilitado

```html
<BBadge :disabled="true">No disponible</BBadge>
```

---

## Estilos en el proyecto consumidor

`BBadge` no impone ningún estilo visual. El proyecto consumidor define padding, color, tipografía y variantes en su propio SASS.

```scss
// src/components/info/_badge.scss
@use 'bedrock-config' as *;
@use '@bedrock/core/badge';

.b-badge {
  @include typeset(badge);
  padding-block: spacing(1);
  padding-inline: spacing(3);
  border-radius: spacing(1);
  border: 1px solid transparent;

  // Variante de color (data-color="primary")
  @include attr(color, primary) {
    background-color: color(primary);
    color: color(white);
  }

  // Variante de color (data-color="secondary")
  @include attr(color, secondary) {
    background-color: transparent;
    border-color: color(primary);
    color: color(primary);
  }

  // Variante de color (data-color="neutral")
  @include attr(color, neutral) {
    background-color: color(background, grey);
    color: color(text);
  }

  // Espaciado del icono cuando está presente
  @include attr(has-icon) {
    .icon {
      margin-inline-end: spacing(1.5);
    }
  }
}
```

---

## Patrón: badge con variante de color via prop personalizada

Si no necesitas tipado, puedes pasar el atributo `data-color` directamente a `BBadge` sin crear ningún envoltorio:

```html
<BBadge data-color="primary">Nuevo</BBadge>
<BBadge data-color="secondary">En revisión</BBadge>
```

Si tu proyecto usa badges con variantes tipadas y quieres una prop con validación, crea un envoltorio:

```js
// src/components/info/AppBadge.js
import { h } from 'vue';
import { BBadge } from '@bedrock/core/vue';

export default {
  name: 'AppBadge',
  inheritAttrs: false,
  props: {
    ...BBadge.props,
    color: { type: String, default: null },
  },
  setup(props, { slots, attrs }) {
    return () => h(BBadge, {
      href: props.href,
      disabled: props.disabled,
      ...attrs,
      ...(props.color && { 'data-color': props.color }),
    }, slots);
  },
};
```

```html
<AppBadge color="primary">Nuevo</AppBadge>
<AppBadge color="secondary">En revisión</AppBadge>
```

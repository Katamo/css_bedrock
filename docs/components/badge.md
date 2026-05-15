# Badge

`CBadge` es una etiqueta de categoría o estado sin estilos visuales propios. Proporciona la estructura y los atributos de datos necesarios para que el proyecto consumidor defina el aspecto mediante SASS.

Opcionalmente acepta `href` o `@click` para convertirse en accionable, delegando en `CClickableArea`.

---

## Importación

### JavaScript (Vue 3)

```js
import { CBadge } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .c-badge
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
<CBadge>Oferta</CBadge>
```

### Como enlace

```html
<CBadge href="/categoria/ofertas">Ofertas</CBadge>
```

### Con icono

```html
<CBadge>
  <template #icon><img src="./star.svg" alt="" /></template>
  Destacado
</CBadge>
```

### Con acción

```html
<CBadge @click="removeFilter">Filtro activo ✕</CBadge>
```

### Deshabilitado

```html
<CBadge :disabled="true">No disponible</CBadge>
```

---

## Estilos en el proyecto consumidor

`CBadge` no impone ningún estilo visual. El proyecto consumidor define padding, color, tipografía y variantes en su propio SASS.

```scss
// src/components/info/_badge.scss
@use 'bedrock-config' as *;
@use '@bedrock/core/badge';

.c-badge {
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

Si no necesitas tipado, puedes pasar el atributo `data-color` directamente a `CBadge` sin crear ningún envoltorio:

```html
<CBadge data-color="primary">Nuevo</CBadge>
<CBadge data-color="secondary">En revisión</CBadge>
```

Si tu proyecto usa badges con variantes tipadas y quieres una prop con validación, crea un envoltorio:

```js
// src/components/info/AppBadge.js
import { h } from 'vue';
import { CBadge } from '@bedrock/core/vue';

export default {
  name: 'AppBadge',
  inheritAttrs: false,
  props: {
    ...CBadge.props,
    color: { type: String, default: null },
  },
  setup(props, { slots, attrs }) {
    return () => h(CBadge, {
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

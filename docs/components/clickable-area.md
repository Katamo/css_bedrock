# Clickable Area

`CClickableArea` convierte cualquier elemento en accionable. Proporciona la estructura semántica y la accesibilidad de teclado necesarias para que el proyecto consumidor construya encima cualquier zona clicable mediante SASS.

Renderiza como `<div>` por defecto, o como `<a>` cuando se le pasa `href`.

---

## Importación

### JavaScript (Vue 3)

```js
import { CClickableArea } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .c-clickable-area
@use '@bedrock/core/clickable-area';
```

---

## Props

| Prop       | Tipo      | Default    | Descripción |
|------------|-----------|------------|-------------|
| `href`     | `String`  | `null`     | Si se pasa, el elemento raíz es `<a>` en lugar de `<div>`. |
| `disabled` | `Boolean` | `false`    | Aplica `data-disabled`. Desactiva `pointer-events` y el cursor. |
| `role`     | `String`  | `'button'` | Atributo `role` del elemento raíz. Solo aplica cuando no hay `href`. |
| `id`       | `String`  | `null`     | Atributo `id` del elemento raíz. |

---

## Comportamiento automático

Cuando el componente renderiza como `<div>` (sin `href`):

- Añade `role="button"` (configurable via prop `role`)
- Añade `tabIndex="0"` para que sea alcanzable con teclado
- Añade un listener de `keydown` que activa el click al pulsar **Enter**

Esto garantiza que el elemento sea completamente accesible sin configuración adicional.

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Contenido del área clicable. |

---

## Ejemplos de uso

### Área clicable básica

```html
<CClickableArea @click="handleClick">
  <img src="./imagen.jpg" alt="Descripción" />
</CClickableArea>
```

### Como enlace

```html
<CClickableArea href="/detalle/123">
  <div class="c-card">...</div>
</CClickableArea>
```

### Deshabilitada

```html
<CClickableArea :disabled="true" @click="handleClick">
  Contenido no clicable
</CClickableArea>
```

---

## Estilos en el proyecto consumidor

`CClickableArea` solo emite `cursor: pointer` y el comportamiento de estado deshabilitado. El proyecto consumidor añade cualquier estilo visual adicional en su propio SCSS.

```scss
// src/components/cta/_clickable-area.scss
@use 'bedrock-config' as *;

.c-clickable-area {
  display: block;
  position: relative;

  // Ocultar outline visible por defecto, pero respetar foco
  // para usuarios que navegan con teclado
  &:focus-visible {
    outline: 2px solid color(primary);
    outline-offset: 2px;
  }
}
```

---

## Patrón: tarjeta clicable completa

Un caso habitual es envolver una tarjeta entera para hacerla clicable sin perder la semántica interna:

```html
<CClickableArea href="/evento/123" class="c-card-cover">
  <img src="./portada.jpg" alt="Nombre del evento" />
  <div class="c-card-cover__content">
    <h3 class="c-card-cover__title">Nombre del evento</h3>
    <span class="c-tag">Conferencia</span>
  </div>
</CClickableArea>
```

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/clickable-area';

.c-card-cover {
  display: block;
  overflow: hidden;

  img {
    @include transition((transform));
    width: 100%;
  }

  @include hover {
    img { transform: scale(1.03); }
  }
}
```

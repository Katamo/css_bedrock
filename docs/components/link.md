# Link

`CLink` es un componente de enlace de texto sin estilos visuales propios. Proporciona la estructura semántica necesaria — el elemento raíz `.c-link` y el elemento interno `.text` — para que el proyecto consumidor construya encima cualquier variante de enlace mediante SASS.

Internamente usa `CClickableArea`, por lo que hereda su comportamiento de accesibilidad de teclado (Enter activa el click en elementos no-link).

---

## Importación

### JavaScript (Vue 3)

```js
import { CLink } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .c-link
@use '@bedrock/core/link';
```

---

## Props

| Prop        | Tipo      | Default | Descripción |
|-------------|-----------|---------|-------------|
| `href`      | `String`  | `null`  | Si se pasa, el enlace renderiza como `<a>`. Si no, como `<div role="button">`. |
| `disabled`  | `Boolean` | `false` | Aplica `data-disabled`. Desactiva `pointer-events`. |
| `color`     | `String`  | `null`  | Aplica `data-color` al elemento raíz. Para variantes de color definidas en el proyecto. |
| `underline` | `String`  | `null`  | Aplica `data-underline`. El valor `"none"` elimina el subrayado. |
| `id`        | `String`  | `null`  | Atributo `id` del elemento interactivo interno. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Texto o contenido del enlace. Se envuelve automáticamente en `<span class="text">`. |

---

## Estructura renderizada

```html
<div class="c-link">
  <!-- CClickableArea: gestiona href, role, tabIndex y teclado -->
  <a class="c-clickable-area" href="/ruta">
    <span class="text">Texto del enlace</span>
  </a>
</div>
```

El elemento `.text` existe para que el proyecto consumidor pueda aplicar estilos de tipografía, color y transiciones de forma independiente al área clicable.

---

## Ejemplos de uso

### Enlace estándar

```html
<CLink href="/articulo/123">Leer artículo</CLink>
```

### Sin subrayado

```html
<CLink href="/pagina" underline="none">Ir a la página</CLink>
```

### Con handler de click (sin href)

```html
<CLink @click="handleClick">Acción</CLink>
```

### Deshabilitado

```html
<CLink href="/ruta" :disabled="true">No disponible</CLink>
```

---

## Estilos en el proyecto consumidor

`CLink` emite únicamente estructura y el comportamiento de `text-decoration`. El proyecto consumidor define color, tipografía y estados en su propio SCSS.

```scss
// src/components/cta/_link.scss
@use 'bedrock-config' as *;
@use '@bedrock/core/link';

.c-link {
  .text {
    @include typeset(body);
    color: color(text);
    @include transition((color, text-decoration-color));
  }

  @include hover {
    .text {
      color: color(primary);
    }
  }

  // Variante de color via prop color="subtle"
  @include attr(color, subtle) {
    .text { color: color(text, grey); }
  }

  // Estado deshabilitado
  @include attr(disabled) {
    .text { color: color(text, grey); }
  }

  // Contexto: sobre fondo oscuro
  @include context(background, dark) {
    .text { color: color(white); }
  }
}
```

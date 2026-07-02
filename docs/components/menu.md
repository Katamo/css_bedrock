# Menu

`BMenu` es un componente de navegación sin estilos visuales propios. Proporciona la estructura semántica `div.b-menu > nav > ul.links` y deja al proyecto consumidor el control total sobre el contenido de cada ítem.

---

## Importación

### JavaScript (Vue 3)

```js
import { BMenu } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .b-menu
@use '@bedrock/core/menu';
```

---

## Props

| Prop  | Tipo     | Default | Descripción |
|-------|----------|---------|-------------|
| `tag` | `String` | `'div'` | Etiqueta HTML del elemento raíz. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Elementos `<li>` del menú. El consumidor decide el contenido de cada ítem. |

---

## Ítem activo

Si un ítem del slot lleva `aria-current` o `data-active`, su `<li>` recibe `data-active` — estilable desde el consumidor con `@include attr(active)`:

```html
<BMenu>
  <a href="/posts" aria-current="page">Posts</a>
  <a href="/about">About</a>
</BMenu>
```

> Nota: `RouterLink`/`NuxtLink` aplican `aria-current` en runtime sobre el `<a>` renderizado, no en el vnode — con ellos usa `data-active` explícito (`:data-active="isActive || null"`) o estila directamente `a[aria-current]` en tu CSS.

---

## Estructura renderizada

```html
<div class="b-menu">
  <nav>
    <ul class="links">
      <!-- slot: <li> elementos del consumidor -->
    </ul>
  </nav>
</div>
```

---

## Ejemplos de uso

### Menú básico

```html
<BMenu>
  <li><a href="/inicio"><span class="text">Inicio</span></a></li>
  <li><a href="/sobre"><span class="text">Sobre nosotros</span></a></li>
  <li><a href="/contacto"><span class="text">Contacto</span></a></li>
</BMenu>
```

### Con ítem activo

Marca el ítem activo con `data-active` en el `<li>`. El proyecto consumidor lo estiliza con `@include attr(active)`.

```html
<BMenu>
  <li data-active><a href="/inicio"><span class="text">Inicio</span></a></li>
  <li><a href="/sobre"><span class="text">Sobre nosotros</span></a></li>
</BMenu>
```

### Usando BLink como ítem

```html
<BMenu>
  <li data-active><BLink href="/inicio">Inicio</BLink></li>
  <li><BLink href="/sobre">Sobre nosotros</BLink></li>
</BMenu>
```

### Como elemento `<nav>` directo

```html
<BMenu tag="nav">
  <li><a href="/inicio"><span class="text">Inicio</span></a></li>
</BMenu>
```

---

## Estilos en el proyecto consumidor

`BMenu` emite únicamente la estructura flex de la lista y el `display: flex` en los enlaces. El proyecto consumidor define tipografía, colores, espaciado y estados.

```scss
// src/components/nav/_menu.scss
@use 'bedrock-config' as *;
@use '@bedrock/core/menu';

.b-menu {
  .links {
    gap: spacing(7);

    @include bpFrom(xl) {
      flex-direction: row;
    }
  }

  .links > li > a {
    .text {
      @include typeset(nav);
      color: color(text);
      @include transition((color));
    }

    @include hover {
      .text { color: color(primary); }
    }
  }

  // Ítem activo (data-active en el <li>)
  .links > li {
    @include attr(active) {
      > a .text { color: color(primary); }
    }
  }

  // Adapatación a fondo oscuro
  @include context(background, dark) {
    .links > li > a .text { color: color(white); }
  }
}
```

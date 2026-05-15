# Menu

`CMenu` es un componente de navegación sin estilos visuales propios. Proporciona la estructura semántica `div.c-menu > nav > ul.links` y deja al proyecto consumidor el control total sobre el contenido de cada ítem.

---

## Importación

### JavaScript (Vue 3)

```js
import { CMenu } from '@bedrock/core/vue';
```

### SCSS

```scss
// Emite los estilos base de .c-menu
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

## Estructura renderizada

```html
<div class="c-menu">
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
<CMenu>
  <li><a href="/inicio"><span class="text">Inicio</span></a></li>
  <li><a href="/sobre"><span class="text">Sobre nosotros</span></a></li>
  <li><a href="/contacto"><span class="text">Contacto</span></a></li>
</CMenu>
```

### Con ítem activo

Marca el ítem activo con `data-active` en el `<li>`. El proyecto consumidor lo estiliza con `@include attr(active)`.

```html
<CMenu>
  <li data-active><a href="/inicio"><span class="text">Inicio</span></a></li>
  <li><a href="/sobre"><span class="text">Sobre nosotros</span></a></li>
</CMenu>
```

### Usando CLink como ítem

```html
<CMenu>
  <li data-active><CLink href="/inicio">Inicio</CLink></li>
  <li><CLink href="/sobre">Sobre nosotros</CLink></li>
</CMenu>
```

### Como elemento `<nav>` directo

```html
<CMenu tag="nav">
  <li><a href="/inicio"><span class="text">Inicio</span></a></li>
</CMenu>
```

---

## Estilos en el proyecto consumidor

`CMenu` emite únicamente la estructura flex de la lista y el `display: flex` en los enlaces. El proyecto consumidor define tipografía, colores, espaciado y estados.

```scss
// src/components/nav/_menu.scss
@use 'bedrock-config' as *;
@use '@bedrock/core/menu';

.c-menu {
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

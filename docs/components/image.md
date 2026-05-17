# Image

`BImage` es un wrapper semántico sobre `<img>` que renderiza un `<figure>`. Gestiona el `object-fit`, la carga diferida, y permite inyectar un pie de foto mediante el slot `caption`. No impone ningún estilo visual.

---

## Importación

```js
import { BImage } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/image';
```

---

## Props

| Prop        | Tipo              | Default    | Descripción |
|-------------|-------------------|------------|-------------|
| `src`       | `String`          | —          | **Requerido.** URL de la imagen. |
| `alt`       | `String`          | `''`       | Texto alternativo. Vacío solo para imágenes puramente decorativas. |
| `fit`       | `String`          | `null`     | Valor de `object-fit`: `cover`, `contain`, `fill`, `none`. Aplica `data-fit`. |
| `loading`   | `String`          | `'lazy'`   | Estrategia de carga: `lazy` o `eager`. Usar `eager` para imágenes above-the-fold. |
| `width`     | `String\|Number`  | `null`     | Ancho intrínseco de la imagen. Ayuda al navegador a reservar espacio. |
| `height`    | `String\|Number`  | `null`     | Alto intrínseco de la imagen. |
| `srcset`    | `String`          | `null`     | Conjunto de fuentes responsivas. |
| `sizes`     | `String`          | `null`     | Descriptor de tamaños para `srcset`. |
| `draggable` | `Boolean`         | `false`    | Por defecto el usuario no puede arrastrar la imagen. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `caption` | Pie de foto. Su presencia renderiza un `<figcaption class="caption">` y aplica `data-has-caption` al `<figure>`. |

---

## Atributos de datos generados

| Atributo           | Cuándo aparece |
|--------------------|----------------|
| `data-fit`         | Cuando se pasa la prop `fit`. El valor es el nombre del modo: `cover`, `contain`, etc. |
| `data-has-caption` | Cuando el slot `caption` está presente. |

---

## Estructura HTML generada

```html
<!-- Sin caption -->
<figure class="b-image" data-fit="cover">
  <img src="..." alt="..." loading="lazy" draggable="false" />
</figure>

<!-- Con caption -->
<figure class="b-image" data-has-caption>
  <img src="..." alt="..." loading="lazy" draggable="false" />
  <figcaption class="caption">Descripción de la imagen</figcaption>
</figure>
```

---

## Ejemplos de uso

### Básico

```html
<BImage src="/foto.jpg" alt="Descripción de la foto" />
```

### Con object-fit cover (para thumbnails)

```html
<BImage src="/portada.jpg" alt="Portada" fit="cover" :width="800" :height="600" />
```

### Carga eager (above the fold)

```html
<BImage src="/hero.jpg" alt="Hero" fit="cover" loading="eager" />
```

### Con pie de foto

```html
<BImage src="/foto.jpg" alt="Paisaje">
  <template #caption>Vista desde la cima del Tibidabo, Barcelona.</template>
</BImage>
```

### Responsiva con srcset

```html
<BImage
  src="/imagen-800.jpg"
  alt="Imagen responsiva"
  srcset="/imagen-400.jpg 400w, /imagen-800.jpg 800w, /imagen-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
/>
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/image';

.b-image {
  display: block;
  overflow: hidden;
  margin: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  @include attr(fit, cover)    { img { object-fit: cover; } }
  @include attr(fit, contain)  { img { object-fit: contain; } }
  @include attr(fit, fill)     { img { object-fit: fill; } }
  @include attr(fit, none)     { img { object-fit: none; } }

  .caption {
    padding: spacing(2);
    font-size: 0.75rem;
    color: color(text, subtle);
  }
}
```

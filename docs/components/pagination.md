# Pagination

`CPagination` es un control de navegación por páginas compatible con `v-model`. Renderiza un `<nav>` con botones anterior/siguiente y una lista de páginas. No impone ningún estilo visual — el proyecto consumidor define el aspecto completo.

---

## Importación

```js
import { CPagination } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/pagination';
```

---

## Props

| Prop          | Tipo      | Default | Descripción |
|---------------|-----------|---------|-------------|
| `currentPage` | `Number`  | —       | **Requerido.** Página activa. Vinculada con `v-model`. |
| `totalPages`  | `Number`  | —       | **Requerido.** Número total de páginas. |
| `disabled`    | `Boolean` | `false` | Desactiva toda la paginación. |

---

## Emits

| Evento               | Payload  | Descripción |
|----------------------|----------|-------------|
| `update:currentPage` | `Number` | Emitido al cambiar de página. Permite usar `v-model`. |

---

## Slots

| Slot   | Scope                        | Descripción |
|--------|------------------------------|-------------|
| `page` | `{ page, current }` | Contenido de cada botón de página. Por defecto muestra el número. |
| `prev` | —                            | Contenido del botón anterior. Por defecto muestra `‹`. |
| `next` | —                            | Contenido del botón siguiente. Por defecto muestra `›`. |

---

## Atributos de datos generados

| Elemento       | Atributo         | Cuándo aparece |
|----------------|------------------|----------------|
| `nav` (raíz)   | `data-disabled`  | Cuando `disabled` es `true`. |
| `div.prev`     | `data-disabled`  | Cuando se está en la primera página o `disabled`. |
| `div.next`     | `data-disabled`  | Cuando se está en la última página o `disabled`. |
| `button.page`  | `data-current`   | En el botón de la página activa. |

---

## Estructura HTML generada

```html
<nav class="c-pagination" aria-label="Pagination">
  <div class="prev" role="button" tabindex="0" aria-label="Previous page">‹</div>
  <ul class="pages">
    <li><button class="page" type="button">1</button></li>
    <li><button class="page" type="button" data-current aria-current="page">2</button></li>
    <li><button class="page" type="button">3</button></li>
  </ul>
  <div class="next" role="button" tabindex="0" aria-label="Next page">›</div>
</nav>
```

---

## Ejemplos de uso

### Básico con v-model

```html
<CPagination v-model:currentPage="page" :total-pages="10" />
```

### Slots personalizados para prev/next

```html
<CPagination v-model:currentPage="page" :total-pages="10">
  <template #prev>Anterior</template>
  <template #next>Siguiente</template>
</CPagination>
```

### Slot de página con formato personalizado

```html
<CPagination v-model:currentPage="page" :total-pages="10">
  <template #page="{ page, current }">
    <span :aria-label="`Página ${page}`">{{ page }}</span>
  </template>
</CPagination>
```

### Deshabilitada

```html
<CPagination v-model:currentPage="page" :total-pages="10" :disabled="true" />
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/pagination';

.c-pagination {
  display: flex;
  align-items: center;
  gap: spacing(1);

  .prev,
  .next {
    width: spacing(8);
    height: spacing(8);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: spacing(1);

    @include attr(disabled) {
      opacity: 0.4;
      pointer-events: none;
      cursor: default;
    }
  }

  .pages {
    display: flex;
    list-style: none;
    gap: spacing(1);
    margin: 0;
    padding: 0;
  }

  .page {
    width: spacing(8);
    height: spacing(8);
    border: 1px solid color(border);
    border-radius: spacing(1);
    background: none;
    cursor: pointer;
    font-size: 0.875rem;

    &[data-current] {
      background-color: color(primary);
      color: color(white);
      border-color: color(primary);
      pointer-events: none;
    }
  }

  @include attr(disabled) {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

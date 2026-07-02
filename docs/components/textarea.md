# Textarea

`BTextarea` es un `<textarea>` nativo compatible con `v-model`. Renderiza un único elemento `textarea.b-textarea`. Se usa típicamente dentro de `BField`.

---

## Importación

```js
import { BTextarea } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/textarea';
```

---

## Props

| Prop         | Tipo             | Default | Descripción |
|--------------|------------------|---------|-------------|
| `modelValue` | `String`         | `''`    | Valor del textarea. Vinculado con `v-model`. |
| `rows`       | `String\|Number` | `3`     | Número de filas visibles. |
| `resize`     | `String`         | `null`  | Variante de redimensionado: `none`, `horizontal`, `both`. Por defecto solo vertical. |
| `disabled`   | `Boolean`        | `false` | Deshabilita el textarea nativamente. |

Cualquier atributo adicional (`id`, `name`, `placeholder`, `maxlength`…) se reenvía directamente al elemento `<textarea>`.

---

## Atributos data-*

| Atributo      | Origen        | Descripción |
|---------------|---------------|-------------|
| `data-resize` | prop `resize` | Controla la propiedad CSS `resize`. |

---

## Emits

| Evento              | Payload  | Descripción |
|---------------------|----------|-------------|
| `update:modelValue` | `String` | Emitido en cada evento `input`. Permite usar `v-model`. |

---

## Ejemplos de uso

### Básico

```html
<BTextarea v-model="mensaje" placeholder="Escribe tu mensaje…" />
```

### Sin redimensionado

```html
<BTextarea v-model="bio" :rows="5" resize="none" />
```

### Dentro de BField

```html
<BField>
  <template #label>Mensaje</template>
  <BTextarea v-model="mensaje" :rows="6" />
  <template #error v-if="errores.mensaje">{{ errores.mensaje }}</template>
</BField>
```

Dentro de `BField`, el textarea hereda automáticamente `id`, `aria-describedby`, `aria-invalid`, `required` y `disabled` del campo.

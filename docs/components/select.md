# Select

`BSelect` es un `<select>` nativo compatible con `v-model`. Renderiza un único elemento `select.b-select` con un chevron embebido. Se usa típicamente dentro de `BField`.

---

## Importación

```js
import { BSelect } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/select';
```

---

## Props

| Prop         | Tipo             | Default | Descripción |
|--------------|------------------|---------|-------------|
| `modelValue` | `String\|Number` | `''`    | Valor seleccionado. Vinculado con `v-model`. |
| `options`    | `Array`          | `null`  | Opciones: primitivos (`['a', 'b']`) u objetos `{ value, label, disabled? }`. Si es `null`, las opciones van en el slot default. |
| `disabled`   | `Boolean`        | `false` | Deshabilita el select nativamente. |

Cualquier atributo adicional (`id`, `name`, `autocomplete`…) se reenvía directamente al elemento `<select>`.

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Elementos `<option>` nativos, alternativa a la prop `options`. |

---

## Emits

| Evento              | Payload  | Descripción |
|---------------------|----------|-------------|
| `update:modelValue` | `String` | Emitido en cada evento `change`. Permite usar `v-model`. |

---

## Ejemplos de uso

### Con prop options

```html
<BSelect v-model="pais" :options="['España', 'Francia', 'Portugal']" />
```

### Con objetos value/label

```html
<BSelect
  v-model="orden"
  :options="[
    { value: 'date-desc', label: 'Más recientes' },
    { value: 'date-asc',  label: 'Más antiguos' },
  ]"
/>
```

### Con slot

```html
<BSelect v-model="categoria">
  <option value="">Todas</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</BSelect>
```

### Dentro de BField

```html
<BField>
  <template #label>Categoría</template>
  <BSelect v-model="categoria" :options="categorias" />
  <template #hint>Filtra los resultados por categoría.</template>
</BField>
```

Dentro de `BField`, el select hereda automáticamente `id`, `aria-describedby`, `aria-invalid`, `required` y `disabled` del campo.

# Input

`BInput` es un `<input>` nativo compatible con `v-model`. Renderiza un único elemento `input.b-input` sin estructura adicional. Se usa típicamente dentro de `BField`.

---

## Importación

```js
import { BInput } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/input';
```

---

## Props

| Prop         | Tipo              | Default  | Descripción |
|--------------|-------------------|----------|-------------|
| `modelValue` | `String\|Number`  | `''`     | Valor del input. Vinculado con `v-model`. |
| `type`       | `String`          | `'text'` | Tipo HTML del input: `text`, `email`, `password`, `number`, `tel`, etc. |
| `disabled`   | `Boolean`         | `false`  | Deshabilita el input nativamente. |

Cualquier atributo adicional (`id`, `name`, `placeholder`, `autocomplete`, `maxlength`…) se reenvía directamente al elemento `<input>`.

---

## Emits

| Evento               | Payload  | Descripción |
|----------------------|----------|-------------|
| `update:modelValue`  | `String` | Emitido en cada evento `input`. Permite usar `v-model`. |

---

## Ejemplos de uso

### Básico con v-model

```html
<BInput v-model="nombre" placeholder="Tu nombre" />
```

### Tipo email

```html
<BInput v-model="email" type="email" autocomplete="email" />
```

### Tipo password

```html
<BInput v-model="password" type="password" autocomplete="current-password" />
```

### Deshabilitado

```html
<BInput v-model="valor" :disabled="true" />
```

### Dentro de BField

```html
<BField field-id="email">
  <template #label>Email</template>
  <BInput id="email" v-model="email" type="email" />
  <template #hint>Te enviaremos el acceso aquí.</template>
</BField>
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/input';

.b-input {
  @include typeset(input);
  width: 100%;
  height: spacing(10);
  padding-block: 0;
  padding-inline: spacing(3);
  border: 1px solid color(border);
  border-radius: spacing(1);
  color: color(text);
  background-color: color(surface);
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: color(primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

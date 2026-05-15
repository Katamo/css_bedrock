# Input

`CInput` es un `<input>` nativo compatible con `v-model`. Renderiza un único elemento `input.c-input` sin estructura adicional. Se usa típicamente dentro de `CField`.

---

## Importación

```js
import { CInput } from '@bedrock/core/vue';
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
<CInput v-model="nombre" placeholder="Tu nombre" />
```

### Tipo email

```html
<CInput v-model="email" type="email" autocomplete="email" />
```

### Tipo password

```html
<CInput v-model="password" type="password" autocomplete="current-password" />
```

### Deshabilitado

```html
<CInput v-model="valor" :disabled="true" />
```

### Dentro de CField

```html
<CField field-id="email">
  <template #label>Email</template>
  <CInput id="email" v-model="email" type="email" />
  <template #hint>Te enviaremos el acceso aquí.</template>
</CField>
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/input';

.c-input {
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

# Radio

`BRadio` es un radio button con su label, y `BRadioGroup` los agrupa compartiendo `name` y `v-model`. El grupo renderiza `div[role="radiogroup"].b-radio-group`; cada radio renderiza `label.b-radio > input[type="radio"] + span.label`.

---

## Importación

```js
import { BRadio, BRadioGroup } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/radio';
```

---

## BRadioGroup — Props

| Prop         | Tipo                      | Default | Descripción |
|--------------|---------------------------|---------|-------------|
| `modelValue` | `String\|Number\|Boolean` | —       | Valor seleccionado del grupo. Vinculado con `v-model`. |
| `name`       | `String`                  | auto    | Atributo `name` compartido. Si no se indica, se genera uno único. |
| `disabled`   | `Boolean`                 | `false` | Deshabilita todos los radios del grupo. |
| `direction`  | `String`                  | `null`  | `horizontal` coloca los radios en fila. Por defecto columna. |

## BRadio — Props

| Prop         | Tipo                      | Default | Descripción |
|--------------|---------------------------|---------|-------------|
| `value`      | `String\|Number\|Boolean` | —       | **Requerido.** Valor que representa esta opción. |
| `modelValue` | `String\|Number\|Boolean` | —       | Solo para uso suelto (sin grupo). Vinculado con `v-model`. |
| `disabled`   | `Boolean`                 | `false` | Deshabilita este radio. |
| `name`       | `String`                  | `null`  | Sobreescribe el `name` heredado del grupo. |
| `id`         | `String`                  | `null`  | `id` del input. |

---

## Atributos data-*

| Atributo         | Elemento         | Descripción |
|------------------|------------------|-------------|
| `data-checked`   | `.b-radio`       | Presente en la opción seleccionada. |
| `data-disabled`  | `.b-radio` / `.b-radio-group` | Estado deshabilitado. |
| `data-direction` | `.b-radio-group` | Dirección del grupo. |

---

## Ejemplos de uso

### Grupo con v-model

```html
<BRadioGroup v-model="plan">
  <BRadio value="free">Gratuito</BRadio>
  <BRadio value="pro">Pro</BRadio>
  <BRadio value="enterprise" disabled>Enterprise</BRadio>
</BRadioGroup>
```

### Horizontal

```html
<BRadioGroup v-model="respuesta" direction="horizontal">
  <BRadio :value="true">Sí</BRadio>
  <BRadio :value="false">No</BRadio>
</BRadioGroup>
```

### Dentro de BField

```html
<BField>
  <template #label>Plan</template>
  <BRadioGroup v-model="plan">
    <BRadio value="free">Gratuito</BRadio>
    <BRadio value="pro">Pro</BRadio>
  </BRadioGroup>
  <template #hint>Puedes cambiar de plan en cualquier momento.</template>
</BField>
```

Dentro de `BField`, el grupo hereda `aria-describedby` y `aria-invalid` del campo.

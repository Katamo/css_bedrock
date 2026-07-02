# Switch

`BSwitch` es un interruptor on/off compatible con `v-model` booleano. Semánticamente es un checkbox con `role="switch"`. Renderiza `label.b-switch > input[type="checkbox"] + span.track > span.thumb + span.label`; el input real está visualmente oculto y el track/thumb se estilan desde CSS.

---

## Importación

```js
import { BSwitch } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/switch';
```

---

## Props

| Prop         | Tipo      | Default | Descripción |
|--------------|-----------|---------|-------------|
| `modelValue` | `Boolean` | `false` | Estado del interruptor. Vinculado con `v-model`. |
| `disabled`   | `Boolean` | `false` | Deshabilita el interruptor. |
| `name`       | `String`  | `null`  | Atributo `name` del input. |
| `id`         | `String`  | `null`  | `id` del input. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Texto del label, a la derecha del interruptor. |

---

## Atributos data-*

| Atributo        | Descripción |
|-----------------|-------------|
| `data-checked`  | Presente cuando está activado. |
| `data-disabled` | Estado deshabilitado. |

---

## Emits

| Evento              | Payload   | Descripción |
|---------------------|-----------|-------------|
| `update:modelValue` | `Boolean` | Emitido en cada evento `change`. Permite usar `v-model`. |

---

## Ejemplos de uso

### Básico

```html
<BSwitch v-model="notificaciones">Recibir notificaciones</BSwitch>
```

### Dentro de BField

```html
<BField>
  <template #label>Privacidad</template>
  <BSwitch v-model="perfilPublico">Perfil público</BSwitch>
  <template #hint>Cualquiera podrá ver tu perfil.</template>
</BField>
```

Dentro de `BField`, el switch hereda `id`, `aria-describedby`, `aria-invalid` y `disabled` del campo.

# Field

`BField` es la carcasa de un campo de formulario. Proporciona la estructura semántica (label, control, hint, error) y los atributos de datos de estado. No incluye el control en sí — éste se inyecta en el slot `default`.

---

## Importación

```js
import { BField } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/field';
```

---

## Props

| Prop       | Tipo      | Default | Descripción |
|------------|-----------|---------|-------------|
| `fieldId`  | `String`  | `null`  | Enlaza el `<label>` con el control mediante `for`/`id`. Debe coincidir con el `id` del control interior. |
| `disabled` | `Boolean` | `false` | Aplica `data-disabled` al campo completo. |
| `required` | `Boolean` | `false` | Aplica `data-required` al campo completo. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | El control del campo: `BInput`, `BCheckbox`, `<select>` nativo, etc. |
| `label`   | Texto del label. Si está presente, se renderiza un `<label>` vinculado al control via `fieldId`. |
| `hint`    | Texto de ayuda mostrado bajo el control. |
| `error`   | Mensaje de error. Su presencia también aplica `data-error` al elemento raíz. |

---

## Atributos de datos generados

| Atributo        | Cuándo aparece |
|-----------------|----------------|
| `data-disabled` | Cuando `disabled` es `true`. |
| `data-required` | Cuando `required` es `true`. |
| `data-error`    | Cuando el slot `error` está presente. |

---

## Estructura HTML generada

```html
<div class="b-field">
  <label class="label" for="my-input">Email</label>
  <div class="control">
    <!-- slot default -->
  </div>
  <span class="hint">Usaremos este email solo para notificaciones.</span>
  <span class="error" role="alert">El email no es válido.</span>
</div>
```

---

## Ejemplos de uso

### Campo básico con BInput

```html
<BField field-id="email">
  <template #label>Email</template>
  <BInput id="email" v-model="email" type="email" />
</BField>
```

### Con hint

```html
<BField field-id="password">
  <template #label>Contraseña</template>
  <BInput id="password" v-model="password" type="password" />
  <template #hint>Mínimo 8 caracteres.</template>
</BField>
```

### Con error

```html
<BField field-id="username" :required="true">
  <template #label>Usuario</template>
  <BInput id="username" v-model="username" />
  <template #error>El nombre de usuario ya existe.</template>
</BField>
```

### Deshabilitado

```html
<BField :disabled="true">
  <template #label>Plan actual</template>
  <BInput v-model="plan" :disabled="true" />
</BField>
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/field';

.b-field {
  display: flex;
  flex-direction: column;
  gap: spacing(1);

  .label {
    @include typeset(field-label);
    color: color(text);
  }

  .hint {
    @include typeset(field-hint);
    color: color(text, subtle);
  }

  .error {
    @include typeset(field-hint);
    color: color(error);
  }

  @include attr(disabled) {
    opacity: 0.5;
    pointer-events: none;
  }

  @include attr(required) {
    .label::after {
      content: ' *';
      color: color(error);
    }
  }

  @include attr(error) {
    .control { border-color: color(error); }
  }
}
```

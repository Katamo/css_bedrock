# Field

`CField` es la carcasa de un campo de formulario. Proporciona la estructura semántica (label, control, hint, error) y los atributos de datos de estado. No incluye el control en sí — éste se inyecta en el slot `default`.

---

## Importación

```js
import { CField } from '@bedrock/core/vue';
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
| `default` | El control del campo: `CInput`, `CCheckbox`, `<select>` nativo, etc. |
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
<div class="c-field">
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

### Campo básico con CInput

```html
<CField field-id="email">
  <template #label>Email</template>
  <CInput id="email" v-model="email" type="email" />
</CField>
```

### Con hint

```html
<CField field-id="password">
  <template #label>Contraseña</template>
  <CInput id="password" v-model="password" type="password" />
  <template #hint>Mínimo 8 caracteres.</template>
</CField>
```

### Con error

```html
<CField field-id="username" :required="true">
  <template #label>Usuario</template>
  <CInput id="username" v-model="username" />
  <template #error>El nombre de usuario ya existe.</template>
</CField>
```

### Deshabilitado

```html
<CField :disabled="true">
  <template #label>Plan actual</template>
  <CInput v-model="plan" :disabled="true" />
</CField>
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/field';

.c-field {
  display: flex;
  flex-direction: column;
  gap: spacing(1);

  .label {
    font-size: 0.875rem;
    font-weight: 500;
    color: color(text);
  }

  .hint {
    font-size: 0.75rem;
    color: color(text, subtle);
  }

  .error {
    font-size: 0.75rem;
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

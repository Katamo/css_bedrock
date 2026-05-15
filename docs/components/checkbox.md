# Checkbox

`CCheckbox` es un checkbox nativo con su label, compatible con `v-model` booleano. Renderiza un `<label>` que envuelve el `<input type="checkbox">` y el texto del label en `<span class="label">`.

---

## Importación

```js
import { CCheckbox } from '@bedrock/core/vue';
```

```scss
@use '@bedrock/core/checkbox';
```

---

## Props

| Prop         | Tipo      | Default | Descripción |
|--------------|-----------|---------|-------------|
| `modelValue` | `Boolean` | `false` | Estado del checkbox. Vinculado con `v-model`. |
| `disabled`   | `Boolean` | `false` | Deshabilita el checkbox y aplica `data-disabled`. |
| `value`      | `String`  | `null`  | Valor HTML del input. Útil en grupos de checkboxes. |
| `name`       | `String`  | `null`  | Nombre del campo para envío de formulario. |
| `id`         | `String`  | `null`  | ID del input nativo. Necesario si se usa fuera de `CField`. |

---

## Slots

| Slot      | Descripción |
|-----------|-------------|
| `default` | Texto del label. Si está vacío, no se renderiza el `<span class="label">`. |

---

## Emits

| Evento              | Payload   | Descripción |
|---------------------|-----------|-------------|
| `update:modelValue` | `Boolean` | Emitido al cambiar el estado. Permite usar `v-model`. |

---

## Atributos de datos generados

| Atributo        | Cuándo aparece |
|-----------------|----------------|
| `data-disabled` | Cuando `disabled` es `true`. |

---

## Estructura HTML generada

```html
<label class="c-checkbox">
  <input type="checkbox" />
  <span class="label">Acepto los términos</span>
</label>
```

---

## Ejemplos de uso

### Básico con v-model

```html
<CCheckbox v-model="aceptado">Acepto los términos y condiciones</CCheckbox>
```

### Deshabilitado

```html
<CCheckbox v-model="valor" :disabled="true">Opción no disponible</CCheckbox>
```

### Grupo de checkboxes

```html
<CCheckbox
  v-for="opcion in opciones"
  :key="opcion.value"
  v-model="seleccionados"
  :value="opcion.value"
  name="preferencias"
>
  {{ opcion.label }}
</CCheckbox>
```

### Sin label visible

```html
<CCheckbox v-model="activo" :id="'toggle-activo'" aria-label="Activar notificaciones" />
```

---

## Estilos en el proyecto consumidor

```scss
@use 'bedrock-config' as *;
@use '@bedrock/core/checkbox';

.c-checkbox {
  display: inline-flex;
  align-items: center;
  gap: spacing(2);
  cursor: pointer;

  input[type='checkbox'] {
    width: spacing(4);
    height: spacing(4);
    accent-color: color(primary);
    cursor: pointer;
  }

  .label {
    @include typeset(label);
    color: color(text);
    user-select: none;
  }

  @include attr(disabled) {
    opacity: 0.5;
    cursor: not-allowed;

    input[type='checkbox'] { cursor: not-allowed; }
  }
}
```

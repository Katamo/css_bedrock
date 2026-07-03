import { h, defineComponent, ref, watchPostEffect } from 'vue';
import { useFieldContext, fieldControlAttrs } from '../field/context.js';

/**
 * BSelect
 * Native <select> compatible con v-model.
 * Renderiza un único elemento select.b-select.
 *
 * Las opciones pueden venir de dos formas:
 *   - prop `options`: array de primitivos o de objetos { value, label, disabled }
 *   - slot default: elementos <option> nativos
 *
 * Dentro de un BField hereda automáticamente id, aria-describedby,
 * aria-invalid, required y disabled.
 */
export default defineComponent({
  name: 'BSelect',
  inheritAttrs: false,
  props: {
    // Sin restricción de tipo: el v-model puede llevar valores tipados
    // (number, null…) igual que el select nativo de Vue
    modelValue: { default: '' },
    options:    { type: Array,   default: null },
    disabled:   { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const field = useFieldContext();
    const el = ref(null);

    // La selección se sincroniza sobre el DOM tras cada render: asignar
    // `value` como prop del vnode no funciona porque el select se monta
    // antes que sus <option>
    watchPostEffect(() => {
      if (el.value) el.value.value = String(props.modelValue ?? '');
    });

    return () => {
      const children = props.options
        ? props.options.map((opt) => {
            const isObject = typeof opt === 'object' && opt !== null;
            const value = isObject ? opt.value : opt;
            return h('option', {
              key: value,
              value,
              disabled: (isObject && opt.disabled) || undefined,
            }, String(isObject ? opt.label ?? opt.value : opt));
          })
        : slots.default?.();

      return h('select', {
        ...fieldControlAttrs(field, attrs),
        ...attrs,
        ref: el,
        class:    ['b-select', attrs.class],
        disabled: props.disabled || field?.disabled || undefined,
        // Vue guarda el valor tipado del <option> en `_value` (runtime-dom):
        // preferirlo preserva numbers/null en el v-model, como hace el
        // v-model nativo de Vue sobre <select>
        onChange: (e) => {
          const opt = e.target.selectedOptions[0];
          emit('update:modelValue', opt && '_value' in opt ? opt._value : e.target.value);
        },
      }, children);
    };
  },
});

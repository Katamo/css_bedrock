import { h, defineComponent } from 'vue';
import { useFieldContext, fieldControlAttrs } from '../field/context.js';

/**
 * BSwitch
 * Interruptor on/off, compatible con v-model booleano.
 * Semánticamente es un checkbox con role="switch".
 * Renderiza: label.b-switch > input[type="checkbox"] + span.track > span.thumb + span.label
 *
 * El texto del label va en el slot default.
 * El input real está visualmente oculto; el track/thumb se estilan
 * a partir de los estados :checked y data-* del componente.
 *
 * Dentro de un BField hereda id, aria-describedby, aria-invalid y disabled.
 */
export default defineComponent({
  name: 'BSwitch',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled:   { type: Boolean, default: false },
    name:       { type: String,  default: null },
    id:         { type: String,  default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const field = useFieldContext();

    return () => {
      const { class: extraClass, ...restAttrs } = attrs;
      const isDisabled = props.disabled || field?.disabled;

      return h('label', {
        class: ['b-switch', extraClass],
        ...(isDisabled       && { 'data-disabled': '' }),
        ...(props.modelValue && { 'data-checked':  '' }),
      }, [
        h('input', {
          ...fieldControlAttrs(field, { ...restAttrs, ...(props.id && { id: props.id }) }),
          ...restAttrs,
          type:     'checkbox',
          role:     'switch',
          checked:  props.modelValue,
          disabled: isDisabled || undefined,
          ...(props.name && { name: props.name }),
          ...(props.id   && { id:   props.id   }),
          onChange: (e) => emit('update:modelValue', e.target.checked),
        }),
        h('span', { class: 'track', 'aria-hidden': 'true' },
          h('span', { class: 'thumb' })
        ),
        slots.default
          ? h('span', { class: 'label' }, slots.default())
          : null,
      ]);
    };
  },
});

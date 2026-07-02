import { h, defineComponent, inject } from 'vue';
import { RADIO_GROUP_KEY } from './context.js';

/**
 * BRadio
 * Radio button con su label, compatible con v-model.
 * Renderiza: label.b-radio > input[type="radio"] + span.label
 *
 * El texto del label va en el slot default.
 * v-model: está seleccionado cuando modelValue === value; al seleccionarlo
 * emite update:modelValue con su value.
 *
 * Dentro de un BRadioGroup hereda name, modelValue y disabled del grupo:
 * el v-model se declara una única vez en el grupo.
 */
export default defineComponent({
  name: 'BRadio',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    value:      { type: [String, Number, Boolean], required: true },
    disabled:   { type: Boolean, default: false },
    name:       { type: String,  default: null },
    id:         { type: String,  default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const group = inject(RADIO_GROUP_KEY, null);

    return () => {
      const { class: extraClass, ...restAttrs } = attrs;

      const model      = group ? group.modelValue : props.modelValue;
      const name       = props.name ?? group?.name;
      const isDisabled = props.disabled || group?.disabled;
      const isChecked  = model === props.value;

      const select = () => {
        if (group) group.update(props.value);
        else emit('update:modelValue', props.value);
      };

      return h('label', {
        class: ['b-radio', extraClass],
        ...(isDisabled && { 'data-disabled': '' }),
        ...(isChecked  && { 'data-checked':  '' }),
      }, [
        h('input', {
          ...restAttrs,
          type:     'radio',
          value:    props.value,
          checked:  isChecked,
          disabled: isDisabled || undefined,
          ...(name    && { name }),
          ...(props.id && { id: props.id }),
          onChange: select,
        }),
        slots.default
          ? h('span', { class: 'label' }, slots.default())
          : null,
      ]);
    };
  },
});

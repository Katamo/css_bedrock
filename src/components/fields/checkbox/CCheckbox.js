import { h, defineComponent } from 'vue';

/**
 * CCheckbox
 * Checkbox input with its label, v-model compatible.
 * Renders: label.c-checkbox > input[type="checkbox"] + span.label
 *
 * The label text goes in the default slot.
 * Supports v-model (boolean) via modelValue + update:modelValue.
 */
export default defineComponent({
  name: 'CCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled:   { type: Boolean, default: false },
    value:      { type: String,  default: null },
    name:       { type: String,  default: null },
    id:         { type: String,  default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;

      return h('label', {
        class: ['c-checkbox', extraClass],
        ...(props.disabled && { 'data-disabled': '' }),
      }, [
        h('input', {
          ...restAttrs,
          type:     'checkbox',
          checked:  props.modelValue,
          disabled: props.disabled || undefined,
          ...(props.value && { value: props.value }),
          ...(props.name  && { name:  props.name  }),
          ...(props.id    && { id:    props.id    }),
          onChange: (e) => emit('update:modelValue', e.target.checked),
        }),
        slots.default
          ? h('span', { class: 'label' }, slots.default())
          : null,
      ]);
    };
  },
});

import { h, defineComponent } from 'vue';

/**
 * CField
 * Shell for a form field: label + control + hint + error.
 * Provides structure and state data-attributes.
 * The control (input, select, etc.) goes in the default slot.
 *
 * Slots:
 *   default — the field control (CInput, CCheckbox, native select…)
 *   label   — label text
 *   hint    — helper text shown below the control
 *   error   — error message; also sets data-error on the root
 *
 * Accessibility: use fieldId to link the label to its input via for/id.
 */
export default defineComponent({
  name: 'CField',
  inheritAttrs: false,
  props: {
    fieldId:  { type: String,  default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const hasError = !!slots.error;

      return h('div', {
        ...attrs,
        class: ['c-field', attrs.class],
        ...(props.disabled && { 'data-disabled': '' }),
        ...(props.required && { 'data-required': '' }),
        ...(hasError       && { 'data-error':    '' }),
      }, [
        slots.label
          ? h('label', { class: 'label', for: props.fieldId }, slots.label())
          : null,
        h('div', { class: 'control' }, slots.default?.()),
        slots.hint
          ? h('span', { class: 'hint' }, slots.hint())
          : null,
        slots.error
          ? h('span', { class: 'error', role: 'alert' }, slots.error())
          : null,
      ]);
    };
  },
});

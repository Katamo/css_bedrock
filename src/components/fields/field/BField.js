import { h, defineComponent, provide, reactive, useId } from 'vue';
import { FIELD_KEY } from './context.js';

/**
 * BField
 * Shell for a form field: label + control + hint + error.
 * Provides structure and state data-attributes.
 * The control (input, select, etc.) goes in the default slot.
 *
 * Slots:
 *   default — the field control (BInput, BCheckbox, native select…)
 *   label   — label text
 *   hint    — helper text shown below the control
 *   error   — error message; also sets data-error on the root
 *
 * Accessibility: el campo se cablea solo. BField genera un id (o usa fieldId)
 * y lo provee junto con hintId/errorId/invalid/disabled a través de
 * provide/inject; los controles Bedrock del slot lo aplican automáticamente
 * (for/id, aria-describedby, aria-invalid). Requiere Vue ≥ 3.5 (useId).
 */
export default defineComponent({
  name: 'BField',
  inheritAttrs: false,
  props: {
    fieldId:  { type: String,  default: null },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    const autoId = useId();

    const ctx = reactive({
      id: null,
      hintId: null,
      errorId: null,
      invalid: false,
      disabled: false,
      required: false,
    });
    provide(FIELD_KEY, ctx);

    return () => {
      const id = props.fieldId ?? autoId;
      const hasHint  = !!slots.hint;
      const hasError = !!slots.error;

      // Los controles del slot renderizan después: leen el contexto ya actualizado
      ctx.id       = id;
      ctx.hintId   = hasHint  ? `${id}-hint`  : null;
      ctx.errorId  = hasError ? `${id}-error` : null;
      ctx.invalid  = hasError;
      ctx.disabled = props.disabled;
      ctx.required = props.required;

      return h('div', {
        ...attrs,
        class: ['b-field', attrs.class],
        ...(props.disabled && { 'data-disabled': '' }),
        ...(props.required && { 'data-required': '' }),
        ...(hasError       && { 'data-error':    '' }),
      }, [
        slots.label
          ? h('label', { class: 'label', for: id }, slots.label())
          : null,
        h('div', { class: 'control' }, slots.default?.()),
        hasHint
          ? h('span', { class: 'hint', id: ctx.hintId }, slots.hint())
          : null,
        hasError
          ? h('span', { class: 'error', id: ctx.errorId, role: 'alert' }, slots.error())
          : null,
      ]);
    };
  },
});

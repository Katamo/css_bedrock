import { h, defineComponent } from 'vue';
import { useFieldContext, fieldControlAttrs } from '../field/context.js';

/**
 * BTextarea
 * Native <textarea> compatible con v-model.
 * Renderiza un único elemento textarea.b-textarea.
 *
 * Bedrock data-attributes driven by props:
 *   data-resize ← resize prop (none | vertical | horizontal | both)
 *
 * Dentro de un BField hereda automáticamente id, aria-describedby,
 * aria-invalid, required y disabled.
 */
export default defineComponent({
  name: 'BTextarea',
  inheritAttrs: false,
  props: {
    modelValue: { type: String,  default: '' },
    rows:       { type: [String, Number], default: 3 },
    resize:     { type: String,  default: null },
    disabled:   { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const field = useFieldContext();

    return () => h('textarea', {
      ...fieldControlAttrs(field, attrs),
      ...attrs,
      class:    ['b-textarea', attrs.class],
      rows:     props.rows,
      value:    props.modelValue,
      disabled: props.disabled || field?.disabled || undefined,
      ...(props.resize && { 'data-resize': props.resize }),
      onInput:  (e) => emit('update:modelValue', e.target.value),
    });
  },
});

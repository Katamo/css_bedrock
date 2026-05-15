import { h, defineComponent } from 'vue';

/**
 * CInput
 * Native text input, v-model compatible.
 * Renders a single <input class="c-input">.
 *
 * Supports v-model via modelValue + update:modelValue.
 * All extra attrs (id, name, placeholder, autocomplete…)
 * are forwarded to the input element.
 */
export default defineComponent({
  name: 'CInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    type:       { type: String,  default: 'text' },
    disabled:   { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () => h('input', {
      ...attrs,
      class:    ['c-input', attrs.class],
      type:     props.type,
      value:    props.modelValue,
      disabled: props.disabled || undefined,
      onInput:  (e) => emit('update:modelValue', e.target.value),
    });
  },
});

import { h, defineComponent } from 'vue';

/**
 * BInput
 * Native text input, v-model compatible.
 * Renders a single <input class="b-input">.
 *
 * Supports v-model via modelValue + update:modelValue.
 * All extra attrs (id, name, placeholder, autocomplete…)
 * are forwarded to the input element.
 */
export default defineComponent({
  name: 'BInput',
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
      class:    ['b-input', attrs.class],
      type:     props.type,
      value:    props.modelValue,
      disabled: props.disabled || undefined,
      onInput:  (e) => emit('update:modelValue', e.target.value),
    });
  },
});

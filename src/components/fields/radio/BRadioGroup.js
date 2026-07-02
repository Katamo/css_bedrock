import { h, defineComponent, provide, reactive, useId } from 'vue';
import { RADIO_GROUP_KEY } from './context.js';
import { useFieldContext, fieldControlAttrs } from '../field/context.js';

/**
 * BRadioGroup
 * Agrupa BRadios compartiendo name y v-model.
 * Renderiza: div[role="radiogroup"].b-radio-group
 *
 * Los BRadio van en el slot default; heredan name, modelValue y disabled
 * del grupo, así el v-model se declara solo aquí.
 *
 * Bedrock data-attributes driven by props:
 *   data-direction ← direction prop (vertical | horizontal)
 *   data-disabled  ← disabled prop
 *
 * Dentro de un BField hereda aria-describedby y aria-invalid.
 */
export default defineComponent({
  name: 'BRadioGroup',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    name:       { type: String,  default: null },
    disabled:   { type: Boolean, default: false },
    direction:  { type: String,  default: null },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const field  = useFieldContext();
    const autoName = useId();

    const ctx = reactive({
      modelValue: undefined,
      name: null,
      disabled: false,
      update: (value) => emit('update:modelValue', value),
    });
    provide(RADIO_GROUP_KEY, ctx);

    return () => {
      ctx.modelValue = props.modelValue;
      ctx.name       = props.name ?? autoName;
      ctx.disabled   = props.disabled || field?.disabled;

      // el id del campo no aplica: un radiogroup no es focusable via label for
      const { id: _ignored, ...ariaAttrs } = fieldControlAttrs(field, attrs);

      return h('div', {
        ...ariaAttrs,
        ...attrs,
        class: ['b-radio-group', attrs.class],
        role: 'radiogroup',
        ...(props.direction && { 'data-direction': props.direction }),
        ...(ctx.disabled    && { 'data-disabled':  '' }),
      }, slots.default?.());
    };
  },
});

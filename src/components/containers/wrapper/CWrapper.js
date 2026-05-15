import { h, defineComponent } from 'vue';

/**
 * CWrapper
 * Vue 3 Wrapper component.
 * Maps 'type' prop to 'type' attribute to match Bedrock's b-wrapper CSS.
 */
export default defineComponent({
  name: 'CWrapper',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    tag: {
      type: String,
      default: 'div' // Default to Bedrock's custom tag for styling
    }
  },
  setup(props, { slots, attrs }) {
    return () => h(
      props.tag,
      {
        ...attrs,
        'type': props.type,
        class: ['c-wrapper', attrs.class]
      },
      slots.default ? slots.default() : []
    );
  }
});

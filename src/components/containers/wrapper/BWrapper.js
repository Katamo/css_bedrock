import { h, defineComponent } from 'vue';

/**
 * BWrapper
 * Vue 3 Wrapper component.
 * Maps 'type' prop to 'type' attribute to match Bedrock's b-wrapper CSS.
 */
export default defineComponent({
  name: 'BWrapper',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    tag: {
      type: String,
      default: 'div'
    },
    height: {
      type: String,
      default: null
    }
  },
  setup(props, { slots, attrs }) {
    return () => h(
      props.tag,
      {
        ...attrs,
        'type': props.type,
        ...(props.height ? { 'data-height': props.height } : {}),
        class: ['b-wrapper', attrs.class]
      },
      slots.default ? slots.default() : []
    );
  }
});

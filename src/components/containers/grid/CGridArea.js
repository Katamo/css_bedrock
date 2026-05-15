import { h, defineComponent } from 'vue';

/**
 * CGridArea
 * Vue 3 Wrapper for Bedrock Grid Area.
 * Provides a native Vue experience without Custom Element warnings.
 */
export default defineComponent({
  name: 'CGridArea',
  inheritAttrs: false,
  props: {
    area: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props, { slots, attrs }) {
    return () => h(
      props.tag,
      {
        ...attrs,
        'data-grid-area': props.area,
        class: ['c-grid-area', attrs.class]
      },
      slots.default ? slots.default() : []
    );
  }
});

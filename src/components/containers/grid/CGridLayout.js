import { h, defineComponent } from 'vue';

/**
 * CGridLayout
 * Vue 3 Wrapper for Bedrock Grid Layout.
 * Provides a native Vue experience without Custom Element warnings.
 */
export default defineComponent({
  name: 'CGridLayout',
  inheritAttrs: false,
  props: {
    layout: {
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
        'data-grid-layout': props.layout,
        class: ['c-grid-layout', attrs.class]
      },
      slots.default ? slots.default() : []
    );
  }
});

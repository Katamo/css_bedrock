import { h, defineComponent } from 'vue';

/**
 * BMenu
 * Navigation menu component for Bedrock.
 * Provides the structural shell: div.b-menu > nav > ul.links
 *
 * The consumer renders <li> elements in the default slot,
 * using native <a> or BLink for each item.
 *
 * Mark active items with data-active on the <li> element.
 */
export default defineComponent({
  name: 'BMenu',
  inheritAttrs: false,
  props: {
    tag: { type: String, default: 'div' },
  },
  setup(props, { slots, attrs }) {
    return () => h(
      props.tag,
      { ...attrs, class: ['b-menu', attrs.class] },
      h('nav', {},
        h('ul', { class: 'links' }, slots.default?.())
      )
    );
  },
});

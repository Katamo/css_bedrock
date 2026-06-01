import { h, defineComponent, Fragment } from 'vue';

export default defineComponent({
  name: 'BMenu',
  inheritAttrs: false,
  props: {
    tag:       { type: String, default: 'nav' },
    direction: { type: String, default: null },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const flatten = (vnodes) => vnodes.flatMap(vnode =>
        vnode.type === Fragment ? flatten(vnode.children ?? []) : [vnode]
      );
      const vnodes = flatten(slots.default?.() ?? []);

      return h(
        props.tag,
        {
          ...attrs,
          class: ['b-menu', attrs.class],
          ...(props.direction && { 'data-direction': props.direction }),
        },
        h('ul', { class: 'b-menu__links' },
          vnodes.map(item => h('li', null, [item]))
        )
      );
    };
  },
});

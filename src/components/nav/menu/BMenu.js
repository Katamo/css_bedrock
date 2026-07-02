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

      // El ítem activo se detecta por aria-current (RouterLink/NuxtLink lo
      // ponen solos) o data-active manual, y se refleja en su <li>
      const isActive = (item) =>
        item.props != null &&
        (item.props['aria-current'] != null || item.props['data-active'] != null);

      return h(
        props.tag,
        {
          ...attrs,
          class: ['b-menu', attrs.class],
          ...(props.direction && { 'data-direction': props.direction }),
        },
        h('ul', { class: 'b-menu__links' },
          vnodes.map((item, index) => h('li', {
            key: item.key ?? index,
            ...(isActive(item) && { 'data-active': '' }),
          }, [item]))
        )
      );
    };
  },
});

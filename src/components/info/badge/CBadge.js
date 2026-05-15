import { h, defineComponent } from 'vue';
import CClickableArea from '../../cta/clickable-area/CClickableArea.js';

export default defineComponent({
  name: 'CBadge',
  inheritAttrs: false,
  props: {
    href: { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;
      const hasIcon = !!slots.icon;

      return h('span', {
        class: ['c-badge', extraClass],
        ...(props.disabled && { 'data-disabled': '' }),
        ...(hasIcon && { 'data-has-icon': '' }),
      },
        h(CClickableArea, {
          ...restAttrs,
          href: props.href,
          disabled: props.disabled,
        }, {
          default: () => [
            hasIcon ? h('span', { class: 'icon' }, slots.icon()) : null,
            h('span', { class: 'text' }, slots.default?.()),
          ],
        })
      );
    };
  },
});

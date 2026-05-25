import { h, defineComponent } from 'vue';
import BClickableArea from '../../cta/clickable-area/BClickableArea.js';

export default defineComponent({
  name: 'BBadge',
  inheritAttrs: false,
  props: {
    href: { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;
      const hasIcon = !!slots.icon;

      const isLink = !!props.href;
      const children = [
        hasIcon ? h('span', { class: 'icon' }, slots.icon()) : null,
        h('span', { class: 'text' }, slots.default?.()),
      ];

      return h('span', {
        class: ['b-badge', extraClass],
        ...(props.disabled && { 'data-disabled': '' }),
        ...(hasIcon && { 'data-has-icon': '' }),
      },
        isLink
          ? h(BClickableArea, {
              ...restAttrs,
              href: props.href,
              disabled: props.disabled,
            }, { default: () => children })
          : children
      );
    };
  },
});

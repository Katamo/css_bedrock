import { h, defineComponent } from 'vue';

/**
 * CClickableArea
 * Converts any element into an actionable one.
 * Renders as <a> when href is provided, <div> otherwise.
 *
 * For non-link elements, adds role="button", tabIndex and
 * Enter-key support automatically for accessibility.
 */
export default defineComponent({
  name: 'CClickableArea',
  inheritAttrs: false,
  props: {
    href:     { type: String,  default: null },
    disabled: { type: Boolean, default: false },
    role:     { type: String,  default: 'button' },
    id:       { type: String,  default: null },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const isLink = !!props.href;

      const onKeydown = !isLink && !props.disabled
        ? (e) => { if (e.key === 'Enter') e.currentTarget.click(); }
        : undefined;

      const domProps = {
        ...attrs,
        class: ['c-clickable-area', attrs.class],
        ...(props.id       && { id: props.id }),
        ...(props.disabled && { 'data-disabled': '' }),
        ...(isLink
          ? { href: props.href }
          : { role: props.role, tabIndex: props.disabled ? undefined : '0' }
        ),
        ...(onKeydown && { onKeydown }),
      };

      return h(isLink ? 'a' : 'div', domProps, slots.default?.());
    };
  },
});

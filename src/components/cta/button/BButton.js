import { h, defineComponent } from 'vue';

/**
 * BButton
 * Vue 3 button/link component for Bedrock.
 * Renders as <button> by default, or <a> when href is provided.
 *
 * Slots:
 *   default  — button label / content
 *   icon     — optional leading icon (img or svg)
 *   arrow    — optional trailing icon (e.g. arrow-embedded.svg)
 *
 * Bedrock data-attributes driven by props:
 *   data-color    ← color prop
 *   data-width    ← width prop
 *   data-height   ← height prop
 *   data-disabled ← disabled prop  (@include attr(disabled))
 */
export default defineComponent({
  name: 'BButton',
  inheritAttrs: false,
  props: {
    color:    { type: String,  default: null },
    type:     { type: String,  default: 'button' },
    disabled: { type: Boolean, default: false },
    href:     { type: String,  default: null },
    width:    { type: String,  default: null },
    height:   { type: String,  default: null },
    id:       { type: String,  default: null },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const isLink = !!props.href;
      const tag = isLink ? 'a' : 'button';

      const domProps = {
        ...attrs,
        class: ['b-button', attrs.class],
        ...(props.id       && { id: props.id }),
        ...(props.color    && { 'data-color':  props.color }),
        ...(props.width    && { 'data-width':  props.width }),
        ...(props.height   && { 'data-height': props.height }),
        ...(props.disabled && { 'data-disabled': '' }),
        ...(isLink
          // Un enlace deshabilitado pierde el href para quedar fuera del
          // orden de tabulación y no ser anunciado como navegable
          ? (props.disabled
              ? { 'aria-disabled': 'true' }
              : { href: props.href })
          : { type: props.type, disabled: props.disabled || undefined }),
      };

      return h(tag, domProps, [
        slots.icon  ? h('span', { class: 'icon' },  slots.icon())  : null,
        slots.default?.(),
        slots.arrow ? h('span', { class: 'arrow' }, slots.arrow()) : null,
      ]);
    };
  },
});

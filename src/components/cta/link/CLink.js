import { h, defineComponent } from 'vue';
import CClickableArea from '../clickable-area/CClickableArea.js';

/**
 * CLink
 * Text link component for Bedrock.
 * Wraps CClickableArea and adds the .text inner element
 * needed for CSS targeting (underline, color transitions).
 *
 * Slots:
 *   default — link text / content
 *
 * Bedrock data-attributes driven by props:
 *   data-color     ← color prop
 *   data-underline ← underline prop
 *   data-disabled  ← disabled prop
 */
export default defineComponent({
  name: 'CLink',
  inheritAttrs: false,
  props: {
    href:      { type: String,  default: null },
    disabled:  { type: Boolean, default: false },
    color:     { type: String,  default: null },
    underline: { type: String,  default: null },
    id:        { type: String,  default: null },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;

      const outerProps = {
        class: ['c-link', extraClass],
        ...(props.color     && { 'data-color':     props.color }),
        ...(props.underline && { 'data-underline': props.underline }),
        ...(props.disabled  && { 'data-disabled':  '' }),
      };

      const areaProps = {
        ...restAttrs,
        href:     props.href,
        disabled: props.disabled,
        ...(props.id && { id: props.id }),
      };

      return h('div', outerProps,
        h(CClickableArea, areaProps,
          { default: () => h('span', { class: 'text' }, slots.default?.()) }
        )
      );
    };
  },
});

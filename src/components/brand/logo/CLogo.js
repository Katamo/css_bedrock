import { h, defineComponent } from 'vue';
import CImage from '../../media/image/CImage.js';

export default defineComponent({
  name: 'CLogo',
  inheritAttrs: false,
  props: {
    src:      { type: String, required: true },
    alt:      { type: String, default: '' },
    href:     { type: String, default: null },
    disabled: { type: Boolean, default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;
      const isLink    = !!props.href;
      const hasText   = !!slots.default;

      return h('div', {
        ...restAttrs,
        class: ['c-logo', extraClass],
        ...(isLink    && { 'data-has-pointer': '' }),
        ...(hasText   && { 'data-has-text':    '' }),
        ...(props.disabled && { 'data-disabled': '' }),
      },
        h(isLink ? 'a' : 'div', {
          class: 'logo',
          ...(isLink && { href: props.href }),
        }, [
          h(CImage, {
            src:     props.src,
            alt:     props.alt,
            loading: 'eager',
            fit:     'contain',
          }),
          ...(hasText ? slots.default() : []),
        ])
      );
    };
  },
});

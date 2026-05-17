import { h, defineComponent } from 'vue';
import BImage from '../../media/image/BImage.js';

export default defineComponent({
  name: 'BLogo',
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
        class: ['b-logo', extraClass],
        ...(isLink    && { 'data-has-pointer': '' }),
        ...(hasText   && { 'data-has-text':    '' }),
        ...(props.disabled && { 'data-disabled': '' }),
      },
        h(isLink ? 'a' : 'div', {
          class: 'logo',
          ...(isLink && { href: props.href }),
        }, [
          h(BImage, {
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

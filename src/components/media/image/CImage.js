import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'CImage',
  inheritAttrs: false,
  props: {
    src:      { type: String,           required: true },
    alt:      { type: String,           default: '' },
    fit:      { type: String,           default: null },
    loading:  { type: String,           default: 'lazy' },
    width:    { type: [String, Number], default: null },
    height:   { type: [String, Number], default: null },
    srcset:   { type: String,           default: null },
    sizes:    { type: String,           default: null },
    draggable: { type: Boolean,         default: false },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;
      const hasCaption = !!slots.caption;

      const imgProps = {
        src:     props.src,
        alt:     props.alt,
        loading: props.loading,
        draggable: props.draggable ? undefined : 'false',
        ...(props.width  && { width:  props.width }),
        ...(props.height && { height: props.height }),
        ...(props.srcset && { srcset: props.srcset }),
        ...(props.sizes  && { sizes:  props.sizes }),
      };

      return h('figure', {
        ...restAttrs,
        class: ['c-image', extraClass],
        ...(props.fit    && { 'data-fit': props.fit }),
        ...(hasCaption   && { 'data-has-caption': '' }),
      }, [
        h('img', imgProps),
        hasCaption
          ? h('figcaption', { class: 'caption' }, slots.caption())
          : null,
      ]);
    };
  },
});

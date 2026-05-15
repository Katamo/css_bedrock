import { h, defineComponent } from 'vue';

export default defineComponent({
  name: 'CPagination',
  inheritAttrs: false,
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ['update:currentPage'],
  setup(props, { slots, attrs, emit }) {
    return () => {
      const { class: extraClass, ...restAttrs } = attrs;

      const goTo = (page) => {
        if (!props.disabled && page >= 1 && page <= props.totalPages) {
          emit('update:currentPage', page);
        }
      };

      const prevProps = {
        class: 'prev',
        role: 'button',
        tabIndex: props.disabled || props.currentPage <= 1 ? undefined : '0',
        'aria-label': 'Previous page',
        'aria-disabled': props.currentPage <= 1 ? 'true' : undefined,
        ...(props.currentPage <= 1 || props.disabled ? { 'data-disabled': '' } : {}),
        onClick: () => goTo(props.currentPage - 1),
        onKeydown: (e) => { if (e.key === 'Enter') goTo(props.currentPage - 1); },
      };

      const nextProps = {
        class: 'next',
        role: 'button',
        tabIndex: props.disabled || props.currentPage >= props.totalPages ? undefined : '0',
        'aria-label': 'Next page',
        'aria-disabled': props.currentPage >= props.totalPages ? 'true' : undefined,
        ...(props.currentPage >= props.totalPages || props.disabled ? { 'data-disabled': '' } : {}),
        onClick: () => goTo(props.currentPage + 1),
        onKeydown: (e) => { if (e.key === 'Enter') goTo(props.currentPage + 1); },
      };

      const pages = [];
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(
          h('li', { key: i },
            h('button', {
              class: 'page',
              type: 'button',
              disabled: props.disabled || undefined,
              'aria-current': i === props.currentPage ? 'page' : undefined,
              ...(i === props.currentPage ? { 'data-current': '' } : {}),
              onClick: () => goTo(i),
            },
              slots.page ? slots.page({ page: i, current: props.currentPage }) : String(i)
            )
          )
        );
      }

      return h('nav', {
        ...restAttrs,
        class: ['c-pagination', extraClass],
        'aria-label': attrs['aria-label'] ?? 'Pagination',
        ...(props.disabled ? { 'data-disabled': '' } : {}),
      }, [
        h('div', prevProps, slots.prev?.() ?? '‹'),
        h('ul', { class: 'pages' }, pages),
        h('div', nextProps, slots.next?.() ?? '›'),
      ]);
    };
  },
});

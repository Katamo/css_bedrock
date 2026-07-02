import { h, defineComponent } from 'vue';

/**
 * BPagination
 * Paginación con v-model sobre currentPage.
 *
 * Slots:
 *   prev     — contenido del botón anterior (default: ‹)
 *   next     — contenido del botón siguiente (default: ›)
 *   page     — contenido de cada página ({ page, current })
 *   ellipsis — contenido del truncado (default: …)
 *
 * Props:
 *   siblings — nº de páginas visibles a cada lado de la actual;
 *              null (default) renderiza todas las páginas sin truncar.
 *              La primera y la última página siempre se muestran.
 */
export default defineComponent({
  name: 'BPagination',
  inheritAttrs: false,
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    disabled: { type: Boolean, default: false },
    siblings: { type: Number, default: null },
  },
  emits: ['update:currentPage'],
  setup(props, { slots, attrs, emit }) {
    // Lista de páginas a renderizar; 'ellipsis' marca cada hueco truncado
    const pageList = () => {
      const { totalPages: total, currentPage: current, siblings } = props;

      if (siblings == null) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      const visible = new Set([1, total]);
      for (let i = current - siblings; i <= current + siblings; i++) {
        if (i >= 1 && i <= total) visible.add(i);
      }

      const sorted = [...visible].sort((a, b) => a - b);
      const out = [];
      let prev = 0;
      for (const page of sorted) {
        // hueco de una sola página: mostrarla vale lo mismo que '…'
        if (page - prev === 2) out.push(prev + 1);
        else if (page - prev > 2) out.push('ellipsis');
        out.push(page);
        prev = page;
      }
      return out;
    };

    return () => {
      const { class: extraClass, ...restAttrs } = attrs;

      const goTo = (page) => {
        if (!props.disabled && page >= 1 && page <= props.totalPages && page !== props.currentPage) {
          emit('update:currentPage', page);
        }
      };

      const prevDisabled = props.disabled || props.currentPage <= 1;
      const nextDisabled = props.disabled || props.currentPage >= props.totalPages;

      const items = pageList().map((page, index) =>
        page === 'ellipsis'
          ? h('li', { key: `ellipsis-${index}`, class: 'ellipsis', 'aria-hidden': 'true' },
              slots.ellipsis?.() ?? '…'
            )
          : h('li', { key: page },
              h('button', {
                class: 'page',
                type: 'button',
                disabled: props.disabled || undefined,
                'aria-current': page === props.currentPage ? 'page' : undefined,
                ...(page === props.currentPage ? { 'data-current': '' } : {}),
                onClick: () => goTo(page),
              },
                slots.page ? slots.page({ page, current: props.currentPage }) : String(page)
              )
            )
      );

      return h('nav', {
        ...restAttrs,
        class: ['b-pagination', extraClass],
        'aria-label': attrs['aria-label'] ?? 'Pagination',
        ...(props.disabled ? { 'data-disabled': '' } : {}),
      }, [
        h('button', {
          class: 'prev',
          type: 'button',
          disabled: prevDisabled || undefined,
          'aria-label': 'Previous page',
          ...(prevDisabled ? { 'data-disabled': '' } : {}),
          onClick: () => goTo(props.currentPage - 1),
        }, slots.prev?.() ?? '‹'),
        h('ul', { class: 'pages' }, items),
        h('button', {
          class: 'next',
          type: 'button',
          disabled: nextDisabled || undefined,
          'aria-label': 'Next page',
          ...(nextDisabled ? { 'data-disabled': '' } : {}),
          onClick: () => goTo(props.currentPage + 1),
        }, slots.next?.() ?? '›'),
      ]);
    };
  },
});

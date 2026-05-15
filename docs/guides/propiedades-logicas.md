# Guía 02 — Propiedades lógicas: compatibilidad RTL/LTR

## Regla

> Usa siempre propiedades lógicas (`padding-inline`, `margin-block`, `inset-inline-start`…) en lugar de propiedades físicas (`padding-left`, `margin-top`, `left`…) cuando el valor dependa del eje horizontal.

---

## Por qué

Las propiedades físicas (`left`, `right`, `padding-left`…) están ancladas a una dirección absoluta del viewport. En un layout RTL (árabe, hebreo…) lo que debería estar "al inicio" está físicamente a la derecha, no a la izquierda.

Las **propiedades lógicas** usan ejes relativos al flujo del texto:

| Eje lógico | Dirección en LTR | Dirección en RTL |
|---|---|---|
| `inline-start` | izquierda | derecha |
| `inline-end` | derecha | izquierda |
| `block-start` | arriba | arriba |
| `block-end` | abajo | abajo |

Con propiedades lógicas, el mismo CSS funciona en ambas direcciones sin ningún override adicional.

---

## Tabla de equivalencias

| Propiedad física | Propiedad lógica equivalente |
|---|---|
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` / `max-width` | `min-inline-size` / `max-inline-size` |
| `min-height` / `max-height` | `min-block-size` / `max-block-size` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `padding-left` + `padding-right` | `padding-inline` |
| `padding-top` + `padding-bottom` | `padding-block` |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` + `margin-right` | `margin-inline` |
| `margin-top` + `margin-bottom` | `margin-block` |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |
| `top` | `inset-block-start` |
| `bottom` | `inset-block-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |

---

## Anti-patrón — propiedades físicas

```scss
.c-badge {
  // ❌ Solo funciona en LTR
  .icon {
    margin-right: spacing(1.5);
  }
}

.c-drawer {
  // ❌ En RTL el drawer aparecerá por el lado contrario
  position: fixed;
  left: 0;
  top: 0;
}
```

## Patrón correcto — propiedades lógicas

```scss
.c-badge {
  // ✅ Funciona en LTR y RTL
  .icon {
    margin-inline-end: spacing(1.5);
  }
}

.c-drawer {
  // ✅ Se adapta automáticamente al dir del documento
  position: fixed;
  inset-inline-start: 0;
  inset-block-start: 0;
}
```

---

## Cuándo sí usar propiedades físicas

Las propiedades físicas son correctas cuando el valor **no depende del eje horizontal del texto**, sino de una posición absoluta en pantalla:

```scss
// ✅ Correcto: una sombra decorativa siempre cae abajo, independiente del idioma
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

// ✅ Correcto: un tooltip siempre aparece bajo el trigger
.tooltip {
  top: calc(100% + spacing(1)); // posición vertical absoluta, no afectada por RTL
}
```

La regla práctica: si cambiando el `dir` del documento el elemento debería moverse horizontalmente, usa propiedades lógicas.

---

## Soporte de navegadores

Las propiedades lógicas tienen soporte completo en todos los navegadores modernos desde 2021. No requieren prefijos ni polyfills.

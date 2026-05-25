# Orden de declaraciones dentro de un selector

## La regla

Dentro de cualquier selector CSS, el orden de declaraciones es:

1. **`@include` primero** — todos los includes que emiten propiedades CSS directas
2. **Propiedades CSS** — propiedades literales como `color`, `padding`, `display`…
3. **Selectores hijos** — elementos anidados
4. **`@include bpFrom()`** — overrides de breakpoint, siempre al final y agrupados

---

## Por qué

Los `@include` establecen la base del elemento: su tipografía, sus sombras, sus transiciones. Colocarlos primero hace que el lector entienda inmediatamente qué sistema de diseño está aplicando el selector antes de leer los overrides concretos.

Los `@include bpFrom()` van al final porque son overrides, no definiciones base. Agruparlos juntos al final del bloque —en lugar de distribuirlos dentro de cada selector hijo— permite encontrarlos en un único lugar predecible.

---

## Ejemplo correcto

```scss
.c-card {
  @include effectShadow;
  @include transition(border-color, base, 0, (ease, base));
  background-color: color(surface, alt);
  padding: spacing(5);
  display: flex;
  gap: spacing(3);

  .title {
    @include typeset(h3);
    color: color(text);
  }

  .footer {
    display: flex;
    gap: spacing(2);
  }

  @include bpFrom(md) {
    padding: spacing(8);

    .footer {
      gap: spacing(4);
    }
  }
}
```

---

## Antipatrón

```scss
// MAL — includes dispersos, bpFrom anidados dentro de cada selector
.c-card {
  background-color: color(surface, alt);
  @include effectShadow;          // ❌ include después de propiedades
  padding: spacing(5);

  .title {
    @include typeset(h3);
    color: color(text);

    @include bpFrom(md) {         // ❌ bpFrom anidado en el selector hijo
      font-size: 20px;
    }
  }

  .footer {
    display: flex;

    @include bpFrom(md) {         // ❌ otro bpFrom disperso
      gap: spacing(4);
    }
  }
}
```

---

## Relación con la guía de tipografía

La guía de [Tipografía con typesets](./tipografia) ya documenta que `@include typeset()` debe ir primero. Esta guía generaliza esa misma idea a todos los includes, no solo a `typeset()`.

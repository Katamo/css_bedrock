# CSS global en sistemas de componentes

En proyectos que usan componentes con estilos encapsulados (Vue SFCs, CSS Modules, Astro, etc.), los estilos de cada componente se compilan de forma **independiente**. Esto crea un problema con cierto CSS que, por su naturaleza, solo puede o debe existir una vez en el documento.

## El problema

Cuando varios componentes hacen `@use 'bedrock-config' as *`, cada uno recibe su propia compilación del módulo SCSS. Las **funciones y mixins** no tienen coste — solo emiten CSS cuando se invocan. Pero el **CSS de salida directa** (reglas que existen fuera de un mixin) se replica en cada bloque `<style>`.

```scss
// ❌ CSS de salida directa en un archivo compartido
// Este bloque aparecerá en CADA componente que importe el módulo

@keyframes blink {
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 0; }
}
```

Resultado en producción: el mismo `@keyframes blink` duplicado decenas de veces, una por componente.

## La solución: mixins para CSS global

Todo CSS que deba existir **una sola vez** en el documento debe envolverse en un mixin:

```scss
// ✅ Envuelto en un mixin — solo emite CSS cuando se llama
@mixin blink-keyframes {
  @keyframes blink {
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  }
}
```

Y llamarse **una única vez** desde los estilos globales del proyecto:

```scss
// main.scss
@use 'bedrock-config' as *;

@include blink-keyframes;
```

## Qué CSS aplica este patrón

| Tipo | ¿Puede duplicarse? | Solución |
|------|--------------------|----------|
| `@keyframes` | No — el navegador sobreescribe pero el CSS creece innecesariamente | Mixin, incluir en global |
| `@font-face` | Técnicamente sí, pero es ineficiente | Mixin o archivo global dedicado |
| Variables CSS (`--var`) en `:root` | Solo si se definen en `:root` | Mixin o archivo global |
| Mixins y funciones SCSS | No aplica — no emiten CSS | Se pueden usar libremente |
| `@media` y reglas de componente | Se duplican por diseño | Normal en componentes |

## Regla general

> Si es CSS que el **navegador interpreta como global** (keyframes, font-face, variables de `:root`, reset…), debe vivir en los estilos globales del proyecto, no en archivos que los componentes importan con `@use`.

En Bedrock, estos casos se exponen siempre como mixins para que el consumidor decida dónde incluirlos. Nunca se emite CSS global de forma automática al importar el framework.

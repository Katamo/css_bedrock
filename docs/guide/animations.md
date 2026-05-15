# Animaciones y Transiciones

Bedrock proporciona variables estandarizadas para mantener la consistencia en el movimiento y las transiciones de la interfaz a través de toda la aplicación.

Estas variables se dividen en tiempos (duración) y curvas (easing).

---

## 1. Tiempos de Transición

El mapa `$transition-times` define las duraciones estándar. Por defecto incluye tres velocidades que puedes sobrescribir en tu configuración:

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $transition-times: (
    fast: 200ms,
    base: 400ms,
    slow: 800ms
  )
);
```

## 2. Curvas de Animación (Easings)

El mapa `$transition-curves` agrupa curvas Bézier matemáticas por familia (`linear`, `ease`, `quad`) y subtipo (`in`, `out`, `in-out`). 

## 3. Consumo en los componentes

Igual que ocurre con los colores, para utilizar estos valores en tus estilos debes hacer uso de la función `map.get` del módulo nativo de SASS:

```scss
@use 'bedrock-config' as bedrock;
@use 'sass:map';

.c-card {
  transition: transform map.get(bedrock.$transition-times, fast) map.get(bedrock.$transition-curves, ease, out);
}
```
# Sistema de Layout y Grid

Bedrock incluye un sistema de layout fluido y predecible, pensado para trabajar con componentes primitivos estructurales (como contenedores y celdas). Todo el comportamiento de este layout se controla mediante variables y mapas SASS configurables.

---

## 1. Contenedores (Wrappers)

Los wrappers se configuran con el mixin `setup-wrappers()`, que se llama en un archivo que importe `bedrock-config` — lo que hace disponibles `spacing()`, `color()`, `font()` y el resto de funciones.

El patrón recomendado es un **archivo dedicado** `_wrappers.scss` dentro de tu carpeta de setup:

```scss
// setup/_wrappers.scss
@use 'bedrock-config' as *;

@include setup-wrappers((
  // 1. Wrapper por defecto (padding que crece con la pantalla)
  default: (
    xxs: ( padding-inline: spacing(4) ),
    md:  ( padding-inline: spacing(6) ),
    lg:  ( padding-inline: spacing(8) ),
  ),
  // 2. Wrapper estático (mismo padding en todos los dispositivos)
  static: (
    xxs: ( padding-inline: spacing(6) ),
  ),
  // 3. Wrapper completo (sin padding, toca los bordes)
  full: (
    xxs: ( padding: 0 ),
  ),
  // 4. Wrapper desktop-full (padding en móvil, sin padding desde lg)
  desktop-full: (
    xxs: ( padding-inline: spacing(4) ),
    md:  ( padding-inline: spacing(6) ),
    lg:  ( padding: 0 ),
  ),
));
```

```scss
// main.scss
@use 'setup/bedrock-config' as *;
@use 'setup/wrappers';

@use '@bedrock/core/wrapper';
```

---

## 2. Sistema de Columnas (Grid)
Bedrock permite personalizar completamente la estructura de tu cuadrícula. Por defecto, es un sistema de 12 columnas.

Puedes modificar la cantidad de columnas, el margen inferior por defecto de los bloques de grid, y el tamaño de los huecos (gutters) de separación entre las celdas:

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  // Número total de columnas del layout
  $grid-cells: 12,

  // Margen inferior por defecto de un contenedor grid
  $grid-margin-bottom: 32px,

  // Separación entre columnas (gutters) escalable por breakpoint
  $grid-gutters: (
    default: (
      xxs: 16px, // Gutters en móvil
      md: 24px,  // Gutters en tablet
      lg: 32px   // Gutters en desktop
    )
  )
);
``` 

---

## 3. Capas de Profundidad (Z-Index)
Para evitar la clásica "guerra de z-index" (donde un modal queda accidentalmente por debajo de un header), Bedrock centraliza el manejo del eje Z en un único mapa.

Bedrock incluye una escala genérica por defecto (dropdown, sticky, header, backdrop, modal, tooltip), pero puedes sobrescribirla o ampliarla en tu configuración:

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $z-layers: (
    dropdown: 50,
    header: 200,
    modal: 400,
    cookies: 500 // ← Añadiendo una capa específica del proyecto
  )
);
```

--- 

Consumo en los componentes
Para aplicar estas capas en tus estilos, puedes utilizar la función de utilidad `z-layer()` provista por el framework (forma recomendada), o bien acceder directamente al mapa de variables usando la función nativa `map.get` de SASS. Ambas formas son válidas y equivalentes:

```scss
@use 'bedrock-config' as bedrock;
@use 'sass:map';

.c-modal {
  // Opción 1: Usando la función de utilidad
  z-index: bedrock.z-layer(modal);
  
  // Opción 2: Accediendo directamente al mapa
  z-index: map.get(bedrock.$z-layers, modal);
}
```

--- 
## 4. Consumo en HTML y SASS (Primitivas)
Bedrock proporciona componentes primitivos (etiquetas HTML personalizadas) para estructurar tu página sin ensuciar el HTML con atributos de presentación. Asegúrate de haber importado los estilos de estos básicos en tu main.scss (ej. @use '@bedrock/core/grid'; y @use '@bedrock/core/wrapper';).

Uso de b-wrapper
Para aplicar márgenes laterales a una sección, envuélvela en la etiqueta `<b-wrapper>` indicando en el atributo type el nombre de la configuración que quieres usar:

```html
<!-- Usa el padding que configuraste como 'default' -->
<b-wrapper type="default">
  <section class="m-hero">...</section>
</b-wrapper>
```
Uso de b-grid y el mixin span()
El sistema de cuadrícula se basa en un contenedor `<b-grid>` y celdas `<b-cell>`. Por defecto, cada celda ocupa el 100% del ancho. Para cambiar su tamaño responsivamente, no utilices clases en el HTML; usa el mixin span() en la hoja de estilos de tu componente.

El HTML (Estructural y limpio):

```html
<b-grid>
  <article class="c-card">1</article>
  <article class="c-card">2</article>
  <article class="c-card">3</article>
</b-grid>

```

Nota: Al usar el mixin span() directamente en tu componente .c-card, puedes prescindir de la etiqueta intermedia `<b-cell>`.

### El SASS (Lógica de presentación y layout):

```scss
@use 'bedrock-config' as bedrock;

.c-card {
  // En móvil ocupa todo el ancho por defecto
  
  @include bedrock.bpFrom(md) {
    @include bedrock.span(6); // Tablet: ocupa 6 columnas de 12 (50%)
  }
  @include bedrock.bpFrom(lg) {
    @include bedrock.span(4); // Desktop: ocupa 4 columnas de 12 (33.3%)
  }
}

```
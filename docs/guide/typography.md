# Sistema de Tipografía y Typesets

Bedrock no gestiona la tipografía usando simples variables aisladas para cada tamaño de fuente. En su lugar, utiliza el concepto de **Typeset** (Conjunto Tipográfico).

Un Typeset es un mapa SASS que define cómo debe comportarse un texto a través de diferentes resoluciones (breakpoints) y direcciones de lectura (Occidental vs Árabe).

---

## 1. Los 4 Mapas Principales

Bedrock expone 4 mapas tipográficos que el proyecto consumidor puede sobrescribir o extender desde su archivo de configuración:

1. **`$font-typeset`**: Tipografía estándar (Occidental / LTR).
2. **`$font-typeset-ar`**: Tipografía específica para idiomas de derecha a izquierda (RTL) como el árabe.
3. **`$font-typeset-elastic`**: Tipografía fluida LTR (escala gradualmente el tamaño usando interpolación `vw` entre dos breakpoints).
4. **`$font-typeset-elastic-ar`**: Tipografía fluida RTL.

*(Nota: Por defecto, los mapas `-ar` están vacíos en el framework. Si tu proyecto necesita soporte RTL, simplemente define las mismas claves en tu configuración y Bedrock inyectará las reglas automáticamente cuando detecte el contexto RTL en el HTML).*

---

## 2. Cómo crear un nuevo Typeset Estándar

Para crear o modificar un typeset, debes definir su comportamiento por `bps` (breakpoints) en tu archivo puente de configuración (`_bedrock-config.scss`).

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $font-typeset: (
    // Nombre de tu nuevo typeset
    mi-nuevo-titulo: (
      bps: (
        // Estilos para móvil (mobile-first)
        xxs: (
          font-family: ('Helvetica', sans-serif),
          font-weight: 700,
          font-size: 24px,
          line-height: 30px,
          letter-spacing: -0.5px
        ),
        // Cambios a partir de tablet
        md: (
          font-size: 32px,
          line-height: 38px
        ),
        // Cambios a partir de desktop
        lg: (
          font-size: 48px,
          line-height: 52px
        )
      )
    )
  )
);
```

---

## 3. Claves de `$font-family` y `$font-weight` en typesets

Dentro del bloque `@forward '@bedrock/core' with (...)`, las funciones de Bedrock (`font()`, `weight()`) **no están disponibles** porque el módulo aún no está cargado. Sin embargo, `getTypeProps` resuelve automáticamente las claves de ambos mapas al procesar el typeset.

Esto permite referenciar por nombre en lugar de usar el valor literal:

```scss
@forward '@bedrock/core' with (
  $font-family: (
    inter: ('Inter', sans-serif),
  ),

  $font-typeset: (
    base: (
      bps: (
        xxs: (
          font-family: inter,       // clave de $font-family → ('Inter', sans-serif)
          font-weight: semi-bold,   // clave de $font-weight → 600
          font-size: 15px,
        ),
      ),
    ),
  )
);
```

Si el valor de `font-family` o `font-weight` es un string que coincide con una clave del mapa correspondiente, `getTypeProps` lo sustituye por su valor resuelto antes de emitir el CSS. Si no coincide con ninguna clave, se emite tal cual (compatibilidad con valores literales CSS como `bold`, `400` o listas directas).

---

## 4. Cómo crear un Typeset Elástico

Los typesets elásticos calculan automáticamente un valor matemático para que el texto crezca fluidamente. A diferencia del estándar, **requieren exactamente dos breakpoints** (un mínimo y un máximo) y separan las propiedades estáticas en `defaultProps`.

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $font-typeset-elastic: (
    titulo-fluido: (
      // Propiedades estáticas que no cambian de tamaño
      defaultProps: (
        font-family: ('Georgia', serif),
        font-weight: 800,
      ),
      // EXACTAMENTE 2 breakpoints: el tamaño mínimo y el máximo
      bps: (
        xs: ( font-size: 40px, line-height: 40px ), // Tamaño mínimo en 375px
        xl: ( font-size: 100px, line-height: 96px ) // Crecerá fluidamente hasta los 1280px
      )
    )
  )
);
```

---

## 4. Consumo en tus componentes

Una vez definidos en tu configuración, consumirlos es extremadamente sencillo usando los mixins internos de Bedrock:

```scss
@use 'bedrock-config' as bedrock;

.c-hero-title {
  // Inyecta toda la lógica responsive del mapa $font-typeset (y el -ar si aplica)
  @include bedrock.typeset(mi-nuevo-titulo);
}

.c-fluid-title {
  // Inyecta la lógica de escalado elástico
  @include bedrock.elasticTypeset(titulo-fluido);
}
```
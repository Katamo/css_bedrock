#!/usr/bin/env node

// =============================================================================
// bedrock-init
// =============================================================================
// Genera un archivo de configuración de Bedrock en el proyecto consumidor.
//
// USO
//   npx bedrock-init                          → crea src/styles/bedrock-config.scss
//   npx bedrock-init src/scss/config.scss     → ruta personalizada
//   npx bedrock-init --force                  → sobreescribe si ya existe
//
// El archivo generado contiene todos los tokens configurables con sus valores
// por defecto documentados, listos para editar.
// =============================================================================

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Argumentos
// ---------------------------------------------------------------------------
const args        = process.argv.slice(2);
const forceFlag   = args.includes('--force');
const pathArg     = args.find(a => !a.startsWith('--'));
const outputPath  = path.resolve(process.cwd(), pathArg || path.join('src', 'styles', 'bedrock-config.scss'));

// ---------------------------------------------------------------------------
// Plantilla embebida
// ---------------------------------------------------------------------------
const TEMPLATE = `// =============================================================================
// BEDROCK — ARCHIVO DE CONFIGURACIÓN
// =============================================================================
// Este archivo fue generado por \`bedrock-init\`.
//
// Aquí defines los tokens de diseño (colores, tipografía, espaciado…) que
// Bedrock usará en todo tu proyecto. Modifica solo los valores que necesites.
//
// USO
//   Este archivo actúa como puente: configura Bedrock y re-expone sus
//   herramientas hacia el resto del proyecto. Impórtalo en lugar de importar
//   '@bedrock/core' directamente:
//
//     @use 'bedrock-config' as *;
//
//   Luego importa los componentes que necesites en tu entry point principal:
//
//     @use '@bedrock/core/reset';
//     @use '@bedrock/core/wrapper';
//     @use '@bedrock/core/grid';
//     @use '@bedrock/core/cell';
//
// DOCUMENTACIÓN
//   node_modules/@bedrock/core/docs/02-consumption.md   →  Cómo importar y usar Bedrock
//   node_modules/@bedrock/core/docs/03-configuration.md →  Descripción completa de todas las variables
//   node_modules/@bedrock/core/docs/04-tools.md         →  Referencia de funciones y mixins
// =============================================================================

@forward '@bedrock/core' with (


  // ===========================================================================
  // ESPACIADO
  // ===========================================================================
  // Unidad base para la función spacing(). Todos los espaciados del proyecto
  // son múltiplos de esta unidad.
  //
  //   spacing(1)  →   8px
  //   spacing(4)  →  32px
  //   spacing(10) →  80px
  //
  $spacing-base: 8px,


  // ===========================================================================
  // TIPOGRAFÍA — BASE
  // ===========================================================================

  // Tamaño de fuente base del navegador. Usado por pxToRem().
  // Debe coincidir con el font-size que pongas en <html>.
  $rem-base: 16px,

  // Aplica -webkit-font-smoothing: antialiased por encima de este ancho.
  // Útil para pantallas de alta densidad con fuentes ligeras.
  // false = desactivado globalmente.
  $font-aliasing-threshold: false,

  // Familias tipográficas del proyecto.
  // Acceso en SCSS: font(base)  /  font(heading)
  // Añade más claves si necesitas variantes adicionales (mono, display…).
  $font-family: (
    base:    ('Your Body Font', system-ui, sans-serif),
    heading: ('Your Heading Font', system-ui, sans-serif),
  ),

  // Pesos tipográficos nombrados.
  // Acceso en SCSS: weight(bold)  /  weight(regular)
  $font-weight: (
    thin:        100,
    extra-light: 200,
    light:       300,
    regular:     400,
    medium:      500,
    semi-bold:   600,
    bold:        700,
    extra-bold:  800,
    black:       900,
  ),


  // ===========================================================================
  // TIPOGRAFÍA — TYPESETS
  // ===========================================================================
  // Un typeset es una escala tipográfica responsiva con nombre.
  // Se aplica con: @include typeset(nombre)
  //
  // Estructura de cada typeset:
  //
  //   nombre: (
  //     bps: (
  //       xxs: (                           ← estilos base (mobile-first)
  //         font-family:   (...),
  //         font-weight:   700,
  //         font-size:     24px,
  //         line-height:   30px,
  //         letter-spacing: -0.5px,
  //       ),
  //       lg: (                            ← sobreescribe solo lo que cambia
  //         font-size:   36px,
  //         line-height: 42px,
  //       ),
  //     )
  //   )
  //
  // Solo incluye las propiedades que cambien por breakpoint; las del breakpoint
  // anterior siguen vigentes (cascada normal de CSS).
  //
  // Ver: node_modules/@bedrock/core/docs/05-typography.md
  //
  $font-typeset: (
    // Añade tus typesets aquí. Ejemplo:
    //
    // h1: (
    //   bps: (
    //     xxs: ( font-family: ('Your Heading Font', sans-serif), font-weight: 700, font-size: 32px, line-height: 38px ),
    //     lg:  ( font-size: 56px, line-height: 62px ),
    //   )
    // ),
    // body: (
    //   bps: (
    //     xxs: ( font-family: ('Your Body Font', sans-serif), font-weight: 400, font-size: 16px, line-height: 26px ),
    //     lg:  ( font-size: 18px, line-height: 28px ),
    //   )
    // ),
  ),

  // Typesets para idiomas RTL (árabe, hebreo…).
  // Misma estructura que $font-typeset. Déjalo vacío si no necesitas RTL.
  $font-typeset-ar: (),

  // Typesets elásticos: el font-size se interpola fluidamente entre dos breakpoints.
  // Requiere exactamente 2 breakpoints (mínimo y máximo).
  //
  // Estructura:
  //
  //   nombre: (
  //     defaultProps: ( font-family: (...), font-weight: 800 ),
  //     bps: (
  //       xs: ( font-size: 32px, line-height: 36px ),  ← tamaño mínimo (375px)
  //       xl: ( font-size: 96px, line-height: 100px ),  ← tamaño máximo (1280px)
  //     )
  //   )
  //
  $font-typeset-elastic: (),
  $font-typeset-elastic-ar: (),


  // ===========================================================================
  // COLORES
  // ===========================================================================
  // Acceso en SCSS: color(grupo)  /  color(grupo, variante)
  //
  // ⚠️  SASS reemplaza el mapa entero al sobrescribirlo (no hace merge).
  //      Incluye TODOS los grupos de color que uses en tu proyecto.
  //
  // Estructura:
  //
  //   nombre: (
  //     base:    #hex,   ← variante por defecto (color(nombre) la devuelve)
  //     variante: #hex,
  //   )
  //
  $colors: (

    // ── Neutros universales ─────────────────────────────────────────────────
    white: ( base: #ffffff ),
    black: ( base: #000000 ),
    greys: (
      base:    #999999,
      light:   #e6e6e6,
      lighter: #f0f0f0,
      dark:    #666666,
    ),

    // ── Marca (reemplaza con los colores de tu proyecto) ────────────────────
    primary: (
      base: #007bff,     // ← color principal de marca
      // light: #66b2ff,
      // dark:  #0056b3,
    ),
    // secondary: (
    //   base: #6c757d,
    // ),

    // ── Semántica de UI ─────────────────────────────────────────────────────
    line: (
      base: #e6e6e6,
      dark: #cccccc,
    ),
    text: (
      base:     #333333,
      muted:    #666666,
      inverted: #ffffff,
    ),

    // ── Feedback ────────────────────────────────────────────────────────────
    error:   ( base: #dc3545 ),
    success: ( base: #28a745 ),
    warning: ( base: #ffc107 ),

  ),


  // ===========================================================================
  // BREAKPOINTS
  // ===========================================================================
  // Usados por bpFrom($bp) y eachBp(). Estrategia mobile-first (min-width).
  // xxs (0) = estilos base — no genera media query.
  //
  $breakpoints: (
    xxs:  0,
    xs:   375px,
    sm:   480px,
    md:   768px,
    lg:   1024px,
    xl:   1280px,
    xxl:  1440px,
    xxxl: 1920px,
  ),


  // ===========================================================================
  // ANIMACIONES
  // ===========================================================================

  // Duraciones nombradas para el mixin transition() y la función speed().
  $transition-times: (
    fast: 200ms,
    base: 400ms,
    slow: 800ms,
  ),

  // Curvas Bézier agrupadas por familia y dirección.
  // Acceso: curve(ease, out)  /  curve(quad, in-out)
  $transition-curves: (
    linear: (
      base:   cubic-bezier(.25,  .25,  .75,   .75),
    ),
    ease: (
      base:   cubic-bezier(.25,  .1,   .25,   1),
      in:     cubic-bezier(.42,  0,    1,     1),
      out:    cubic-bezier(0,    0,    .58,   1),
      in-out: cubic-bezier(.42,  0,    .58,   1),
    ),
    quad: (
      in:     cubic-bezier(.55,  .085, .68,   .53),
      out:    cubic-bezier(.25,  .46,  .45,   .94),
      in-out: cubic-bezier(.455, .03,  .515,  .955),
    ),
  ),


  // ===========================================================================
  // CAPAS Z-INDEX
  // ===========================================================================
  // Centraliza todos los z-index del proyecto para evitar conflictos.
  // Acceso: z-layer(header)
  //
  // Añade capas específicas de tu proyecto (ej: cookies, chat, onboarding…).
  //
  $z-layers: (
    dropdown: 50,
    sticky:   100,
    header:   200,
    backdrop: 300,
    modal:    400,
    tooltip:  500,
  ),


  // ===========================================================================
  // GRID
  // ===========================================================================

  // Número total de columnas del sistema de cuadrícula.
  // Usado por span() y offset().
  $grid-cells: 12,

  // Margen inferior por defecto de los contenedores b-grid (0 = ninguno).
  $grid-margin-bottom: 0,

  // Separación entre columnas (gutters) por breakpoint.
  // ⚠️  No puedes usar spacing() aquí — usa valores estáticos en px.
  $grid-gutters: (
    default: (
      xxs: 16px,
      md:  24px,
      lg:  32px,
    ),
  ),


);

// Reset CSS conectado a los tokens de Bedrock.
// Elimínalo si tu proyecto ya tiene su propio reset.
@use '@bedrock/core/reset';

// ===========================================================================
// WRAPPERS — llama a setup-wrappers() en tu entry point principal
// ===========================================================================
// Las funciones spacing(), color(), font()... no están disponibles dentro del
// bloque @forward ... with (...) de arriba. Por eso la configuración de
// wrappers se hace fuera, en tu archivo de entrada (ej: main.scss), donde
// todas las funciones ya están disponibles:
//
//   @use 'bedrock-config' as *;
//
//   @include setup-wrappers((
//     default: (
//       xxs: ( max-width: 1200px, padding-inline: spacing(4) ),
//       lg:  ( padding-inline: spacing(8) ),
//     ),
//     full: (
//       xxs: ( padding: 0 ),
//     ),
//   ));
`;

// ---------------------------------------------------------------------------
// Comprobar si el destino ya existe
// ---------------------------------------------------------------------------
if (fs.existsSync(outputPath) && !forceFlag) {
  console.warn('');
  console.warn('  ⚠  El archivo ya existe:');
  console.warn('     ' + outputPath);
  console.warn('');
  console.warn('     Usa --force para sobreescribirlo.');
  console.warn('');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Crear directorio destino si no existe y escribir la plantilla
// ---------------------------------------------------------------------------
try {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, TEMPLATE, 'utf8');
} catch (err) {
  console.error('');
  console.error('  ✗  Error al crear el archivo:');
  console.error('     ' + err.message);
  console.error('');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Resultado e instrucciones
// ---------------------------------------------------------------------------
const relativePath = path.relative(process.cwd(), outputPath).replace(/\\/g, '/');

console.log('');
console.log('  ✔  Archivo creado: ' + relativePath);
console.log('');
console.log('  Próximos pasos:');
console.log('');
console.log('  1. Edita el archivo y ajusta los tokens a tu proyecto');
console.log('     (colores, tipografía, espaciado, breakpoints…)');
console.log('');
console.log('  2. Impórtalo en tu SCSS como punto de entrada de Bedrock:');
console.log('');
console.log('       @use \'bedrock-config\' as *;');
console.log('');
console.log('  3. Importa los componentes que necesites en tu entry point principal:');
console.log('');
console.log('       @use \'@bedrock/core/reset\';');
console.log('       @use \'@bedrock/core/wrapper\';');
console.log('       @use \'@bedrock/core/grid\';');
console.log('       @use \'@bedrock/core/cell\';');
console.log('');
console.log('  Documentación: node_modules/@bedrock/core/docs/');
console.log('');

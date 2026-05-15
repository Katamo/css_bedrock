# Configuración Inicial y Sobrescritura

Bedrock viene preconfigurado con una serie de **tokens por defecto** (colores, espaciados, tipografías). Sin embargo, está diseñado para que el proyecto consumidor pueda adaptarlos a sus necesidades usando la regla `with` de SASS.

## El Patrón del Archivo de Configuración

Para mantener tu proyecto limpio y evitar problemas de inicialización, **la mejor práctica es crear un archivo dedicado de configuración** en tu proyecto (por ejemplo, `src/styles/_bedrock-config.scss`).

Este archivo actuará como un "puente": configurará Bedrock y lo re-exportará al resto de tu código usando `@forward`.

### Ejemplo de `_bedrock-config.scss`

Crea este archivo en tu proyecto y modifica solo los valores que necesites cambiar:

```scss
// _bedrock-config.scss

@forward '@bedrock/core' with (
  // ==========================================
  // 1. ESPACIADO
  // ==========================================
  $spacing-base: 8px,

  // ==========================================
  // 2. TIPOGRAFÍA
  // ==========================================
  $rem-base: 16px,
  $font-aliasing-threshold: false,

  // ==========================================
  // 3. GRID Y LAYOUT
  // ==========================================
  $grid-cells: 12

  // ==========================================
  // 4. COLORES (Sobrescritura de mapas)
  // ==========================================
  $colors: (
     light: ( base: #ffffff ),
     dark: ( base: #000000 ),
     greys: ( base: #999999, light: #e6e6e6, lighter: #f0f0f0, dark: #666666 ),
     primary: ( base: #ff5500 ), // <--- Ejemplo: cambiamos el color de marca
     line: ( base: #e6e6e6, dark: #cccccc ),
     text: ( base: #333333, muted: #666666, inverted: #ffffff ),
     error: ( base: #dc3545 ),
     success: ( base: #28a745 ),
     warning: ( base: #ffc107 )
  )
);
```

### Colores de marca y el mapa `$colors`

Bedrock **no incluye ningún color de marca por defecto** (`primary`, `secondary`…). Si usas `color(primary, base)` en tu SCSS sin haberlo definido, el compilador lanzará un error claro:

```
Error: "Unknown primary color"
```

Para resolverlo, define `$colors` en tu archivo de configuración incluyendo todos los grupos que tu proyecto vaya a usar:

```scss
// _bedrock-config.scss
@forward '@bedrock/core' with (
  $colors: (
    // Neutros (incluye los que uses)
    light:   ( base: #ffffff ),
    dark:   ( base: #000000 ),
    greys:   ( base: #999999, light: #e6e6e6, lighter: #f0f0f0, dark: #666666 ),

    // Marca del proyecto
    primary: ( base: #7878ff ),

    // Semántica de UI
    line:    ( base: #e6e6e6, dark: #cccccc ),
    text:    ( base: #333333, muted: #666666, inverted: #ffffff ),

    // Feedback
    error:   ( base: #dc3545 ),
    success: ( base: #28a745 ),
    warning: ( base: #ffc107 ),
  ),
);
```

> **⚠️ SASS reemplaza el mapa entero al sobrescribirlo, no hace merge.**
> Si defines `$colors` con solo `primary`, los grupos `white`, `black`, `greys`… dejan de existir y cualquier llamada a `color(white)` fallará.
> Incluye siempre todos los grupos de color que tu proyecto vaya a usar.

**Consejo:** ejecuta `bedrock-init` para generar un archivo de configuración completo con todos los grupos ya incluidos y listos para editar. Ver [Instalación](installation.md).

---

## Uso de la configuración en tu proyecto

Una vez creado tu archivo puente, **nunca más importarás `@bedrock/core` directamente** en tus archivos de estilos. En su lugar, importarás tu propio archivo de configuración.

```scss
// En cualquier archivo de tu proyecto (ej. main.scss)
@use 'bedrock-config' as bedrock;

.c-hero {
  // Bedrock ya utilizará las variables que definiste en tu puente
  margin-bottom: bedrock.spacing(5);
}
```

### ¿Por qué usar `@forward` en lugar de `@use` en el archivo de configuración?

Si usaras `@use` en tu `_bedrock-config.scss`, la configuración se aplicaría, pero las herramientas (como `spacing()`) se quedarían "atrapadas" en ese archivo y no podrías usarlas en `main.scss`. 
Al usar `@forward`, configuras el framework y a la vez permites que sus herramientas "pasen a través" hacia el archivo que importe tu configuración.
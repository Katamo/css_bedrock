# Bedrock

**[Documentación →](https://katamo.github.io/css_bedrock/)**

> [!WARNING]
> **Este framework está en desarrollo activo y no debe usarse en producción.**
> La API, los nombres de mixins, la estructura de archivos y los contratos de componentes pueden cambiar sin previo aviso entre versiones. Úsalo únicamente en entornos de experimentación o proyectos propios donde controles las actualizaciones.
> Contacta conmigo para cualquier sugerencia o duda sobre el funcionamiento de este framework.

Framework SASS modular para la construcción de sistemas de diseño. Proporciona herramientas (funciones y mixins), tokens (variables) y primitivas de layout **sin emitir CSS por defecto**, dando control total al proyecto que lo consume.

Diseñado para importarse como dependencia de desarrollo en cualquier proyecto frontend moderno (Vue, React, Nuxt, Astro…).

---

## Características

- **Sin CSS por defecto** — no contamina el proyecto consumidor. Solo genera estilos cuando tú lo decides.
- **Tokens configurables** — colores, tipografía, espaciado, breakpoints y más, sobrescribibles desde un único archivo puente.
- **Arquitectura CM** — metodología de dos capas (Components → Modules) para estructurar proyectos UI de forma escalable.
- **Mobile-first** — sistema de breakpoints y grid responsive desde el principio.
- **Dart SASS moderno** — usa `@use` y `@forward`. Compatible con la API `modern-compiler` de Vite/Webpack.
- **Sin dependencias de runtime** — es SASS puro, funciona con cualquier bundler.

---

## Inicio rápido

### 1. Instalar

```bash
npm install --save-dev @bedrock/core
```

Para trabajar en local con el código fuente del framework, consulta [Enlace local](https://katamo.github.io/css_bedrock/guide/installation).

### 2. Generar el archivo de configuración

Desde la raíz de tu proyecto consumidor:

```bash
npx bedrock-init
```

Crea `src/styles/bedrock-config.scss` con todos los tokens documentados y listos para editar.

### 3. Configurar tus tokens

Edita el archivo generado y define los valores de tu proyecto:

```scss
// src/styles/bedrock-config.scss
@forward '@bedrock/core' with (
  $spacing-base: 8px,

  $colors: (
    white:   ( base: #ffffff ),
    black:   ( base: #000000 ),
    primary: ( base: #your-brand-color ),
    // ...
  ),
);
```

Luego en tu archivo de entrada, donde `spacing()` y el resto de funciones ya están disponibles:

```scss
// main.scss
@use 'bedrock-config' as *;

@include setup-wrappers((
  default: (
    xxs: ( padding-inline: spacing(2) ),
    lg:  ( padding-inline: spacing(4) ),
  ),
));
```

### 4. Importar en tu proyecto

```scss
// main.scss
@use 'bedrock-config' as *;         // herramientas + tokens configurados

@use '@bedrock/core/reset';         // CSS reset (opcional)
```

### 5. Usar las herramientas

```scss
.c-button {
  padding: spacing(2) spacing(4);
  background-color: color(primary);
  font-family: font(base);

  @include bpFrom(md) {
    padding: spacing(3) spacing(6);
  }

  @include hover {
    background-color: color(primary, dark);
  }

  @include attr(type, ghost) {
    background-color: transparent;
    border: 1px solid color(primary);
  }
}
```

---

## Arquitectura CM

Bedrock propone estructurar el proyecto consumidor en dos capas:

```
Components  →  unidades de UI            .c-button, .c-tag, .c-menu…
Modules     →  bloques de página         .m-hero, .m-footer…
```

Todas las capas importan solo `bedrock-config` para acceder a las herramientas. Bedrock proporciona los componentes base de layout; Components y Modules los construye el proyecto consumidor.

---

## Documentación

| Guía | Descripción |
|------|-------------|
| [Instalación](https://katamo.github.io/css_bedrock/guide/installation) | npm install, enlace local, `bedrock-init` |
| [Consumo e importación](https://katamo.github.io/css_bedrock/guide/consumption) | Cómo importar y el patrón de archivo puente |
| [Configuración](https://katamo.github.io/css_bedrock/guide/configuration) | Tokens configurables, colores, tipografía, grid… |
| [Herramientas — Referencia completa](https://katamo.github.io/css_bedrock/guide/tools) | Todas las funciones y mixins con ejemplos |
| [Tipografía y Typesets](https://katamo.github.io/css_bedrock/guide/typography) | Sistema de escalas tipográficas responsive |
| [Layout y Grid](https://katamo.github.io/css_bedrock/guide/layout) | Wrappers, columnas, z-index |
| [Componentes](https://katamo.github.io/css_bedrock/components/) | Catálogo de componentes de Bedrock (Wrapper, Grid Layout, etc.) |


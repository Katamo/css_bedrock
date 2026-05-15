# Instalación y Enlace Local

Bedrock está diseñado para ser consumido como una dependencia externa en proyectos frontend modernos (Vue, React, Nuxt, Astro, etc.) a través del gestor de paquetes.

## Instalación Estándar (NPM / PNPM)

*(Próximamente, una vez publicado en un registro privado o público)*

Bedrock es SASS puro — no tiene código de runtime. Instálalo siempre como **devDependency**:

```bash
npm install --save-dev @bedrock/core
# o
pnpm add -D @bedrock/core
```

> **¿Por qué `devDependencies`?** Bedrock solo se usa en tiempo de compilación. El resultado final es CSS estático; el framework no llega al bundle ni al navegador. Igual que `sass` o `postcss`.

## Enlace Local (Entorno de Desarrollo)

Para trabajar simultáneamente en el código del framework (Bedrock) y probarlo en un proyecto frontend (Proyecto Consumidor) sin necesidad de publicarlo, utilizaremos el sistema de enlaces (`link`).

### Paso 1: Registrar Bedrock
Abre una terminal en la raíz del proyecto **Bedrock** y regístralo de forma global en tu máquina:

```bash
# Si usas npm
npm link

# Si usas pnpm
pnpm link --global
```

### Paso 2: Conectar el Proyecto Consumidor
Ve a la carpeta de tu **proyecto frontend** y enlaza la dependencia:

```bash
npm link @bedrock/core
# o con pnpm: pnpm link --global @bedrock/core
```

---

## Inicialización del Proyecto Consumidor

Una vez instalado Bedrock (por enlace local o desde un registro), ejecuta el comando de inicialización en la raíz de tu proyecto consumidor para generar el archivo de configuración:

```bash
npx bedrock-init
```

Esto crea el archivo `src/styles/bedrock-config.scss` con todos los tokens configurables documentados y listos para editar.

### Ruta personalizada

Si tu proyecto usa una estructura de carpetas diferente, puedes indicar la ruta de destino:

```bash
npx bedrock-init src/scss/config.scss
```

### Sobreescribir un archivo existente

Por defecto el script no sobreescribe si el archivo ya existe. Usa `--force` para forzarlo:

```bash
npx bedrock-init --force
```

> **Nota:** `bedrock-init` solo necesitas ejecutarlo **una vez** al arrancar el proyecto. El archivo generado pasa a ser tuyo: lo editas, lo versionas y evoluciona con el proyecto.

### Próximos pasos tras el init

El propio script te indica qué hacer, pero en resumen:

1. Edita `bedrock-config.scss` y ajusta los tokens a tu proyecto (colores de marca, tipografía, breakpoints…)
2. Impórtalo como punto de entrada de Bedrock en tu SCSS principal:

```scss
// main.scss
@use 'bedrock-config' as *;

// Componentes (emiten CSS): importa solo los que uses
@use '@bedrock/core/reset';
@use '@bedrock/core/wrapper';
@use '@bedrock/core/grid';
@use '@bedrock/core/cell';
```

Consulta la [Guía de Configuración](configuration.md) para una descripción detallada de cada variable.

---

## Configuración del Bundler

Bedrock usa la API moderna de Dart SASS (`@use`, `@forward`). Para que compile sin warnings y con hot reload es necesario ajustar la configuración del bundler.

### Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // Activa la API moderna de Sass. Evita los deprecation warnings
        // de la API legacy en Vite 5+.
        api: 'modern-compiler',
      }
    }
  },
})
```

#### Hot reload al desarrollar en local (npm link / file:)

Si estás modificando Bedrock y el proyecto consumidor al mismo tiempo (enlace local), Vite ignora los cambios en `node_modules` por defecto. Añade esto para que recargue automáticamente al guardar en Bedrock:

```js
server: {
  watch: {
    ignored: ['!**/node_modules/@bedrock/**']
  }
}
```

#### Config completa de referencia

```js
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  },
  server: {
    // Solo necesario en desarrollo local con npm link o file:
    watch: {
      ignored: ['!**/node_modules/@bedrock/**']
    }
  },
})
```

### Webpack / Vue CLI

```js
// vue.config.js o webpack.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Asegúrate de usar sass-loader >= 13 con Dart Sass
        sassOptions: {
          // No se necesita configuración adicional para Bedrock,
          // ya que usa @use/@forward estándar.
        }
      }
    }
  }
}
```

> **Nota:** Bedrock requiere **Dart Sass** (`sass` en npm). No es compatible con `node-sass` (LibSass), que está oficialmente abandonado desde 2022.

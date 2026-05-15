# Consumo e Importación

Bedrock utiliza el moderno sistema de módulos de SASS (`@use` y `@forward`). Ya no existe un "ámbito global"; todo debe importarse explícitamente donde se necesite.

## Importación Básica (Solo Herramientas)

Al importar el paquete principal de Bedrock, **no se compilará ni se emitirá ningún CSS** en tu proyecto. Solo estarás inyectando en memoria las funciones, mixins y variables del sistema.

Para utilizar Bedrock en un archivo SASS de tu proyecto tienes dos formas de importarlo, dependiendo de si quieres mantener un namespace explícito o no.

### Sin namespace — `as *` (recomendado)

Todas las herramientas quedan disponibles directamente, sin prefijo. Es la forma más cómoda cuando Bedrock es la única librería de utilidades del proyecto.

```scss
@use 'bedrock-config' as *;

.mi-componente {
  padding: spacing(3);
  z-index: z-layer(header);

  @include bpFrom(md) {
    padding: spacing(6);
  }
}
```

### Con namespace — `as bedrock`

Todas las llamadas se prefijan con `bedrock.`. Útil cuando conviven varias librerías SASS y quieres evitar colisiones de nombres.

```scss
@use 'bedrock-config' as bedrock;

.mi-componente {
  padding: bedrock.spacing(3);
  z-index: bedrock.z-layer(header);

  @include bedrock.bpFrom(md) {
    padding: bedrock.spacing(6);
  }
}
```

El namespace puede ser cualquier nombre, no necesariamente `bedrock`.

## Sobre la emisión de CSS

*(Nota: Bedrock está diseñado principalmente como un framework de utilidades y tokens. La creación de estilos de interfaz concretos la realizarás en tu propio proyecto, aplicando la arquitectura CM documentada en la Guía de Arquitectura).*

Para saber cómo modificar los valores por defecto del framework (como el valor de `spacing()`), consulta la guía de Configuración Inicial.
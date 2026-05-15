# Consumo e Importación

Bedrock utiliza el moderno sistema de módulos de SASS (`@use` y `@forward`). Ya no existe un "ámbito global"; todo debe importarse explícitamente donde se necesite.

## Importación Básica (Solo Herramientas)

Al importar el paquete principal de Bedrock, **no se compilará ni se emitirá ningún CSS** en tu proyecto. Solo estarás inyectando en memoria las funciones, mixins y variables del sistema.

Para utilizar Bedrock en un archivo SASS de tu proyecto, expón el framework usando un alias (por convención, usamos `as bedrock` o `as *`):

```scss
// Importamos el framework
@use '@bedrock/core' as bedrock;
@use 'sass:map';

.mi-componente {
  // Usamos una función de utilidad (ej. spacing)
  padding: bedrock.spacing(3); // Resulta en 24px (3 * 8px)
  
  // Accedemos al z-index usando la función de utilidad...
  z-index: bedrock.z-layer(header);

  // ...o accediendo directamente al mapa de variables
  z-index: map.get(bedrock.$z-layers, header);
}
```

## Sobre la emisión de CSS

*(Nota: Bedrock está diseñado principalmente como un framework de utilidades y tokens. La creación de estilos de interfaz concretos la realizarás en tu propio proyecto, aplicando la arquitectura BCM documentada en la Guía de Arquitectura).*

Para saber cómo modificar los valores por defecto del framework (como el valor de `spacing()`), consulta la guía de Configuración Inicial.
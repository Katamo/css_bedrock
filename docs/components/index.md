# Componentes

Esta sección documenta los componentes de Bedrock. Proporcionan estructura y comportamiento base para cualquier proyecto que consuma el framework.

Los componentes de Bedrock están diseñados para ser:
- **Nativos y Eficientes:** Integraciones específicas para frameworks (como Vue 3) que evitan los problemas de los Custom Elements.
- **Transparentes:** Permiten que el CSS global y los mixins de Bedrock funcionen en su interior sin Shadow DOM.
- **Basados en Mixins:** La lógica de estilo siempre reside en SASS, permitiendo usarlos con o sin componentes.

## Listado de componentes

| Componente | Descripción |
|------------|-------------|
| [Grid Layout](grid-layout.md) | Integración para layouts declarativos basados en áreas de CSS Grid. |
| [Wrapper](wrapper.md) | Contenedor con padding responsivo y centrado automático. |
| [Button](button.md) | Botón/enlace sin estilos, listo para estilizar con SASS. |
| [Clickable Area](clickable-area.md) | Convierte cualquier elemento en accionable con accesibilidad de teclado. |
| [Link](link.md) | Enlace de texto sin estilos, con estructura `.text` lista para estilizar con SASS. |
| [Menu](menu.md) | Menú de navegación semántico con estructura `nav > ul.links`, contenido por slots. |
| [Badge](badge.md) | Etiqueta de estado o categoría con contenido por slot. |
| [Field](field.md) | Contenedor de campo de formulario con label, descripción y mensaje de error. |
| [Input](input.md) | Campo de texto nativo con soporte para tipos, estados y accesibilidad. |
| [Checkbox](checkbox.md) | Checkbox nativo accesible con label integrado. |
| [Pagination](pagination.md) | Navegación por páginas con control de página actual y total. |
| [Image](image.md) | Imagen responsiva con soporte para aspect ratio y carga lazy. |
| [Logo](logo.md) | Logotipo con imagen y slot opcional para texto o tagline. |

---

## Cómo usar los componentes

Para usar cualquier componente de Bedrock en tu proyecto, generalmente necesitas:

1. **JS/Vue:** Importar el componente desde la integración correspondiente (ej: `@bedrock/core/vue`).
2. **SCSS:** Asegurarte de que los mixins necesarios están disponibles en tu proyecto (importando `@bedrock/core`).

Consulta la guía específica de cada componente para ver ejemplos detallados de implementación.

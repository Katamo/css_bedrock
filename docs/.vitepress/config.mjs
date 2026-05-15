import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Bedrock',
  description: 'Framework CSS/SASS modular para Vue 3',
  base: '/css_bedrock/',

  themeConfig: {
    nav: [
      { text: 'Guía',        link: '/guide/installation' },
      { text: 'Componentes', link: '/components/' },
      { text: 'Prácticas',   link: '/guides/' },
      { text: 'Changelog',   link: '/changelog' },
      {
        text: 'GitHub',
        link: 'https://github.com/Katamo/css_bedrock',
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guía',
          items: [
            { text: 'Instalación',    link: '/guide/installation' },
            { text: 'Consumo',        link: '/guide/consumption' },
            { text: 'Configuración',  link: '/guide/configuration' },
            { text: 'Herramientas',   link: '/guide/tools' },
            { text: 'Tipografía',     link: '/guide/typography' },
            { text: 'Layout',         link: '/guide/layout' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Componentes',
          items: [
            { text: 'Visión general', link: '/components/' },
            { text: 'Grid Layout',    link: '/components/grid-layout' },
            { text: 'Wrapper',        link: '/components/wrapper' },
            { text: 'Button',         link: '/components/button' },
            { text: 'Clickable Area', link: '/components/clickable-area' },
            { text: 'Link',           link: '/components/link' },
            { text: 'Menu',           link: '/components/menu' },
            { text: 'Badge',          link: '/components/badge' },
            { text: 'Field',          link: '/components/field' },
            { text: 'Input',          link: '/components/input' },
            { text: 'Checkbox',       link: '/components/checkbox' },
            { text: 'Pagination',     link: '/components/pagination' },
            { text: 'Image',          link: '/components/image' },
            { text: 'Logo',           link: '/components/logo' },
          ],
        },
      ],
      '/guides/': [
        {
          text: 'Buenas prácticas',
          items: [
            { text: 'Introducción',         link: '/guides/' },
            { text: 'Encapsulación',        link: '/guides/encapsulacion' },
            { text: 'Propiedades lógicas',  link: '/guides/propiedades-logicas' },
            { text: 'Tipografía',           link: '/guides/tipografia' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Katamo/css_bedrock' },
    ],

    footer: {
      message: 'Publicado bajo licencia MIT.',
    },

    search: {
      provider: 'local',
    },
  },
});

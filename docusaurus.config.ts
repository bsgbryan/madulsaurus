import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

import dark from "./src/theme/dark"
import light from "./src/theme/light"

const config: Config = {
  title: 'Mädūl',
  tagline: 'The fun way to do functional programming in TypeScript',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://madulsaurus.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bsgbryan', // Usually your GitHub org/user name.
  projectName: 'madulsaurus.github.io', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        // blog: {
        //   showReadingTime: true,
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Mädūl',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/bsgbryan/madul',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{
            label: 'Star Map',
            to: '/docs/star-map',
          }, {
            label: 'Padawan',
            to: '/docs/padawan',
          }, {
            label: 'Jedi',
            to: '/docs/jedi',
          }, {
            label: 'Jedi Master',
            to: '/docs/jedi-master',
          },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/bsgbryan/madul',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bryan Maynard. Built with Docusaurus.`,
    },
    prism: {
      theme: light,
      darkTheme: dark,
      additionalLanguages: ['json', 'bash'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: ['docusaurus-plugin-sass'],
}

export default config

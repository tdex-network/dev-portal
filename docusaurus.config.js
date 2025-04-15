/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'TDEX Network',
  tagline: 'Trading Unleashed',
  url: 'https://dev.tdex.network',
  baseUrl: '/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'tdex-network', // Usually your GitHub org/user name.
  projectName: 'dev-portal', // Usually your repo name.
  themeConfig: {
    image: 'img/tdex-og-image.png',
    colorMode: {
      defaultMode: 'dark',
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Developer Portal',
      logo: {
        alt: 'TDEX logo',
        src: 'img/tdex-logo.png',
        srcDark: 'img/tdex-logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/tdex-network',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'DOCS',
          items: [
            {
              label: 'Specifications',
              to: '/docs/latest/specs/index',
            },
            {
              label: 'Trader',
              to: '/docs/latest/trader/intro',
            },
            {
              label: 'Liquidity Provider',
              to: '/docs/latest/provider/intro',
            },
          ],
        },
        {
          title: 'COMMUNITY',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/tdexnetwork',
            },
          ],
        },
        {
          title: 'MORE',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/tdex-network',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TDEX Network. Built with Docusaurus.`,
    },
  },
  plugins: ['docusaurus-plugin-sass'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/tdex-network/dev-portal/edit/master/',
            lastVersion: 'current',
            versions: {
              current: {
                label: 'latest',
                path: 'latest',
                banner: 'none',
              },
              '0.9.1': {
                label: '0.9.1',
                path: 'v0',
                banner: 'unmaintained',
              },
              '1.0.0': {
                label: '1.0.0',
                path: 'v1',
                banner: 'none',
              },
            },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/tdex-network/dev-portal/edit/master/blog/',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
};

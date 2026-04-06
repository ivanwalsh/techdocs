// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ivan Walsh',
  tagline: 'AI-Ready Technical Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://ivanwalsh.com',
  baseUrl: '/',

  projectName: 'techdocs', // GitHub repo

  onBrokenLinks: 'throw', // Fail the build if any internal link is broken
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // This makes `intro.md` the homepage
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Ivan Walsh',
      logo: {
        alt: 'Ivan Walsh Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro', // Ensure this matches `intro.md`
          position: 'left',
          label: 'Home',
        },
        { to: '/blog', label: 'Articles', position: 'left' },
		 // ADD YOUR TAG LINKS HERE - Option 1: Dropdown
		{
		  type: 'dropdown',
		  label: 'Topics',
		  position: 'left',
		  items: [
			{
			  label: 'Agile',
			  to: '/blog/tags/agile',
			},
			{
			  label: 'AI',
			  to: '/blog/tags/ai',
			},
			{
			  label: 'API Documentation',
			  to: '/tutorial-basics/api',
			},
			{
			  label: 'FinTech',
			  to: '/blog/tags/fintech',
			},
			{
			  label: 'MCP',
			  to: '/blog/tags/mcp',
			},
			{
			  label: 'Publishing',
			  to: '/blog/tags/publishing',
			},
			{
			  label: 'Technical Writing',
			  to: '/blog/tags/technical-writing',
			},
		  ],
		},			
        { to: '/Ivan', label: 'About Ivan', position: 'left' },
        {
          href: '/llm.txt',
          label: 'LLM.txt',
          position: 'right',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          href: 'https://github.com/ivanwalsh',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start Here',
          items: [
            {
              label: 'Introduction',
              to: '/', // This replaces /docs/intro
            },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivanwalsh/' },
            { label: 'X', href: 'https://x.com/ivanwalsh' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/ivanwalsh' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ivan Walsh, Technical Writer. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
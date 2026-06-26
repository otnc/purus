import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';
import rehypeExternalLinks from 'rehype-external-links';

const purusGrammar = JSON.parse(
  readFileSync(new URL('../extension/syntaxes/purus.tmLanguage.json', import.meta.url), 'utf-8')
);
purusGrammar.name = 'purus';



// https://astro.build/config
export default defineConfig({
  site: 'https://purus.work',
  outDir: '../docs',
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  integrations: [
    starlight({
      title: 'Purus',
      customCss: ['./src/styles/custom.css'],
      expressiveCode: {
        shiki: {
          langs: [purusGrammar],
        },
      },
      logo: {
        src: './src/assets/logo.png',
        replacesTitle: true,
      },
      head: [
        {
          tag: /** @type {'meta'} */ ('meta'),
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: /** @type {'meta'} */ ('meta'),
          attrs: { property: 'og:site_name', content: 'Purus' },
        },
        {
          tag: /** @type {'meta'} */ ('meta'),
          attrs: { property: 'og:image', content: 'https://purus.work/img/banner.png' },
        },
        {
          tag: /** @type {'meta'} */ ('meta'),
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: /** @type {'meta'} */ ('meta'),
          attrs: { name: 'twitter:image', content: 'https://purus.work/img/banner.png' },
        },
        {
          tag: /** @type {'script'} */ ('script'),
          content: `document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('a[href^="http"]').forEach(a=>{if(!a.hostname||a.hostname!==location.hostname){a.setAttribute('target','_blank');a.setAttribute('rel','noopener noreferrer')}})})`,
        },
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/otnc/purus' },
        { icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/purus' },
      ],
      editLink: {
        baseUrl: 'https://github.com/otnc/purus/edit/main/pages/',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' },
      },
      sidebar: [
        {
          label: 'Getting Started',
          translations: { ja: 'はじめに' },
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Language Reference',
          translations: { ja: '言語リファレンス' },
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'Standard Library',
          translations: { ja: '標準ライブラリ' },
          autogenerate: { directory: 'stdlib' },
        },
        {
          label: 'Tools',
          translations: { ja: 'ツール' },
          autogenerate: { directory: 'tools' },
        },
        {
          label: 'Community',
          translations: { ja: 'コミュニティ' },
          items: [
            { label: 'Community Projects', translations: { ja: 'コミュニティプロジェクト' }, slug: 'community-projects' },
          ],
        },
        {
          label: 'Resources',
          translations: { ja: 'リソース' },
          items: [
            { label: 'RFC', link: 'https://github.com/otnc/purus/blob/main/RFC.md', attrs: { target: '_blank' } },
            { label: 'Changelog', translations: { ja: '変更履歴' }, link: 'https://github.com/otnc/purus/blob/main/CHANGELOG.md', attrs: { target: '_blank' } },
          ],
        },
      ],
    }),
  ],
});

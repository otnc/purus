import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';
import rehypeExternalLinks from 'rehype-external-links';

const purusGrammar = JSON.parse(
  readFileSync(new URL('../extension/syntaxes/purus.tmLanguage.json', import.meta.url), 'utf-8')
);
purusGrammar.name = 'purus';

// When deployed as old.purus.work (archived v0.x docs via GitHub Pages),
// the GitHub Actions workflow passes vars.archived from otnc/purus repository variables.
const isArchive = process.env.archived === 'true';

const archiveBannerHead = isArchive ? [
  {
    tag: /** @type {'style'} */ ('style'),
    content: `.sl-archive-banner{display:block;width:100%;background:#e6a817;color:#000;text-align:center;padding:.4rem 1rem;font-size:.85rem;font-weight:500;box-sizing:border-box}.sl-archive-banner a{color:#000;text-decoration:underline}`,
  },
  {
    tag: /** @type {'script'} */ ('script'),
    content: `document.addEventListener('DOMContentLoaded',function(){var b=document.createElement('div');b.className='sl-archive-banner';b.innerHTML='This page is an archive of Purus v0.x docs. For the latest, visit <a href="https://purus.work">purus.work</a>. / このページは v0.x ドキュメントのアーカイブです。最新は <a href="https://purus.work">purus.work</a> をご覧ください。';var h=document.querySelector('header.header')||document.querySelector('header');if(h){h.prepend(b)}else{document.body.prepend(b)}})`,
  },
] : [];

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
        ...archiveBannerHead,
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

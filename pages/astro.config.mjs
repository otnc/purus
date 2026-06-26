// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { readFileSync } from 'node:fs';
import rehypeExternalLinks from 'rehype-external-links';

const purusGrammar = JSON.parse(
  readFileSync(new URL('../extension/syntaxes/purus.tmLanguage.json', import.meta.url), 'utf-8')
);
purusGrammar.name = 'purus';

// When deployed as old.purus.work (archived v0.x docs), set ARCHIVE_MODE=true in Vercel env vars
const isArchive = process.env.ARCHIVE_MODE === 'true';

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
      ...(isArchive ? {
        banner: {
          content: 'This page is an archive of Purus v0.x documentation. For the latest, visit <a href="https://purus.work">purus.work</a>. / このページは Purus v0.x ドキュメントのアーカイブです。最新情報は <a href="https://purus.work">purus.work</a> をご覧ください。',
        },
      } : {}),
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
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: 'Purus' },
        },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: 'https://purus.work/img/banner.png' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: 'https://purus.work/img/banner.png' },
        },
        {
          tag: 'script',
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

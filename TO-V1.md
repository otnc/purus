# v1 移行計画

v1.0.0 リリースに際して、モノレポを `puruslang` org に分割する際の移行手順・方針メモ。

---

## リポジトリ構成

### 現在（`otnc/purus` モノレポ、0.x）

```
otnc/purus
├── core/            → コンパイラ本体
├── examples/        → サンプルコード
├── pages/           → ドキュメントサイト
├── linter/
├── prettier-plugin/
└── extension/
```

### v1 以降（`puruslang` org）

#### リポジトリ一覧（全9件）

| リポジトリ | 公開設定 | 状態 | 移行元 |
|---|---|---|---|
| `puruslang/.github` | Public | プロフィールあり | — |
| `puruslang/discussions` | Public | 空 | — |
| `puruslang/playground` | Public | 空 | — |
| `puruslang/purus` | Private | 空 | `core/` + `examples/` |
| `puruslang/docs` | Private | 空 | `pages/` |
| `puruslang/linter` | Public | 空 | `linter/` |
| `puruslang/vscode-extension` | Private | 空 | `extension/` |
| `puruslang/prettier-plugin` | Private | 空 | `prettier-plugin/` |
| `puruslang/assets` | Private | 空 | — |

全リポジトリ作成済み（空）。以下の作業で各リポジトリを充填していく。

`otnc/purus` は 0.x のアーカイブとして残す（アーカイブ済み）。

---

## `puruslang/playground`

Web 上で Purus のバージョンを選択してコードを実行できる REPL/プレイグラウンド。

### 要件

- バージョンセレクター（npm に公開済みの `purus` バージョンを一覧表示・選択できる）
- エディタ（シンタックスハイライト付き Purus コード入力）
- 実行結果の表示（コンパイル後 JS の出力 / 実行結果）
- ブラウザ完結（サーバーサイド実行不要）

### 技術的な検討事項

- コンパイラ（`purus`）のブラウザ向けビルドが必要
  - 現在の `purus` は Node.js CLI のみ。ブラウザ向けに WebAssembly または browser-compatible bundle が必要
  - MoonBit は WebAssembly ターゲットをサポートしているため、WASM ビルドが有力
- バージョン選択 → jsdelivr または npm CDN 経由でその版の WASM/JS を動的ロード

### チェックリスト

- [ ] コンパイラを WASM または browser bundle としてビルドできるか検証
- [ ] バージョン一覧の取得方法（npm registry API: `https://registry.npmjs.org/purus`）
- [ ] エディタ候補: CodeMirror 6（軽量）/ Monaco（VS Code 同等、重め）
- [ ] サイト: Vercel または GitHub Pages でホスト
- [ ] ドメイン: `play.purus.work` など

---

## ドメイン・デプロイ方針

| URL | 内容 |
|---|---|
| `purus.work` | 最新ドキュメント（`puruslang/docs`、**Vercel**）|
| `www.purus.work` | `purus.work` にリダイレクト（Vercel の www リダイレクト機能）|
| `old.purus.work` | 0.x 時代のドキュメント（`otnc/purus` の `pages/`、**GitHub Pages**）|
| `v1.purus.work` | v1 のドキュメント（v2+ が出た時に退避、**Vercel** ブランチデプロイ）|

### バージョン別ドキュメントの管理（`puruslang/docs`）

`puruslang/docs` のブランチ構成で管理する。Vercel の「Git ブランチ」設定でブランチごとにドメインを割り当てる。

```
puruslang/docs
├── main        → purus.work（常に最新）
├── v1          → v1.purus.work（v2+ リリース後に凍結）
├── v2          → v2.purus.work（v3+ リリース後に凍結）
└── ...
```

バージョンアップ時のフロー：
1. `main` を `v1` ブランチとして切り出し → Vercel で `v1.purus.work` に割り当て
2. `main` を v2 ドキュメントに更新 → `purus.work` が自動で v2 を指す
3. 以降同様に繰り返す

Vercel 設定：Settings → Git → Branch deploys でブランチ名とドメインを紐付け。

---

## 共有アセット（`puruslang/assets`）

アイコン・SVG ロゴ・バナーなど複数リポジトリから参照するすべての画像リソースを一元管理する。
ディレクトリ構成は自由に決めてよい。

最低限含めるもの：
- アイコン（現在 `extension/icons/` にあるもの）
- ロゴ（現在 `otnc/purus` の `logo.png`、各 README で参照）
- OGP バナー・SNS シェア用画像（現在 `astro.config.mjs` の `og:image` で参照）

各リポジトリの `README.md`、docs からは GitHub raw URL 経由で参照：
```
https://raw.githubusercontent.com/puruslang/assets/main/<path>
```

---

## 各リポジトリの共通整備

すべてのリポジトリに以下を用意する（EN/JA）：

| ファイル | 備考 |
|---|---|
| `README.md` / `README-ja.md` | プロジェクト概要・インストール・使い方（badge 含む） |
| `CHANGELOG.md` / `CHANGELOG-ja.md` | バージョン別変更履歴 |
| `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` | コントリビュート手順 |
| `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` | 行動規範（Contributor Covenant 推奨）|
| `LICENSE` | Apache-2.0 ライセンス本文 |
| `.github/ISSUE_TEMPLATE/` | バグ報告・機能要望テンプレート |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR テンプレート |
| `.github/workflows/` | CI/CD ワークフロー |

### README の badge

各 README の badge は新リポジトリ URL に合わせて更新する。

```md
[![npm](https://img.shields.io/npm/v/purus)](https://www.npmjs.com/package/purus)
[![license](https://img.shields.io/github/license/puruslang/purus)](https://github.com/puruslang/purus/blob/main/LICENSE)
[![CI](https://github.com/puruslang/purus/actions/workflows/ci.yml/badge.svg)](https://github.com/puruslang/purus/actions)
```

各リポジトリの badge テンプレート：

| badge | URL パターン |
|---|---|
| npm version | `https://img.shields.io/npm/v/<package>` |
| license | `https://img.shields.io/github/license/puruslang/<repo>` |
| CI status | `https://github.com/puruslang/<repo>/actions/workflows/ci.yml/badge.svg` |
| VS Code installs | `https://img.shields.io/visual-studio-marketplace/i/puruslang.purus`（extension のみ）|

### `package.json` / `moon.mod.json` の更新

各パッケージの `repository`・`bugs`・`homepage` フィールドを新リポジトリ URL に変更する。

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/puruslang/<repo>"
  },
  "bugs": {
    "url": "https://github.com/puruslang/<repo>/issues"
  },
  "homepage": "https://purus.work"
}
```

`moon.mod.json`（コンパイラ）：

```json
{
  "repository": "https://github.com/puruslang/purus"
}
```

---

## 各リポジトリ対応作業

### `puruslang/purus`

- [ ] `core/` の内容を移行（git history ごと `git filter-repo` 推奨）
- [ ] `examples/` を同リポジトリ内に含める
- [ ] `README.md` / `README-ja.md` を書き直し（badge を `puruslang/purus` 向けに更新）
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を引き継ぎ
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `LICENSE`（Apache-2.0）を配置
- [ ] `package.json` / `moon.mod.json` の `repository`・`bugs`・`homepage` を更新
- [ ] `.github/` 整備（Issue テンプレート・PR テンプレート・Actions）
- [ ] パッケージ名: `purus`（npm）
- [ ] GitHub Actions: テスト・ビルド・npm publish ワークフロー

### `puruslang/docs`

- [ ] `pages/` の内容を移行
- [ ] **`astro.config.mjs` 内のリンクを更新**
  - `social` の GitHub リンク: `otnc/purus` → `puruslang/purus`
  - `editLink.baseUrl`: `https://github.com/otnc/purus/edit/main/pages/` → `https://github.com/puruslang/docs/edit/main/`
  - サイドバー Resources の RFC リンク: `otnc/purus/blob/main/RFC.md` → `puruslang/purus/blob/main/RFC.md`
  - サイドバー Resources の CHANGELOG リンク: `otnc/purus/blob/main/CHANGELOG.md` → `puruslang/purus/blob/main/CHANGELOG.md`
- [ ] **MDX ファイル内の `otnc/purus` 直リンクを一括置換**（`grep -r "otnc/purus" src/` で洗い出し）
- [ ] Vercel プロジェクトを `puruslang/docs` に紐付け直し
- [ ] `purus.work` ドメインを新プロジェクトに付け替え
- [ ] Vercel でブランチごとのドメイン割り当てを設定
- [ ] `old.purus.work` を `otnc/purus` の GitHub Pages に割り当て（カスタムドメイン設定）
  - GitHub Pages は `docs/` フォルダから配信（現行の `outDir: '../docs'` そのまま）
  - トップページ（EN/JA）にアーカイブ通知の Warning を表示（実装済み）
  - `old.purus.work` のカスタムドメインを GitHub Pages に割り当てれば完成
- [ ] アセット参照を `puruslang/assets`（raw.githubusercontent.com）に変更
- [ ] `.github/` 整備（docs 用 Issue テンプレート・Actions）

### `puruslang/linter`

- [ ] `linter/` の内容を移行
- [ ] `README.md` / `README-ja.md` を書き直し（badge を `puruslang/linter` 向けに更新）
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成（0.x → 1.0.0 で引き継ぎ）
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `LICENSE`（Apache-2.0）を配置
- [ ] `package.json` の `repository`・`bugs`・`homepage` を更新
- [ ] `.github/` 整備
- [ ] パッケージ名: `@puruslang/linter`（npm）

### `puruslang/vscode-extension`

- [ ] `extension/` の内容を移行
- [ ] アイコンパスを `puruslang/assets`（raw.githubusercontent.com）参照に変更
- [ ] `README.md` / `README-ja.md` を書き直し（badge を `puruslang/vscode-extension` 向けに更新）
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `LICENSE`（Apache-2.0）を配置
- [ ] `package.json` の `repository`・`bugs`・`homepage` を更新、publisher を `puruslang` に変更
- [ ] `.github/` 整備
- [ ] バージョン: `1.0.0`

### `puruslang/prettier-plugin`

- [ ] `prettier-plugin/` の内容を移行
- [ ] `README.md` / `README-ja.md` を書き直し（badge を `puruslang/prettier-plugin` 向けに更新）
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `LICENSE`（Apache-2.0）を配置
- [ ] `package.json` の `repository`・`bugs`・`homepage` を更新
- [ ] `.github/` 整備
- [ ] パッケージ名: `@puruslang/prettier-plugin-purus`（npm）

### `puruslang/assets`

- [ ] 新規作成
- [ ] `otnc/purus` の各種アイコン・SVG を移行
- [ ] `README.md` に参照方法（raw URL / jsDelivr）を記載

---

## `otnc/purus` アーカイブ後の処置

- [ ] リポジトリを `Archived` に設定（Settings → Archive this repository）
- [ ] `README.md` 冒頭に移行先バナーを追加
  ```md
  > ⚠️ このリポジトリは Purus v0.x のアーカイブです。
  > 最新版は [puruslang/purus](https://github.com/puruslang/purus) を参照してください。
  ```
- [ ] `old.purus.work` のドメインをこのリポジトリの Vercel デプロイに割り当て

---

## Node.js バージョン要件の引き上げ（v22 以上）

v1.0.0 リリース時に Node.js の最低要件を v20 → **v22** に引き上げる。以下のすべての箇所を更新すること。

### `package.json` の `engines` フィールド

| ファイル | 現在 | v1 |
|---|---|---|
| `core/package.json` | `"node": ">=20"` | `"node": ">=22"` |
| `linter/package.json` | 要確認・追加 | `"node": ">=22"` |
| `prettier-plugin/package.json` | 要確認・追加 | `"node": ">=22"` |
| `extension/package.json` | 要確認・追加 | `"node": ">=22"` |

### GitHub Actions ワークフロー（`node-version`）

以下すべての `node-version: "20"` → `"22"` に変更：

- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`
- `.github/workflows/linter-release.yml`
- `.github/workflows/prettier-plugin-release.yml`
- `.github/workflows/extension-release.yml`
- `.github/workflows/docs.yml`

### ドキュメント

| ファイル | 内容 |
|---|---|
| `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` | `>= 20` → `>= 22` |
| `pages/.../getting-started/installation.mdx`（EN/JA） | Node.js v20 の記述を v22 に更新 |
| `CHANGELOG.md` / `CHANGELOG-ja.md` | v1.0.0 エントリに Node.js v22 必須を記載 |

> **Note:** `RFC.md` には Node.js の最低バージョンの明示的な記載はないため更新不要。

---

## 移行タイミング

v1.0.0 の要件が固まり次第、分割作業に入る。それまでは `otnc/purus` モノレポで開発を継続する。

---

## `puruslang/.github` の整備

すでに存在するため、v1 移行に合わせて内容を更新する。

### `profile/README.md` の更新

現在の内容（確認済み）：
```html
<div align="center">
  Write code without the Shift key. Beautiful, simple, and easy-to-use.
  <a href="https://www.purus.work/">
    <img src="https://www.purus.work/img/banner.png" width="600" alt="banner">
  </a>
  <a href="https://github.com/otoneko1102/purus">
    <img src="./images/pin_purus.svg" width="600" alt="Readme Card">
  </a>
</div>
```

更新内容：
- [ ] バナー画像を `puruslang/assets` の raw URL に変更
  - 変更前: `https://www.purus.work/img/banner.png`
  - 変更後: `https://raw.githubusercontent.com/puruslang/assets/main/banner/banner.png`
- [ ] リンク先を `otnc/purus` → `puruslang/purus` に変更
- [ ] Purus について説明を追記（何ができる言語か・特徴）
- [ ] v0.x アーカイブへの案内を追記
  - `otnc/purus` がアーカイブであること
  - ドキュメントは `old.purus.work`
- [ ] 各リポジトリへのリンク一覧を追記（purus・docs・linter・vscode-extension・prettier-plugin・playground）
- [ ] `images/pin_purus.svg` のリンク・デザイン見直し（`otoneko1102` → `puruslang`）

### org デフォルトファイル

- [ ] org デフォルトの Issue テンプレートを追加（各リポジトリで個別設定しない場合のフォールバック）
- [ ] org デフォルトの `CODE_OF_CONDUCT.md` を追加
- [ ] org デフォルトの `CONTRIBUTING.md` を追加
- [ ] org デフォルトの `SECURITY.md` を追加（脆弱性報告先）

---

## Secrets・CI/CD の移行

現在 `otnc/purus` のリポジトリ Secrets として管理しているものを、`puruslang` org の Organization Secrets に昇格させる。

| Secret | 用途 | 移行先 |
|---|---|---|
| `VSCE_PAT` | VS Code Marketplace publish | `puruslang` org secret |
| `NPM_TOKEN` | npm publish（linter・prettier-plugin 等） | `puruslang` org secret |
| その他 CI 用トークン | Vercel deploy token など | `puruslang` org secret または各リポジトリ secret |

手順：
1. `puruslang` org → Settings → Secrets and variables → Actions → New organization secret
2. Access を必要なリポジトリ（`All repositories` または個別選択）に設定
3. 各リポジトリの workflow で `secrets.VSCE_PAT` 等をそのまま参照できる（変更不要）
4. 移行完了後に `otnc/purus` のリポジトリ secrets を削除

---

## 移行の順序

依存関係があるため、以下の順で進める。

1. **`puruslang/assets`** — 他のすべてが参照するため最初に充填
2. **`puruslang/purus`** — コンパイラ本体（他ツールが依存）
3. **`puruslang/linter`** / **`puruslang/prettier-plugin`** / **`puruslang/vscode-extension`**（並行可）
4. **`puruslang/docs`** — 各ツールの情報が揃ってから
5. **`puruslang/.github`** — profile 更新・org デフォルトファイル
6. **DNS 切り替え・Vercel 付け替え**
7. **v1.0.0 npm publish・GitHub Release**

---

## git history の方針

全リポジトリとも **history は削除してクリーンな状態から開始**する。
ファイルの内容だけコピーして initial commit から始める。

---

## リポジトリの公開タイミング

全リポジトリとも、**全移行が完了した後にユーザーと AI でチェックを行い、問題がなければ一斉に公開**する。
v1.0.0 リリース日は未定。

---

## VS Code Marketplace publisher

publisher `otoneko1102` のまま維持する（`otoneko1102.purus`）。移管は行わない。

---

## DNS・ドメイン設定

DNS 設定は本人が行う。

---

## `puruslang/discussions` の設定

- [ ] リポジトリの Discussions 機能を有効化
- [ ] カテゴリを作成（例: Announcements・General・Q&A・Ideas・Show and Tell）
- [ ] 各リポジトリの README に discussions へのリンクを追記
- [ ] `puruslang/.github` の org デフォルト discussions リンクを設定

---

## v1.0.0 リリース当日の手順

リリース日未定。手順は全移行・レビュー完了後に詳細化する。おおよその流れ：

1. `puruslang/assets` に全アセットを push・公開
2. 全リポジトリをチェックして問題なければ一斉 public に変更
3. 各リポジトリで `git tag v1.0.0` → GitHub Release 作成
4. npm publish（`purus@1.0.0`・`@puruslang/linter@1.0.0`・`@puruslang/prettier-plugin-purus@1.0.0`）
5. `vsce publish`（`otoneko1102.purus@1.0.0`）
6. DNS 切り替え（本人作業）
7. `puruslang/.github` profile README を更新
8. 告知（詳細未定）

---

## バージョン統一

core・linter・prettier-plugin・vscode-extension すべて **v1.0.0** で揃える。

## v0.x → v1.0.0 の変更点

言語仕様の破壊的変更なし。変更点は以下のみ：
- Node.js 最低要件を v20 → v22 に引き上げ

## playground のリリース時期

v1 と同時でも後回しでもどちらでもよい。

## Vercel private リポジトリ制限への対応

`puruslang/docs` はあらかじめ Public にしておくことで team プラン不要で Vercel 連携できる。

## 告知

本人が行う。

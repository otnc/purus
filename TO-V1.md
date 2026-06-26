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

| 新リポジトリ | 元ディレクトリ | 備考 |
|---|---|---|
| `puruslang/purus` | `core/` + `examples/` | コンパイラ + サンプル |
| `puruslang/docs` | `pages/` | ドキュメントサイト（Vercel）|
| `puruslang/linter` | `linter/` | |
| `puruslang/vscode-extension` | `extension/` | |
| `puruslang/prettier-plugin` | `prettier-plugin/` | |
| `puruslang/assets` | — | アイコン・SVG などの共有静的リソース |

`otnc/purus` は 0.x のアーカイブとして残す（read-only / archived）。

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

アイコン・SVG ロゴなど複数リポジトリから参照するリソースを一元管理する。

```
puruslang/assets
├── icons/
│   ├── purus-icon-light.svg
│   ├── purus-icon-dark.svg
│   └── purus-icon-theme.json
├── logo/
│   ├── logo.png
│   └── logo.svg
└── README.md
```

- 各リポジトリの `README.md`、docs からは GitHub raw URL 経由で参照
  - 例: `https://raw.githubusercontent.com/puruslang/assets/main/icons/purus-icon-light.svg`
- 現在 `extension/icons/` にあるアセットを移行し、extension からは `assets` リポジトリを参照先に変更

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
- [ ] Vercel プロジェクトを `puruslang/docs` に紐付け直し
- [ ] `purus.work` ドメインを新プロジェクトに付け替え
- [ ] Vercel でブランチごとのドメイン割り当てを設定
- [ ] `old.purus.work` を `otnc/purus` の GitHub Pages に割り当て（カスタムドメイン設定）
  - GitHub Pages は `docs/` フォルダから配信（現行の `outDir: '../docs'` そのまま）
  - GitHub Actions の build ワークフローに `ARCHIVE_MODE=true` を追加
    ```yaml
    - name: Build docs
      run: npm run build
      working-directory: pages
      env:
        ARCHIVE_MODE: 'true'
    ```
  - これにより全ページ上部にアーカイブバナーが表示される（実装済み）
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

## 移行タイミング

v1.0.0 の要件が固まり次第、分割作業に入る。それまでは `otnc/purus` モノレポで開発を継続する。

---

## `puruslang/.github` の整備

すでに存在するため、v1 移行に合わせて内容を更新する。

- [ ] `profile/README.md` を更新（org の概要・各リポジトリへのリンク）
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

## 未決事項

- npm scope: `@puruslang/` はすでに使用中（linter・prettier-plugin はそのまま）。コンパイラ本体（`puruslang/purus`）は現行どおり scope なし `purus` のまま
- VS Code Marketplace publisher の作成・移管手順

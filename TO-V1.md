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
| `purus.work` | 最新ドキュメント（`puruslang/docs`、Vercel）|
| `www.purus.work` | `purus.work` にリダイレクト（Vercel の www リダイレクト機能）|
| `old.purus.work` | 0.x 時代のドキュメント（`otnc/purus` の `pages/`、Vercel）|
| `v1.purus.work` | v1 のドキュメント（v2+ が出た時に退避）|

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
| `README.md` / `README-ja.md` | プロジェクト概要・インストール・使い方 |
| `CHANGELOG.md` / `CHANGELOG-ja.md` | バージョン別変更履歴 |
| `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` | コントリビュート手順 |
| `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` | 行動規範（Contributor Covenant 推奨）|
| `.github/ISSUE_TEMPLATE/` | バグ報告・機能要望テンプレート |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR テンプレート |
| `.github/workflows/` | CI/CD ワークフロー |

---

## 各リポジトリ対応作業

### `puruslang/purus`

- [ ] `core/` の内容を移行（git history ごと `git filter-repo` 推奨）
- [ ] `examples/` を同リポジトリ内に含める
- [ ] `README.md` / `README-ja.md` を書き直し
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を引き継ぎ
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `.github/` 整備（Issue テンプレート・PR テンプレート・Actions）
- [ ] パッケージ名: `purus`（npm）
- [ ] GitHub Actions: テスト・ビルド・npm publish ワークフロー

### `puruslang/docs`

- [ ] `pages/` の内容を移行
- [ ] Vercel プロジェクトを `puruslang/docs` に紐付け直し
- [ ] `purus.work` ドメインを新プロジェクトに付け替え
- [ ] Vercel でブランチごとのドメイン割り当てを設定
- [ ] `old.purus.work` を `otnc/purus` の Vercel プロジェクトに割り当て
- [ ] アセット参照を `puruslang/assets` に変更
- [ ] `.github/` 整備（docs 用 Issue テンプレート・Actions）

### `puruslang/linter`

- [ ] `linter/` の内容を移行
- [ ] `README.md` / `README-ja.md` を書き直し
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成（0.x → 1.0.0 で引き継ぎ）
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `.github/` 整備
- [ ] パッケージ名: `@puruslang/linter`（npm）

### `puruslang/vscode-extension`

- [ ] `extension/` の内容を移行
- [ ] アイコンパスを `puruslang/assets` 参照に変更
- [ ] `README.md` / `README-ja.md` を書き直し
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
- [ ] `.github/` 整備
- [ ] VS Code Marketplace の publisher を `puruslang` に変更
- [ ] バージョン: `1.0.0`

### `puruslang/prettier-plugin`

- [ ] `prettier-plugin/` の内容を移行
- [ ] `README.md` / `README-ja.md` を書き直し
- [ ] `CHANGELOG.md` / `CHANGELOG-ja.md` を新規作成
- [ ] `CONTRIBUTING.md` / `CONTRIBUTING-ja.md` を作成
- [ ] `CODE_OF_CONDUCT.md` / `CODE_OF_CONDUCT-ja.md` を作成
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

## 未決事項

- npm scope: `@puruslang/` はすでに使用中（linter・prettier-plugin はそのまま）。コンパイラ本体（`puruslang/purus`）は現行どおり scope なし `purus` のまま
- VS Code Marketplace publisher の作成・移管手順
- CI/CD: GitHub Actions の secrets を各リポジトリに再設定
- `puruslang/.github` リポジトリ（org デフォルトの Issue テンプレート・行動規範の一元管理）を作るか

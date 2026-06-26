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

`otnc/purus` は 0.x のアーカイブとして残す（read-only / archived）。

---

## ドメイン・デプロイ方針

| URL | 内容 |
|---|---|
| `purus.work` | 最新ドキュメント（`puruslang/docs`、Vercel）|
| `www.purus.work` | `purus.work` にリダイレクト（www なし統一）|
| `old.purus.work` | 0.x 時代のドキュメント（`otnc/purus` の `pages/`、Vercel）|
| `v1.purus.work` | v1 のドキュメント（v2+ が出た時に退避） |

バージョンアップ時のローテーション：
- v2 リリース → `purus.work` = v2、`v1.purus.work` = v1 のドキュメント
- v3 リリース → `purus.work` = v3、`v2.purus.work` = v2、`v1.purus.work` = v1

---

## 各リポジトリ対応作業

### `puruslang/purus`

- [ ] `core/` の内容をそのまま移行（git history ごと `git filter-repo` 推奨）
- [ ] `examples/` を同リポジトリ内に含める（`examples/` ディレクトリとして）
- [ ] `README.md` を `puruslang/purus` 向けに書き直し
- [ ] `CHANGELOG.md` を引き継ぎ（0.x 履歴は折りたたんでも可）
- [ ] パッケージ名: `purus`（npm）
- [ ] GitHub Actions: テスト・ビルド・npm publish ワークフロー

### `puruslang/docs`

- [ ] `pages/` の内容を移行
- [ ] Vercel プロジェクトを `puruslang/docs` に紐付け直し
- [ ] `purus.work` ドメインを新プロジェクトに付け替え
- [ ] `www.purus.work` → `purus.work` リダイレクト設定（Vercel）
- [ ] `old.purus.work` を `otnc/purus` の Vercel プロジェクトに割り当て
- [ ] README 不要（docs サイトそのもので説明）

### `puruslang/linter`

- [ ] `linter/` の内容を移行
- [ ] `README.md` を単体パッケージ向けに書き直し
- [ ] `CHANGELOG.md` を新規作成（0.x → 1.0.0 で引き継ぎ）
- [ ] パッケージ名: `@puruslang/linter`（npm）

### `puruslang/vscode-extension`

- [ ] `extension/` の内容を移行
- [ ] `README.md` を書き直し
- [ ] VS Code Marketplace の publisher を更新（`puruslang` に変更）
- [ ] バージョン: `1.0.0`

### `puruslang/prettier-plugin`

- [ ] `prettier-plugin/` の内容を移行
- [ ] `README.md` を書き直し
- [ ] `CHANGELOG.md` を新規作成
- [ ] パッケージ名: `@puruslang/prettier-plugin-purus`（npm）

---

## `otnc/purus` アーカイブ後の処置

- [ ] リポジトリを `Archived` に設定（Settings → Archive this repository）
- [ ] `README.md` 冒頭に移行先へのバナーを追加
  ```md
  > ⚠️ このリポジトリは Purus v0.x のアーカイブです。
  > 最新版は [puruslang/purus](https://github.com/puruslang/purus) を参照してください。
  ```
- [ ] `old.purus.work` のドメインを `pages/` の Vercel デプロイに割り当て

---

## 移行タイミング

v1.0.0 の要件が固まり次第、分割作業に入る。それまでは `otnc/purus` モノレポで開発を継続する。

---

## 未決事項

- `otnc` → `puruslang` での npm scope 名の扱い（`@purus/` も検討余地あり）
- VS Code Marketplace publisher の作成・移管手順
- CI/CD: GitHub Actions の secrets を各リポジトリに再設定

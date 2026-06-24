# RFC 0001: `blank` キーワード（ワイルドカード）

- **ステータス**: 実装済み（v0.11.0）
- **作成日**: 2026-06-24
- **対象バージョン**: v0.11.0

---

## 背景・動機

JavaScriptでは、コールバック関数の引数を意図的に無視する慣習として `_`（アンダースコア）がよく使われます。

```js
// 例: Array.from でインデックスのみ使用
Array.from({ length: 5 }, (_, i) => i);

// 例: map で値を無視
arr.map((_, i) => i * 2);
```

Purus でもこのパターンを表現する構文が必要でした。しかし `_` はShiftキーを押さないと入力できない記号であり、Purus の根本的な設計理念——**すべての演算子・制御構文をShiftキー不要の英語キーワードで表現する**——に反します。

（参考: `+` → `add`、`===` → `eq`、`&&` → `and` など）

---

## 設計の選択肢

### 案A: `_` をそのまま採用

- 他言語（Rust・Swift・Haskell・MoonBit など）との一貫性
- **却下理由**: Shiftキーが必要（`_` = Shift + ハイフン）

### 案B: `skip`

- 英語として自然
- **却下理由**: `break`・`continue` のような制御フローキーワードと同じ雰囲気があり、パラメータ位置での意味が直感的でない

### 案C: `blank` ✅ 採用

- Shiftキー不要
- 「空の位置」という意味で直感的
- 関数パラメータとマッチパターンの両方に自然にフィット
- 制御フローと混同されない

### 案D: `any`

- マッチパターンとしては「どの値でもよい」という意味で自然
- ただし型システムの `any` 型と意味が競合する可能性

### 案E: `void`

- **却下理由**: `void` は単項演算子としてすでに存在

---

## 仕様

### 関数パラメータ

`blank` を関数パラメータとして使用すると、そのパラメータを意図的に無視することを宣言できます。

```purus
fn f blank; x to x
```
→
```js
function f(_, x) { return x; }
```

**複数の `blank`**: JSのstrictモードでは同名パラメータが許可されないため、2番目以降は `_1`・`_2`… と自動的にリネームされます。

```purus
fn f blank; blank; x to x
```
→
```js
function f(_, _1, x) { return x; }
```

無名関数・async関数でも同様に機能します：

```purus
const cb be fn blank; i to i
const acb be async fn blank; i to await fetch[i]
```
→
```js
const cb = (_, i) => i;
const acb = async (_, i) => await fetch(i);
```

### マッチパターン（switch / match）

`blank` をマッチアームのパターンとして使うと、値にバインドしないcatch-allアームになります。

```purus
switch x
  case 1 then ///one///
  case blank then ///other///
```
→
```js
if (x === 1) {
  "one";
} {
  "other";
}
```

`if` ガード付きでも使用可能：

```purus
switch x
  case blank if x gt 0 then ///positive///
  case blank then ///non-positive///
```

### トークン

`blank` は専用のトークン種別 `Blank` として字句解析されます（`Ident("blank")` ではなく）。これにより、識別子として変数名に `blank` を使おうとした場合にコンパイルエラーとして扱うことができます（現在はパーサーレベルでの制限）。

---

## 実装

### コンパイラ（core）

| ファイル | 変更内容 |
|---|---|
| `src/lexer/token.mbt` | `Blank` トークン種別を追加 |
| `src/lexer/lexer.mbt` | `"blank"` を `Blank` トークンとして認識 |
| `src/parser/parser.mbt` | `parse_param_list`・`parse_match_pattern` で `Blank` を処理 |
| `src/codegen/codegen.mbt` | `gen_params()` ヘルパーと `is_blank()` 述語を追加 |
| `src/codegen/codegen_expr.mbt` | FnExpr系・MatchExprで `blank` を正しく出力 |

### ツール

| ツール | 変更内容 |
|---|---|
| `prettier-plugin` | `blank` をキーワードとして認識（ハイライト・フォーマット） |
| `linter` | `blank` をキーワードとして認識 |
| `extension/tokenizer` | `blank` をキーワードとして認識 |
| `extension/syntaxes` | TextMate文法で `blank` を `keyword.other` としてハイライト |

---

## 後方互換性

破壊的変更なし。`blank` は従来ただの識別子として動作していましたが、今後は予約キーワードになります。変数名として `blank` を使っているコードは修正が必要です。

---

## 参考

- Issue: [#17 `_`](https://github.com/otnc/purus/issues/17)
- ブランチ: `feature/blank-wildcard`

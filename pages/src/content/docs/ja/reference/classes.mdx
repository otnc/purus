---
title: クラス
description: Purusのクラス宣言。
sidebar:
  order: 7
---

## 基本クラス

```purus
class Animal
  fn speak
    console.log[///hello///]
```

```js
class Animal {
  speak() {
    console.log("hello");
  }
}
```

## コンストラクタ

`fn new` でコンストラクタを宣言します:

```purus
class Animal
  fn new name
    this.name be name
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
```

## プライベートフィールド

`private` でプライベートフィールドを宣言します。JavaScriptではプライベートフィールドに `#` を使いますが、Purusでは `#` が使えないため `private` キーワードを使用します。

```purus
class Counter
  private count be 0

  fn increment
    this.count be this.count add 1

  get fn value
    return this.count
```

```js
class Counter {
  #count = 0;
  increment() {
    this.#count = this.#count + 1;
  }
  get value() {
    return this.#count;
  }
}
```

`private` で宣言されたフィールドは、`this` 経由のアクセスが自動的に `#` プレフィックス付きにコンパイルされます。

## 継承

`extends` でサブクラスを作成します。コンストラクタで `super[args]` を呼び出します:

```purus
class Dog extends Animal
  fn new name
    super[name]

  fn bark
    console.log[///woof///]
```

```js
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  bark() {
    console.log("woof");
  }
}
```

## 静的メソッド

`static fn` で静的メソッドを宣言します:

```purus
class MathUtil
  static fn sum a; b
    return a add b
```

```js
class MathUtil {
  static sum(a, b) {
    return a + b;
  }
}
```

## ゲッターとセッター

`get fn` と `set fn` を使用します:

```purus
class Temperature
  private celsius

  fn new celsius
    this.celsius be celsius

  get fn fahrenheit
    return this.celsius mul 1.8 add 32

  set fn fahrenheit value
    this.celsius be value sub 32 div 1.8
```

```js
class Temperature {
  #celsius;
  constructor(celsius) {
    this.#celsius = celsius;
  }
  get fahrenheit() {
    return (this.#celsius * 1.8) + 32;
  }
  set fahrenheit(value) {
    this.#celsius = value - (32 / 1.8);
  }
}
```

## 非同期メソッド

```purus
class Api
  async fn fetch-data url
    const res be await fetch[url]
    return res.json[]
```

```js
class Api {
  async fetch_data(url) {
    const res = await fetch(url);
    return res.json();
  }
}
```

## 式本体メソッド

メソッドも `to` で式本体をサポートします。名前付き関数やメソッドには暗黙のreturnはありません — `to` は副作用のある式に使用してください:

```purus
class Greeter
  fn greet name to console.log[///Hello, [name]///]
```

```js
class Greeter {
  greet(name) { console.log(`Hello, ${name}`); }
}
```
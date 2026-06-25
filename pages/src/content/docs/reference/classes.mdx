---
title: Classes
description: Class declarations in Purus.
sidebar:
  order: 7
---

## Basic class

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

## Constructor

Use `fn new` to declare a constructor:

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

## Private fields

Use `private` to declare private fields. In JavaScript, private fields use `#`, but Purus uses `private` keyword instead since `#` is not available.

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

When a field is declared `private`, any access to that field through `this` is automatically compiled to use `#` prefix.

## Inheritance

Use `extends` to create a subclass. Call `super[args]` in the constructor:

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

## Static methods

Use `static fn` to declare static methods:

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

## Getters and setters

Use `get fn` and `set fn`:

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

## Async methods

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

## Expression body methods

Methods support `to` for expression bodies. Note that named functions and methods do not have implicit return — use `to` for side-effect expressions:

```purus
class Greeter
  fn greet name to console.log[///Hello, [name]///]
```

```js
class Greeter {
  greet(name) { console.log(`Hello, ${name}`); }
}
```

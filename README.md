# Format-String
A Python-like string formatter.

## Documentation

### Basic

The following three statements are equivalent:

```js
// String
"The " + "Format-String" + " project is maintained by " + "haykam821" + "."

// Template literals
`The ${"Format-String"} project is maintained by ${"haykam821"}."

// This library
format("The {} project is maintained by {}.", "Format-String", "haykam821");

// => "The Format-String project is maintained by haykam821."
```

Here is the syntax for the `format` function:

```js
format(transformers?: object, string: string, ...values: any);
```

### Numbering

There are two types of numbering: implicit and explicit. When using implicit numbering, the order of the parameters matches the order of the placeholders in the string. Explicit numbering allows you to refer to a certain parameter by its index.

```js
const params = ["first", "second", "third"];

format("You can get an award for placing in {}, {}, or {}.", ...params);
format("You can get an award for placing in {0}, {1}, or {2}.", ...params);
// => "You can get an award for placing in first, second, or third."
```

Unlike the library this was based on, you can switch between types.

```js
format("I have a {} and a {}. Do you have a {0}? What about a {}?", "dog", "cat", "fish");
// => "I have a dog and a cat. Do you have a dog? What about a fish?"
```

### Properties

You can access properties using dot notation. When referencing a property of the first parameter, including the leading number and dot is not necessary.

```js
const person = {
  name: "James",
};

format("Hello there {0.name}!", person);
format("Hello there {name}!", person);
// => "Hello there James!"
```

#### Methods

When the property referenced is a function (making it a method), it will be called without arguments to determine the final value.

```js
const person = {
  firstName: "Mike",
  lastName: "Smith",
  fullName: function() {
	  return this.firstName + " " + this.lastName;
  }
};

format("How are you, {fullName}?", person);
// => "How are you, Mike Smith?"
```

### Transformers

Transformers allow 

To specify transformers, you must precede the formatted string with an object of transformers:

```js
format({
  exciting: str => str.toUpperCase() + "!",
}, "What a friendly {!exciting}", "puppy");
// => "What a friendly PUPPY!"
```

#### Global Transformers

You can specify a transformer that applies to every value no matter what:

```js
format({
  global: val => val.toString().split("").reverse().join(""),
}, "I am talking {}.", "backwards");
// => "I am talking sdrawkcab."
```

#### Type Transformers

You can specify transformers that apply to a certain type in addition to global transformers:

```js
format({
  string: str => str.toLowerCase(),
  number: num => num.toLocaleString(),
}, "The {} cryptocurrency is priced at ${}.", "BITCOIN", 3800);
// => "The bitcoin cryptocurrency is priced at $3,800."
```

This check is based off of `typeof`, so be aware of limitations.

#### Named Transformers

You can use any transformer for a value by appending `!` plus the transformer name to any placeholder:

```js
format({
  charCode: str => str.toUpperCase() + "!",
}, "What is the square root of {0!charCode}?", "π");
// => "What is the square root of 960?"
```

### Escaping

To escape a placeholder, place a backslash before the opening brace:

```js
format("You can make an object in JavaScript using curly braces: \{ a: 1, b: 2 }");
```

### Errors

Although most problems are handled gracefully (such as undefined converting to an empty string), this library does throw errors.

This library uses a custom `PlaceholderError` type that includes the index and value of the placeholder that caused the error. Below is a catalogue of errors, with each heading representing the error's code.

#### `INVALID_PLACEHOLDER_SYNTAX`

This means your placeholder syntax is invalid. 

#### `MISSING_NAMED_TRANSFORMER`

This means that a named transformer could not be found.

## See also

* [`string-format`](https://github.com/davidchambers/string-format), which this is heavily based on

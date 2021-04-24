# Flakecss

A zero cost css-in-js solution that compiles itself away.

## Features

- no dependencies, and weighs less than **800B**.
- flexible component styling
- classic css-in-js behavior during development, compile to a plain css file for production.
- Supports advanced CSS features like:
  - media queries
  - pseudo-classes/pseudo-selectors
  - your favorite css properties

## Installation

```shell
$ npm install @sightread/flake
```

## Usage

flakecss will bundle and insert all calls into a single target element.

### In the root of your app

```javascript
import { extractCss, FLAKE_STYLE_ID } from "@sightread/flake";

function RootComponent() {
  // ... some react stuff

  return (
    <html>
      <head>
        ...
        <style
          id={FLAKE_STYLE_ID}
          dangerouslySetInnerHTML={{ __html: extractCss() }}
        />
      </head>
      ...
    </html>
  );
}
```

### In your components

Note: `css` should be called **outside** of the component on the module level.

```javascript
import { css, mediaQuery } from "@sightread/flake";

const classes = css({
  headerItem: {
    color: "blue",
    fontSize: "24px",
  },
  headerSecondary: {
    color: "red",
    fontSize: "16px",
  },
});

function MyComponent() {
  // ... react stuff

  return (
    <div>
      <h1 className={classes.headerItem}>It works!</h1>
      <h2 className={classes.headerSecondary}>(hopefully)</h2>
    </div>
  );
}
```

### Peudoclasses

```javascript
const classes = css({
    navLink: {
      color: "blue",
      "&:hover": {
        color: "black",
      }
    }
  },
})
```

### Selectors

```javascript

const classes = css({
  container: {
    '& p:nth-child(odd)': {
      fontSize: 18,
      color: 'lightgrey',
      transition: '300ms',
    },
  }
})
...
...
<div className={classes.container}>
  <p>paragraph one</p>
  <p>paragraph two</p>
  <p>paragraph three</p>
  <p>paragraph four</p>
</div>
```

### Media Queries

We provide a small api for media queries for classes. The following example is equivalent to:

```css
@media only screen and (min-width: 900px) {
  .container {
    width: 50%;
  }
}
@media only screen and (max-width: 900px) {
  .container {
    width: 100%;
  }
}
```

```javascript
import { mediaQuery } from "@sightread/flake";

const classes = css({
  container: {
    [mediaQuery.up(900)]: {
      width: "50%",
    },
    [mediaQuery.down(900)]: {
      width: "100%",
    },
  },
});
```

### Combining multiple classes

Often you may want to use multiple defined classes for one element, or conditionally use classes.
For either of these, use our `classNames` function.

`classNames` takes a variable number of arguments of either type string or object.
If the argument is a string, it will be concatonated the the return string.
If the parameter is an object, the associated keys of truthy values will be added.

In the example bellow, the button will have the classes associated with `button` and
`btnPrimary` while `error` is `false`, else `button` and `btnDisabled`.

```javascript
import { classNames } from "@sightread/flake";

const classes = css({
  button: {
    padding: "5px 10px",
    fontSize: "16px",
    color: "white",
  },
  btnPrimary: {
    backgroundColor: "blue",
  },
  btnDisabled: {
    backgroundColor: "red",
  },
});

function MyComponent() {
  const [error, setError] = useState(false);
  // .. react stuff..

  return (
    <div>
      ...
      <button
        className={classNames(classes.button, {
          [classes.btnPrimary]: !error,
          [classes.btnDisabled]: error,
        })}
      >
        Submit
      </button>
    </div>
  );
}
```

## Limitations

Currently, the css is compiled each time an app is hot reloaded. This will cause the target `style` tag to grow as the app is being developed. This is not an issues for production.

## License

MIT

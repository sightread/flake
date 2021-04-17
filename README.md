# Flakecss

A minimalist css in javascript renderer. Our mission
is to be as small as possible while supporting all of the important use cases.

## Features

- media queries
- pseudo-classes/pseudo-selectors
- your favorite css properties
- SSR
- no dependencies
- written in typescript

## Installation

```shell
$ npm i @sightread/flake
or
$ yarn add @sightread/flake
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
        textDecoration: "underline"
      },
      "&:focus": {
        color: "black"
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
import { mediaQuery } from "@sightread/flake"

const classes = css({
  container {
    [mediaQuery.up(900)]: {
      width: "50%"
    },
    [mediaQuery.down(900)]: {
      width: "100%"
    }
  }
})

```

## Limitations

Currently, the css is compiled each time an app is hot reloaded. This will cause the target `style` tag to grow as the app is being developed. This is not an issues for production.

## License

MIT

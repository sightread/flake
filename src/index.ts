import { CSSProperties } from "react";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

type StyleObjectValues =
  | CSSProperties
  | { [selectorKey: string]: CSSProperties };

type StyleObject = {
  [selectorKey: string]: StyleObjectValues;
};

type StringMap = {
  [selectorKey: string]: string;
};

let counter = 0;
let globalStyle = "";

// TODO: create babel plugin that processes all of the CSS into a single bundle
// and removes all css() calls from the source in favor of inlining classname map
// that would enable complete removal of flake from client.

/**
 * style object expected in the shape of
 * {
 *    class1: {
 *        attr1: val1,
 *        attr2: val2,
 *        '&:pseudoclass': {
 *            ...
 *        },
 *        "@media(...)": {
 *            ...
 *        },
 *    },
 *    class2: {
 *        ...
 *    },
 * }
 */
function css(styleObject: StyleObject): StringMap {
  const parsed = compileCss(styleObject);
  if (!isBrowser()) {
    globalStyle += parsed.styleHtml;
  } else {
    getStyleEl().innerHTML += parsed.styleHtml;
  }

  return parsed.classes;
}

function extractCss(): string {
  return globalStyle;
}

function compileCss(
  styleObj: StyleObject
): { classes: StringMap; styleHtml: string } {
  const classes: StringMap = {};
  let styleHtml = "";

  Object.keys(styleObj).forEach((selector) => {
    const styles = styleObj[selector];
    const suffix = counter++;
    const className = `${selector}-${suffix}`;
    counter++;

    classes[selector] = className;
    styleHtml += getNestedSelectors(styles, className);
    const directRules = rules(getDirectProperties(styles));
    if (directRules) {
      styleHtml += `.${className}{${directRules}}`;
    }
  });

  if (process.env.NODE_ENV === "development") {
    styleHtml =
      "\n" +
      styleHtml
        .replace(/(\{)/g, " $&\n")
        .replace(/(\})/g, "$&\n")
        .replace(/([^;]*;)/g, "$&\n");
  }

  return { classes, styleHtml };
}

function getDirectProperties(styleObject: StyleObjectValues): CSSProperties {
  const extractedProps: StringMap = {};
  Object.keys(styleObject).forEach((propKey) => {
    const propVal = (styleObject as any)[propKey];
    if (typeof propVal === "object") {
      return;
    }
    extractedProps[propKey] = propVal;
  });
  return extractedProps as CSSProperties;
}

function getNestedSelectors(
  styleObject: StyleObjectValues,
  className: string
): string {
  let acc = "";
  Object.keys(styleObject).forEach((key: string) => {
    const styles = (styleObject as any)[key];
    if (isNestedSelector(key)) {
      acc += `.${className}${key.slice(1)}{${rules(styles)}}`;
    } else if (isMediaQuery(key)) {
      acc += `${key}{.${className} {${rules(styles)}}}`;
    }
  });
  return acc;
}

function rules(rules: CSSProperties): string {
  return Object.keys(rules)
    .map((prop) => {
      let val = (rules as any)[prop];
      val = maybeAddPx(prop, val);
      return dashCase(prop) + ":" + val + ";";
    })
    .join("");
}

function isNestedSelector(key: string) {
  return key.startsWith("&");
}

function isMediaQuery(key: string): boolean {
  return key.startsWith("@media");
}

const unitlessProperties = new Set(["opacity", "zIndex", "fontWeight"]);
function maybeAddPx(attr: string, val: number | string) {
  if (typeof val === "string" || unitlessProperties.has(attr)) {
    return val;
  }
  return `${val}px`;
}

function dashCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, (s) => s[0] + "-" + s[1].toLowerCase());
}

const FLAKE_STYLE_ID = "FLAKE_CSS";
let styleEl: null | HTMLStyleElement;
function getStyleEl(): HTMLStyleElement {
  if (styleEl) {
    return styleEl;
  }
  styleEl = document.getElementById(FLAKE_STYLE_ID) as HTMLStyleElement;
  if (styleEl) {
    return styleEl;
  }

  styleEl = document.createElement("style");
  styleEl.id = FLAKE_STYLE_ID;
  document.head.appendChild(styleEl);
  return styleEl;
}

const mediaQuery = {
  up: (bp: number): string => `@media only screen and (min-width: ${bp}px)`,
  down: (bp: number): string => `@media only screen and (max-width: ${bp}px)`,
  between: (min: number, max: number): string =>
    `@media only screen and (min-width: ${min}px) and (max-width: ${max}px)`,
};

type ObjStringable = string | { [key: string]: boolean };
function objstr(arg: ObjStringable): string {
  if (typeof arg === "string") return arg;

  return Object.keys(arg)
    .map((k) => arg[k] && k)
    .filter(Boolean)
    .join(" ");
}

function classNames(...args: ObjStringable[]): string {
  return args.map(objstr).join(" ");
}

export { css, extractCss, compileCss, FLAKE_STYLE_ID, classNames, mediaQuery };

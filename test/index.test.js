const { describe, expect, it } = require("@jest/globals");
const { compileCss, classNames } = require("../dist/index.min.js");

describe("flake", () => {
  describe("compileCss", () => {
    it("should compile an empty object", () => {
      const parsed = compileCss({});
      expect(parsed.classes).toEqual({});
      expect(parsed.styleHtml).toBe("");
    });

    it("should compile a single class", () => {
      const parsed = compileCss({
        header: {
          fontSize: 12,
          opacity: 1,
        },
      });
      expect(parsed.classes).toEqual({ header: "header-0" });
      expect(parsed.styleHtml).toBe(".header-0{font-size:12px;opacity:1;}");
    });
  });

  describe("classNames", () => {
    it("should handle no arg", () => {
      expect(classNames()).toBe("");
    });

    it("should concat two classes", () => {
      expect(classNames("foo", "bar")).toBe("foo bar");
    });

    it("should handle objects", () => {
      expect(classNames({ foo: false, bar: true })).toBe("bar");
    });

    it("should handle mixed args", () => {
      expect(classNames("foo", { bar: true })).toBe("foo bar");
    });
  });
});

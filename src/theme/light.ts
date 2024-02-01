import type { PrismTheme } from "prism-react-renderer"

const theme: PrismTheme = {
  plain: {
    color: "#393A34",
    backgroundColor: "#f6f8fa",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#999988",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#12067A",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#B5B1E0",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "#ABA7D4",
      },
    },
    {
      types: ["builtin"],
      style: {
        color: "#25A19D",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "variable",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#AD4D11",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#00a4db",
      },
    },
    {
      types: ["function", "function-variable", "deleted", "tag"],
      style: {
        color: "#0E6A6E",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#7A360C",
      },
    },
  ],
}

export default theme
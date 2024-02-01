import type { PrismTheme } from "prism-react-renderer"

const theme: PrismTheme = {
  plain: {
    color: "#E6DEC3",
    backgroundColor: "#0A0E33",
  },
  styles: [
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "rgb(189, 147, 249)",
      },
    },
    {
      types: ["inserted", "function"],
      style: {
        color: "rgb(80, 250, 123)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)",
      },
    },
    {
      types: ["changed"],
      style: {
        color: "rgb(255, 184, 108)",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "rgb(248, 248, 242)",
      },
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "#808CFF",
      },
    },
    {
      types: ["string-property"],
      style: {
        color: "#BE8CFF",
      },
    },
    {
      types: ["boolean"],
      style: {
        color: "#6675FF",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "#BF9600",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#972C99",
      },
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: "#FFD957",
        fontStyle: "italic",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(98, 114, 164)",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "rgb(241, 250, 140)",
      },
    },
  ],
}

export default theme
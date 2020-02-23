/* eslint-disable no-unused-vars */
const { describe, it } = require("mocha");
const { lf } = require(global.indexFile || "index.js");

describe("CRLF Converter", () => {
  describe("lf", () => {
    it("should replace CRLF at the end of a string", () => {
      const result = lf`Hello there.\r\n`;

      // ...
    });

    it("should replace CRLF at the beginning of a string", () => {
      const result = lf`\r\nHello there.`;

      // ...
    });
  });
});

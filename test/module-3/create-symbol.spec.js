const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Main Module (src/index.js)", () => {
  it("should export a global symbol `disableConverter` @create-symbol", () => {
    const { disableConverter } = require("../../src/index.js");

    expect(
      typeof disableConverter === "undefined",
      "In src/index.js, we want to export a new constant `disableConverter`."
    ).to.be.false;

    expect(
      typeof disableConverter === "symbol",
      "In src/index.js, `disableConverter` should be a symbol."
    ).to.be.true;

    expect(
      disableConverter.toString() === "Symbol(crlf-converter-disable)",
      'In src/index.js, use `"crlf-converter-disable"` as the descriptor of the `disableConverter` symbol'
    ).to.be.true;

    expect(
      disableConverter === Symbol.for("crlf-converter-disable"),
      "In src/index.js, ensure `disableConverter` is a global symbol."
    ).to.be.true;
  });
});

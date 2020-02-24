const { expect } = require("chai");
const { describe, it } = require("mocha");

class ExampleA {
  toString() {
    return "\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend."
  }
}

class ExampleB extends ExampleA {
  constructor() {
    super();
    this[Symbol.for("crlf-converter-disable")] = true;
  }
}

describe("Main Module (src/index.js)", () => {
  it("should disable line transformation for interpolated values with the global symbol @check-symbol", () => {
    const { lf } = require("../../src/index.js");

    const enabledInput = lf`${new ExampleA()}`;
    const enabledResult = "\n Hello\n to \nyou,\n\n my\n\n true \n\nfriend.";

    expect(enabledInput).to.equal(
      enabledResult,
      "In src/index.js, the `lf` function should transform line endings for interpolated values that do not have the global symbol property"
    );

    const disabledInput = lf`${new ExampleB()}`;
    const disabledResult = "\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.";

    expect(disabledInput).to.equal(
      disabledResult,
      "In src/index.js, the `lf` function should not transform line endings for interpolated values that have the global symbol property"
    );
  });
});

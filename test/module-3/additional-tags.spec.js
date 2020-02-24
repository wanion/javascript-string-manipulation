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
  it("should export a template tags `cr` and `crlf` that format strings with CR and CRLF endings @additional-tags", () => {
    const { cr, crlf } = require("../../src/index.js");

    ////////
    // CR //
    ////////

    const plainCRInput = cr`Hello to you, my true friend.`;
    const plainCRResult = "Hello to you, my true friend.";

    expect(plainCRInput).to.equal(
      plainCRResult,
      "In src/index.js, the `cr` function should implement a template tag that preserves single-line strings"
    );

    const interpolatedCRInput = cr`Hello ${1 + 1} you, my ${true} friend.`;
    const interpolatedCRResult = "Hello 2 you, my true friend.";

    expect(interpolatedCRInput).to.equal(
      interpolatedCRResult,
      "In src/index.js, the `cr` function should implement a template tag that handles interpolated values"
    );

    const plainTransformedCRInput = cr`\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.`;
    const plainTransformedCRResult = "\r Hello\r to \ryou,\r\r my\r\r true \r\rfriend.";

    expect(plainTransformedCRInput).to.equal(
      plainTransformedCRResult,
      "In src/index.js, the `cr` function should implement a template tag that transforms line endings contained in the string values"
    );

    const interpolatedTransformedCRInput = cr`Hello ${"\r\nto \n \r"} you, my ${"\r\r true\n\n \r\n"} friend.`;
    const interpolatedTransformedCRResult = "Hello \rto \r \r you, my \r\r true\r\r \r friend.";

    expect(interpolatedTransformedCRInput).to.equal(
      interpolatedTransformedCRResult,
      "In src/index.js, the `cr` function should implement a template tag that transforms line endings contained in the interpolated values"
    );

    const enabledCRInput = cr`${new ExampleA()}`;
    const enabledCRResult = "\r Hello\r to \ryou,\r\r my\r\r true \r\rfriend.";

    expect(enabledCRInput).to.equal(
      enabledCRResult,
      "In src/index.js, the `cr` function should transform line endings for interpolated values that do not have the global symbol property"
    );

    const disabledCRInput = cr`${new ExampleB()}`;
    const disabledCRResult = "\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.";

    expect(disabledCRInput).to.equal(
      disabledCRResult,
      "In src/index.js, the `cr` function should not transform line endings for interpolated values that have the global symbol property"
    );

    //////////
    // CRLF //
    //////////

    const plainCRLFInput = crlf`Hello to you, my true friend.`;
    const plainCRLFResult = "Hello to you, my true friend.";

    expect(plainCRLFInput).to.equal(
      plainCRLFResult,
      "In src/index.js, the `crlf` function should implement a template tag that preserves single-line strings"
    );

    const interpolatedCRLFInput = crlf`Hello ${1 + 1} you, my ${true} friend.`;
    const interpolatedCRLFResult = "Hello 2 you, my true friend.";

    expect(interpolatedCRLFInput).to.equal(
      interpolatedCRLFResult,
      "In src/index.js, the `crlf` function should implement a template tag that handles interpolated values"
    );

    const plainTransformedCRLFInput = crlf`\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.`;
    const plainTransformedCRLFResult = "\r\n Hello\r\n to \r\nyou,\r\n\r\n my\r\n\r\n true \r\n\r\nfriend.";

    expect(plainTransformedCRLFInput).to.equal(
      plainTransformedCRLFResult,
      "In src/index.js, the `crlf` function should implement a template tag that transforms line endings contained in the string values"
    );

    const interpolatedTransformedCRLFInput = crlf`Hello ${"\r\nto \n \r"} you, my ${"\r\r true\n\n \r\n"} friend.`;
    const interpolatedTransformedCRLFResult = "Hello \r\nto \r\n \r\n you, my \r\n\r\n true\r\n\r\n \r\n friend.";

    expect(interpolatedTransformedCRLFInput).to.equal(
      interpolatedTransformedCRLFResult,
      "In src/index.js, the `crlf` function should implement a template tag that transforms line endings contained in the interpolated values"
    );

    const enabledCRLFInput = crlf`${new ExampleA()}`;
    const enabledCRLFResult = "\r\n Hello\r\n to \r\nyou,\r\n\r\n my\r\n\r\n true \r\n\r\nfriend.";

    expect(enabledCRLFInput).to.equal(
      enabledCRLFResult,
      "In src/index.js, the `crlf` function should transform line endings for interpolated values that do not have the global symbol property"
    );

    const disabledCRLFInput = crlf`${new ExampleB()}`;
    const disabledCRLFResult = "\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.";

    expect(disabledCRLFInput).to.equal(
      disabledCRLFResult,
      "In src/index.js, the `crlf` function should not transform line endings for interpolated values that have the global symbol property"
    );
  });
});

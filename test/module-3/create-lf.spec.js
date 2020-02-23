const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Main Module (src/index.js)", () => {
  it("should export a tagged template `lf` that formats strings with LF endings @create-lf", () => {
    const { lf } = require("../../src/index.js");

    const plainInput = lf`Hello to you, my true friend.`;
    const plainResult = "Hello to you, my true friend.";

    expect(plainInput).to.equal(
      plainResult,
      "In src/index.js, the `lf` function should implement a template tag that preserves single-line strings"
    );

    const interpolatedInput = lf`Hello ${1 + 1} you, my ${true} friend.`;
    const interpolatedResult = "Hello 2 you, my true friend.";

    expect(interpolatedInput).to.equal(
      interpolatedResult,
      "In src/index.js, the `lf` function should implement a template tag that handles interpolated values"
    );
  });
});

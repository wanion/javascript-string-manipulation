const { expect } = require("chai");
const { describe, it } = require("mocha");

describe("Main Module (src/index.js)", () => {
  it("should export a tagged template `lf` that formats strings with LF endings @transform-lf", () => {
    const { lf } = require("../../src/index.js");

    const plainTransformedInput = lf`\r\n Hello\r to \nyou,\r\n\r\n my\r\r true \n\nfriend.`;
    const plainTransformedResult = "\n Hello\n to \nyou,\n\n my\n\n true \n\nfriend.";

    expect(plainTransformedInput).to.equal(
      plainTransformedResult,
      "In src/index.js, the `lf` function should implement a template tag that transforms line endings contained in the string values"
    );

    const interpolatedTransformedInput = lf`Hello ${"\r\nto \n \r"} you, my ${"\r\r true\n\n \r\n"} friend.`;
    const interpolatedTransformedResult = "Hello \nto \n \n you, my \n\n true\n\n \n friend.";

    expect(interpolatedTransformedInput).to.equal(
      interpolatedTransformedResult,
      "In src/index.js, the `lf` function should implement a template tag that transforms line endings contained in the interpolated values"
    );
  });
});

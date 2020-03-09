const { expect } = require("chai");
const esprima = require("esprima");
const fs = require("fs");
const Mocha = require("mocha");
const { describe, it } = require("mocha");
const path = require("path");

const { disableConverter, LineEndings, transformLineEnding } = require("../../src/index.js");

const source = fs.readFileSync(
  path.join(process.cwd(), "src/index.spec.js"),
  "utf8"
);

describe("Main Module Tests (src/index.spec.js)", () => {
  it("should test line transformations in the middle of a string @test-includes", async () => {
    // Before running tests: check for `String.prototype.includes()`.

    let foundIncludes = false;

    esprima.parseModule(source, {}, node => {
      if (
        node.type === "MemberExpression"
        && node.property.type === "Identifier"
        && node.property.name === "includes"
      ) {
        foundIncludes = true;
      }
    });

    expect(
      foundIncludes,
      "In src/index.spec.js, let's use `String.prototype.includes()` in the third test."
    ).to.be.true;

    // First run: learner-written test should fail.

    global.lf = {
      lf: (strings, ...values) => {
        return strings.reduce((result, literal, index) => {
          return `${result}${literal}${values[index] || ""}`;
        }, "");
      }
    };

    const failingMocha = new Mocha({
      fgrep: "in the middle",
      reporter: function () {}
    });
    failingMocha.addFile("src/index.spec.js");

    const failingFailureCount = new Promise(function (resolve) {
      failingMocha.run(function(count) { resolve(count); });
    });

    expect(
      await failingFailureCount,
      "In src/index.spec.js, the third test should fail when `lf` doesn't replace line endings."
    ).to.equal(1);

    // Second run: learner-written test should pass.

    global.lf = {
      lf: (strings, ...values) => {
        return strings.reduce((result, literal, index) => {
          const transformedString = transformLineEnding(literal, LineEndings.LF);
          let transformedValue = (values[index] != null ? values[index] : "");
      
          if (!Object.getOwnPropertySymbols(transformedValue).includes(disableConverter)) {
            transformedValue = transformLineEnding(transformedValue, LineEndings.LF);
          }
      
          return `${result}${transformedString}${transformedValue}`;
        }, "");
      }
    };

    const passingMocha = new Mocha({
      fgrep: "in the middle",
      reporter: function () {}
    });
    passingMocha.addFile("src/index.spec.js");

    const passingFailureCount = new Promise(function (resolve) {
      passingMocha.run(function(count) { resolve(count); });
    });

    expect(
      await passingFailureCount,
      "In src/index.spec.js, the third test should pass when `lf` replaces line endings."
    ).to.equal(0);
  });
});

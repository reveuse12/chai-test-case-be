import { expect } from "chai";
import { add, fetchData } from "../src/math.js";
describe("Basic Mocha Test", () => {
  it("should return true when 1 + 1 equals 2", () => {
    expect(1 + 1).to.equal(2);
  });

  it("should add number and return sum of it", () => {
    expect(add(1, 9)).to.be.equal(10);
  });

  it(" add funmction should return and error", () => {
    expect(() => add(1, "")).to.be.Throw("Both arguments must be numbers");
  });

  it("add function should be able to add positive and negative numbers", () => {
    expect(add(-1, -9)).to.be.equal(-10);
    expect(add(1, 9)).to.be.equal(10);
  });

  it("add function should be able to add floating point numbers", () => {
    expect(add(1.5, 9.2)).to.be.equal(10.7);
  });

  it("should handle addition at the edge of Number.MAX_SAFE_INTEGER", () => {
    const result = add(Number.MAX_SAFE_INTEGER, 1);
    // console.log(result);
    // JavaScript cannot precisely represent numbers beyond MAX_SAFE_INTEGER.
    // Check if the result behaves as expected even if it can't be completely accurate.
    expect(result).to.be.a("number");
    expect(result).to.be.greaterThan(Number.MAX_SAFE_INTEGER); // Confirm it's "larger" as expected.
  });

  it("should handle addition within safe integer limits", () => {
    const result = add(Number.MAX_SAFE_INTEGER - 1, 1);

    // This should produce a valid result since it's within the safe integer range
    expect(result).to.equal(Number.MAX_SAFE_INTEGER);
  });
  it("should handle addition of large numbers", () => {
    const result = add(1000000000000000000, 1000000000000000000);

    expect(result).to.a("number");
  });
});

describe("async function test", () => {
  it("fetchData should return a promise", async () => {
    const result = await fetchData();
    expect(result).to.be.equal("Data fetched successfully");
  });
  it("fetchData should reject on error", async () => {
    try {
      await fetchData("error");
    } catch (error) {
      expect(error).to.be.equal("An error occurred");
    }
  });
  it("fetchData is pass with number then", () => {
    try {
      const result = fetchData(1);
    } catch (error) {
      expect(result).to.be.equal("An error occurred");
    }
  });
});

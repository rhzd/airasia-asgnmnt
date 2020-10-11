const utils = require("../../src/app/utils");

describe("Utility Test", () => {
  it("Should capitalize first letter", async () => {
    let result = utils.capitalize("hello");
    expect(result).toBe("Hello");
  });

  it("Should convert date to epoch time", async () => {
    let result = utils.dateToNumber("2020-10-27");
    expect(result).toBe(1603756800000);
  });
});

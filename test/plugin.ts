import * as Carbon from "../src";

const testPlugin: Carbon.Plugin = (Base) => {
  (Base.prototype as any).newFunc = () => "Hello World";
};

describe("Testing plugin extend method", () => {
  test("Carbon.extend", () => {
    Carbon.extend(testPlugin);

    const carbon = new Carbon();

    expect((carbon as any).newFunc()).toBe("Hello World");
  });
});

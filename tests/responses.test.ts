import { transformOperationObj } from "../src/transform/operation";

describe("responses", () => {
  it("x", () => {
    const x = transformOperationObj({ responses: { 200: {} } }, { immutableTypes: false, version: 3 });
    expect(x).toEqual("  responses: {\n    status: 200;\n  }");
  });

  it("x", () => {
    const x = transformOperationObj({ responses: { 200: {}, 400: {} } }, { immutableTypes: false, version: 3 });
    expect(x).toEqual("  responses: {\n    status: 200;\n  } | {\n    status: 400;\n  }");
  });

  it("x", () => {
    const x = transformOperationObj(
      { responses: { 200: { description: "Success" }, 400: { description: "Bad Request" } } },
      { immutableTypes: false, version: 3 }
    );
    expect(x).toEqual(
      "  responses: {\n/** Success */\n    status: 200;\n  } | {\n/** Bad Request */\n    status: 400;\n  }"
    );
  });

  it("x", () => {
    const x = transformOperationObj(
      {
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { title: { type: "string" }, body: { type: "string" } },
                  required: ["title", "body"],
                },
              },
            },
          },
        },
      },
      { immutableTypes: false, version: 3 }
    );
    expect(x).toEqual(
      '  responses: {\n    status: 200;\n    content: {\n      "application/json": {\n"title": string;\n"body": string;\n\n};\n    }\n'
    );
  });
});

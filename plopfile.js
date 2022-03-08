const {
  viewExists,
  hooksExists,
  factoryExists,
  getNavigators,
  navigatorExists,
  componentExists,
  interfaceExists,
  navigatorExistsForViews,
} = require("./src/utils/componentExists");

module.exports = (plop) => {
  plop.setGenerator("Page", {
    description: "Create a new Function Page",
    prompts:
      getNavigators().length > 0
        ? [
            {
              type: "list",
              name: "navigator",
              message: "Belongs to which example?",
              default: getNavigators()[0],
              choices: () => getNavigators(),
            },
            {
              type: "input",
              name: "name",
              message: "What should it be called?",
              default: "Home Page",
              validate: (value, otherValues) => {
                if (/.+/.test(value)) {
                  if (otherValues.navigator != "Default") {
                    return navigatorExistsForViews(
                      value,
                      "components",
                      otherValues.navigator
                    )
                      ? "A component or container with this name already exists"
                      : true;
                  } else {
                    return viewExists(value)
                      ? "A component or container with this name already exists"
                      : true;
                  }
                }
                return "The name is required";
              },
            },
          ]
        : [
            {
              type: "input",
              name: "name",
              message: "What should it be called?",
              default: "Home Page",
              validate: (value) => {
                if (/.+/.test(value)) {
                  return viewExists(value)
                    ? "A component or container with this name already exists"
                    : true;
                }
                return "The name is required";
              },
            },
          ],
    actions: (data) => {
      let path = "src/containers/{{pascalCase name}}/Layout/index.tsx";

      let pathStyles = "src/containers/{{pascalCase name}}/Layout/styles.ts";

      let componentTemplate = "./__templates__/view/view_layout_index.js.hbs";

      let pathToIndex = "src/containers/{{pascalCase name}}/index.tsx";

      let pathToIndexData = "src/containers/{{pascalCase name}}/data.ts";

      let componentTemplateStyles = "./__templates__/view/styles.js.hbs";

      let pageToIndex = "src/pages/{{camelCase name}}/index.tsx";

      const actions = [
        {
          type: "add",
          path: path,
          templateFile: componentTemplate,
        },
        {
          type: "add",
          path: pathStyles,
          templateFile: componentTemplateStyles,
        },
        {
          type: "add",
          path: pathToIndex,
          templateFile: "./__templates__/view/view_index.js.hbs",
        },
        {
          type: "add",
          path: pathToIndexData,
          templateFile: "./__templates__/view/data.js.hbs",
        },
        {
          type: "add",
          path: pageToIndex,
          templateFile: "./__templates__/view/page_index.js.hbs",
        },
      ];
      return actions;
    },
  });
  plop.setGenerator("Component", {
    description: "Create a new Component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "Button",
        validate: (value) => {
          if (/.+/.test(value)) {
            return componentExists(value)
              ? "A component or container with this name already exists"
              : true;
          }
          return "The name is required";
        },
      },
    ],
    actions: (data) => {
      let patternImport = /\/\/ Import component here\n/g;

      const actions = [
        {
          type: "add",
          path: "src/components/{{pascalCase name}}/Layout/index.tsx",
          templateFile:
            "./__templates__/components/component_layout_index.js.hbs",
        },
        {
          type: "add",
          path: "src/components/{{pascalCase name}}/Layout/styles.ts",
          templateFile: "./__templates__/components/styles.js.hbs",
        },
        {
          type: "add",
          path: "src/components/{{pascalCase name}}/index.tsx",
          templateFile: "./__templates__/components/component_index.js.hbs",
        },
        {
          type: "add",
          path: "src/components/{{pascalCase name}}/data.ts",
          templateFile: "./__templates__/components/data.js.hbs",
        },
        {
          type: "modify",
          path: "src/components/index.ts",
          pattern: patternImport,
          templateFile: "./__templates__/components/import_component.js.hbs",
        },
      ];

      return actions;
    },
  });
  plop.setGenerator("Context", {
    description: "Create a new Context",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "usePerson",
        validate: (value) => {
          if (/.+/.test(value)) {
            return hooksExists(value)
              ? "A container with this name already exists"
              : true;
          }
          return "The name is required";
        },
      },
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "src/context/{{pascalCase name}}.tsx",
          templateFile: "./__templates__/context/new_hook.js.hbs",
        },
        {
          type: "add",
          path: "src/utils/interfaces/context/{{pascalCase name}}Interfaces.ts",
          templateFile: "./__templates__/utils/interfacesContext.tsx.hbs",
        },
        {
          type: "modify",
          path: "src/context/index.ts",
          pattern: /\/\/ Import context here\n/g,
          templateFile: "./__templates__/context/import_export_hooks.js.hbs",
        },
        {
          type: "modify",
          path: "src/utils/interfaces/index.ts",
          pattern: /\/\/ export interfaces\n/g,
          templateFile: "./__templates__/utils/export_interface.ts.hbs",
        },
        {
          type: "modify",
          path: "src/utils/interfaces/context/index.ts",
          pattern: /\/\/ export interfaces\n/g,
          templateFile: "./__templates__/utils/export_interface.ts.hbs",
        },
      ];
      return actions;
    },
  });
  plop.setGenerator("Factory", {
    description: "Create a new Factory",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "PaymentFactory",
        validate: (value) => {
          if (/.+/.test(value)) {
            return factoryExists(value)
              ? "A factory with this name already exists"
              : true;
          }
          return "The name is required";
        },
      },
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "src/utils/factories/{{pascalCase name}}Factory.tsx",
          templateFile: "./__templates__/utils/factory.tsx.hbs",
        },
        {
          type: "modify",
          path: "src/utils/factories/index.ts",
          pattern: /\/\/ export factory\n/g,
          templateFile: "./__templates__/utils/export_factoy.ts.hbs",
        },
      ];
      return actions;
    },
  });
  plop.setGenerator("Interfaces", {
    description: "Create a new interface",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "PaymentInterface",
        validate: (value) => {
          if (/.+/.test(value)) {
            return interfaceExists(value)
              ? "A component or container with this name already exists"
              : true;
          }
          return "The name is required";
        },
      },
    ],
    actions: () => {
      const actions = [
        {
          type: "add",
          path: "src/utils/interfaces/{{pascalCase name}}Interfaces.tsx",
          templateFile: "./__templates__/utils/interfacesContext.tsx.hbs",
        },
      ];
      return actions;
    },
  });
};

import * as inversify from "inversify";

export const repositoryContext = new inversify.Container({
  defaultScope: "Singleton",
});

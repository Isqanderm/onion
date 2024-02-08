import * as inversify from "inversify";

export const infrastructureContext = new inversify.Container({
  defaultScope: "Singleton",
});

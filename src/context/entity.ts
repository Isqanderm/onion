import * as inversify from "inversify";

export const entityContext = new inversify.Container({
  defaultScope: "Singleton",
});

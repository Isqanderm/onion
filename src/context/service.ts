import * as inversify from "inversify";

export const serviceContext = new inversify.Container({
  defaultScope: "Singleton",
});

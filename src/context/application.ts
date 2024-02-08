import * as inversify from "inversify";

export const applicationContext = new inversify.Container({
  defaultScope: "Singleton",
});

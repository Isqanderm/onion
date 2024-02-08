import * as inversify from "inversify";
import { decorate, injectable } from "inversify";
import { CONTAINER_KEY } from "../utils";
import { AbstractFactory } from "../entity/factory";

export function autoRegisterFabric(container: inversify.Container) {
  return function autoRegisterDecorator(params?: {
    name?: string | symbol;
    scope?: "Singleton" | "Transient" | "Request";
  }) {
    return function autoRegister(target: Function) {
      decorate(injectable(), target);
      let binding;

      binding = container.bind(params?.name || target.name).to(target as any);

      if (params?.scope === "Singleton") {
        binding.inSingletonScope();
      } else if (params?.scope === "Transient") {
        binding.inTransientScope();
      } else if (params?.scope === "Request") {
        binding.inRequestScope();
      }

      Reflect.defineMetadata(CONTAINER_KEY, container, target);
    };
  };
}

export function autoRegisterEntityDecoratorFabric(
  container: inversify.Container,
) {
  return function autoRegisterEntityDecorator(params?: {
    name?: string | symbol;
  }) {
    return function autoRegisterEntity(target: Function) {
      const name = params?.name || `Factory<${target.name}>`;
      const factory = AbstractFactory(target as any);

      container.bind(name).toFactory(() => factory);
    };
  };
}

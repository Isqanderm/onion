import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { UNDEFINED_INJECT_ANNOTATION } from "inversify/lib/constants/error_msgs";
import { proxyGetter } from "./proxyGetter";
import { CONTAINER_KEY } from "../utils";

export function LazyInject<T = unknown>(params?: { name?: string }) {
  return (
    target: DecoratorTarget,
    targetKey: string | symbol,
    indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>,
  ) => {
    const serviceName =
      params?.name ||
      (typeof target === "function" ? target.name : target.constructor.name);

    if (serviceName === undefined) {
      throw new Error(UNDEFINED_INJECT_ANNOTATION(serviceName));
    }

    const resolver = () => {
      const name = params?.name || Reflect.getMetadata("design:type", target, targetKey);
      const container = Reflect.getMetadata(CONTAINER_KEY, target.constructor);

      return container.get(name);
    };

    return proxyGetter(target, targetKey, resolver, true);
  };
}

import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { UNDEFINED_INJECT_ANNOTATION } from "inversify/lib/constants/error_msgs";
import { Metadata } from "inversify/lib/planning/metadata";
import { createTaggedDecorator, METADATA_KEY } from "inversify";

export function Inject<T = unknown>(params?: { name: string | symbol }) {
  return (
    target: DecoratorTarget,
    targetKey?: string | symbol,
    indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<T>,
  ) => {
    const serviceName =
      typeof target === "function" ? target.name : target.constructor.name;

    if (params?.name === undefined) {
      throw new Error(UNDEFINED_INJECT_ANNOTATION(serviceName));
    }

    return createTaggedDecorator(
      new Metadata(METADATA_KEY.INJECT_TAG, params?.name || target),
    )(target, targetKey, indexOrPropertyDescriptor);
  };
}

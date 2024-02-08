import "reflect-metadata";
import * as inversify from "inversify";
import { autoRegisterFabric } from "../src/autoRegister";
import { CONTAINER_KEY } from "../src/utils";

describe("autoRegisterFabric", () => {
  let container: inversify.Container;

  beforeEach(() => {
    container = new inversify.Container();
  });

  it("should register class without params", () => {
    const AutoRegister = autoRegisterFabric(container);

    class TestClass {}
    AutoRegister()(TestClass);

    expect(container.isBound('TestClass')).toBeTruthy();
    const instance = container.get('TestClass');
    expect(instance).toBeInstanceOf(TestClass);
  });

  it("should register class with name", () => {
    const AutoRegister = autoRegisterFabric(container);
    const serviceName = Symbol("TestService");

    class TestService {}
    AutoRegister({ name: serviceName })(TestService);

    expect(container.isBound(serviceName)).toBeTruthy();
    const serviceInstance = container.get<TestService>(serviceName);
    expect(serviceInstance).toBeInstanceOf(TestService);
  });

  it("should Singleton handle scope correctly", () => {
    const AutoRegister = autoRegisterFabric(container);

    class SingletonClass {}
    AutoRegister({ scope: "Singleton" })(SingletonClass);

    const firstInstance = container.get('SingletonClass');
    const secondInstance = container.get('SingletonClass');
    expect(firstInstance).toBe(secondInstance);
  });

  it("should Transient handle scope correctly", () => {
    const AutoRegister = autoRegisterFabric(container);

    class TransientClass {}
    AutoRegister({ scope: "Transient" })(TransientClass);

    const firstTransientInstance = container.get('TransientClass');
    const secondTransientInstance = container.get('TransientClass');
    expect(firstTransientInstance).not.toBe(secondTransientInstance);
  });

  it("should set metadata correctly", () => {
    const AutoRegister = autoRegisterFabric(container);

    class MetadataClass {}
    AutoRegister()(MetadataClass);

    const metadata = Reflect.getMetadata(CONTAINER_KEY, MetadataClass);
    expect(metadata).toBe(container);
  });
});

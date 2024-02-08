export type Newable<T> = new (...args: any[]) => T;

export function AbstractFactory<T extends Newable<any>>(Entity: T) {
  return function(plain: Partial<InstanceType<T>>): InstanceType<T> {
    const instance = new Entity();

    Object.getOwnPropertyNames(instance).forEach((prop) => {
      if (plain[prop as keyof Partial<InstanceType<T>>] !== undefined) {
        (instance as any)[prop] = plain[prop as keyof Partial<InstanceType<T>>];
      }
    });

    return instance;
  };
}

export type Factory<T> = (plain: Partial<T>) => T;

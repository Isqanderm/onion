import "reflect-metadata";
import { entityContext } from "./context/entity";
import { infrastructureContext } from "./context/infrastructure";
import { repositoryContext } from "./context/repository";
import { serviceContext } from "./context/service";
import { applicationContext } from "./context/application";
import {
  autoRegisterEntityDecoratorFabric,
  autoRegisterFabric,
} from "./autoRegister";

repositoryContext.parent = entityContext;
serviceContext.parent = repositoryContext;
infrastructureContext.parent = serviceContext;
applicationContext.parent = infrastructureContext;

export const Entity = autoRegisterEntityDecoratorFabric(entityContext);
export const Repository = autoRegisterFabric(repositoryContext);
export const Service = autoRegisterFabric(serviceContext);
export const Infrastructure = autoRegisterFabric(infrastructureContext);
export const Application = autoRegisterFabric(applicationContext);
export const Container = applicationContext;

export { Inject } from "./inject";
export { LazyInject } from "./lazyInject";

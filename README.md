# Onion

Onion is an innovative framework designed to simplify the development of large-scale frontend applications without being tied to any specific framework or library. It focuses on the business logic layer, providing a structured and modular approach to application development through the use of Onion Architecture.

## Framework Agnostic

A key feature of Onion is its framework-agnostic nature. It is built to work seamlessly across different development environments, ensuring that developers can integrate Onion into their projects regardless of the frontend framework or library they choose. This makes Onion a versatile and flexible choice for application development.

## Layered Architecture

Onion organizes applications into distinct layers, each with a specific responsibility:

### 1. **Entity Layer**
Houses the domain entities, representing the business model and its rules.

### 2. **Repository Layer**
Responsible for data access logic, abstracting the interaction with data sources.

### 3. **Service Layer**
Contains the core business logic, processing data and executing operations.

### 4. **Infrastructure Layer**
Provides technical capabilities like HTTP communication and state management tools.

### 5. **Application Layer**
Manages the application's flow, handling user interactions and responses.

## Decorators for IoC Container Integration

Onion introduces decorators to effortlessly add classes to the IoC (Inversion of Control) container for each layer:

- `@Entity`
- `@Repository`
- `@Service`
- `@Infrastructure`
- `@Application`

Additionally, the `@Inject` decorator is available to inject dependencies through constructors, further simplifying dependency management in your application.

## Examples

```ts
import { Service, Repository, Container, Inject } from "onion-core";

@Repository()
class UserRepository {}

@Service()
class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}
}

const userService = Container.get<UserService>('UserService');
```

## Enhancing Onion with onion-transformer

To enhance the usability of Onion, the `onion-transformer` library is recommended. It simplifies working with the Onion library by automatically applying necessary transformations during the TypeScript compilation process. This reduces boilerplate and streamlines the integration of Onion's IoC container and decorators into your project: https://www.npmjs.com/package/onion-transformer

## Examples with onion-transformer

### Before transformer

```ts
import { Service, Repository, Container, Inject } from "onion-core";

@Repository()
class UserRepository {}

@Service()
class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}
}

const userService = Container.get<UserService>('UserService');
```

### After Transformer

```ts
import { Service, Repository, Container, Inject } from "onion-core";

@Repository({ name: 'UserRepository' })
class UserRepository {}

@Service({ name: 'UserService' })
class UserService {
  constructor(@Inject({ name: 'UserRepository' }) private readonly userRepository: UserRepository) {}
}

const userService = Container.get<UserService>('UserService');
```

**Currently, transformer only works during compilation and cannot help at the time of development, but this will be fixed in future versions.**

## Installation

To start using Onion in your project, install it via npm:

```bash
npm install onion-core
```

## Contributing

Contributions to Onion are welcome! Whether it's feature enhancements, bug fixes, or documentation improvements, your input is valued. Please refer to our contributing guidelines for more details.

## License
Onion is licensed under the MIT License, allowing its use in both open-source and commercial projects with minimal restrictions.

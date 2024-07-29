# README - Learning Management System (LMS)

## Introduction

This project implements a Learning Management System (LMS) that enables the management of courses and tracking of course completions by users. It utilizes a combination of Hexagonal Architecture and Domain-Driven Design (DDD) to provide a modular and flexible design.

## Project Architecture

### Hexagonal Architecture

The application is designed following the principles of Hexagonal Architecture, which allows a clear separation between the domain logic and the input/output mechanisms. This facilitates changing and configuring different storage technologies and other external interfaces without affecting the core business logic.

### Domain-Driven Design

Employing DDD allows structuring the system around the domain of the problem, emphasizing understanding the domain reflected in the code. This is achieved by encapsulating business logic within well-defined domain entities and values, and using a ubiquitous language that is clear to both developers and stakeholders.

### Persistence

Thanks to the flexibility provided by the architecture, the implementation of persistence is carried out in the infrastructure module, which allows for easy switching of database technology or adapting the persistence mechanism as needed, without impacting domain logic.

## Testing

### Use Case Testing

Use case tests focus on the application layer, validating that the business logic functions correctly under various scenarios. These tests are crucial to ensure that the end-user requirements are effectively met.

### Integration Testing

Integration tests are conducted against the API endpoints, using a test database to verify correct integration between components and external infrastructure. These tests help ensure that the system functions as a coherent whole.

## Execution Commands

### Installing Dependencies
Before running the application, it is necessary to install the required dependencies. This can be done by executing the following command within the project directory:

```bash
pnpm install
```

### Generate Prisma Client
Generate the Prisma client to ensure that the Prisma schema is correctly implemented in your application. Run the following command:

```bash
npx prisma generate
```

### Starting the Project
To start all services necessary for the system to operate, including databases and application servers, use the following command:

```bash
make up
```

### Running Unit Tests

To run unit tests, which include tests of the application logic without interaction with external infrastructure:

```bash
make test
# or alternatively
pnpm test
```

### Running Integration Tests

To conduct integration tests, involving both the application and the test database:

```bash
make integration
```

## Conclusion

The use of Hexagonal Architecture and DDD in this LMS project provides a robust, flexible, and highly maintainable design, facilitating integration and adaptation to new technologies and emerging requirements.

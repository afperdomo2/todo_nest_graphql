# Todo GraphQL API

## Descripción

API de gestión de tareas (TODOs) desarrollada con NestJS y GraphQL. Este proyecto implementa un sistema completo de gestión de tareas con funcionalidades de creación, lectura, actualización, eliminación (CRUD) y agregaciones estadísticas.

## Características

- ✅ **API GraphQL completa** con Apollo Server
- ✅ **CRUD completo** para gestión de tareas
- ✅ **Validación de datos** con class-validator
- ✅ **Agregaciones estadísticas** (contadores y métricas)
- ✅ **Filtros dinámicos** para consultas
- ✅ **Tipado fuerte** con TypeScript
- ✅ **Documentación automática** del esquema GraphQL
- ✅ **Testing** con Jest

## Tecnologías

- **Backend**: NestJS v11
- **GraphQL**: Apollo Server v4
- **TypeScript**: v5.1
- **Validación**: class-validator, class-transformer
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## Instalación

```bash
# Instalar dependencias
npm install
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Debug mode
npm run start:debug
```

La aplicación estará disponible en:

- **API**: <http://localhost:3000>
- **GraphQL Playground**: <http://localhost:3000/graphql>

## Testing

```bash
# Tests unitarios
npm run test

# Tests con watch mode
npm run test:watch

# Tests end-to-end
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## Estructura del Proyecto

```text
src/
├── app.module.ts          # Módulo principal
├── main.ts               # Punto de entrada
├── schema.gql            # Esquema GraphQL generado
├── hello-world/          # Módulo de ejemplo
└── todos/                # Módulo de tareas
    ├── todos.resolver.ts    # Resolvers GraphQL
    ├── todos.service.ts     # Lógica de negocio
    ├── dto/                 # Data Transfer Objects
    │   ├── args/           # Argumentos para queries
    │   └── inputs/         # Inputs para mutations
    ├── entities/           # Entidades GraphQL
    └── types/              # Tipos personalizados
```

## API GraphQL

### Entidad Todo

```typescript
type Todo {
  id: Int!           # ID único de la tarea
  description: String! # Descripción de la tarea (máx. 50 caracteres)
  completed: Boolean!  # Estado de completado
}
```

### Queries Disponibles

#### Listar todas las tareas

```graphql
query GetTodos {
  todos {
    id
    description
    completed
  }
}
```

#### Listar tareas con filtro

```graphql
query GetCompletedTodos {
  todos(completed: true) {
    id
    description
    completed
  }
}
```

#### Obtener una tarea específica

```graphql
query GetTodo {
  todo(id: 1) {
    id
    description
    completed
  }
}
```

#### Agregaciones estadísticas

```graphql
query GetTodosStats {
  todosAggregations {
    total
    completedCount
    incompletedCount
  }
}
```

#### Contadores individuales

```graphql
query GetCounters {
  todosCount
  completedTodosCount
  incompletedTodosCount
}
```

### Mutations Disponibles

#### Crear una nueva tarea

```graphql
mutation CreateTodo {
  createTodo(data: {
    description: "Nueva tarea de ejemplo"
  }) {
    id
    description
    completed
  }
}
```

#### Actualizar una tarea

```graphql
mutation UpdateTodo {
  updateTodo(data: {
    id: 1
    description: "Tarea actualizada"
    completed: true
  }) {
    id
    description
    completed
  }
}
```

#### Eliminar una tarea

```graphql
mutation DeleteTodo {
  deleteTodo(id: 1)
}
```

### Ejemplos Avanzados

#### Query con fragmentos

```graphql
query TodosWithFragments {
  todo1: todo(id: 1) {
    ...todoFields
  }
  todo2: todo(id: 2) {
    ...todoFields
  }
}

fragment todoFields on Todo {
  id
  description
  completed
}
```

#### Query completa con metadatos

```graphql
query CompleteView {
  meta: todosAggregations {
    total
    completedCount
    incompletedCount
  }
  allTodos: todos {
    id
    description
    completed
  }
  pendingTodos: todos(completed: false) {
    id
    description
  }
}
```

## Validaciones

### CreateTodoInput

- `description`: Requerido, string, máximo 50 caracteres, no puede estar vacío

### UpdateTodoInput

- `id`: Requerido, entero, mínimo 1
- `description`: Opcional, string, máximo 50 caracteres
- `completed`: Opcional, boolean

## Scripts Disponibles

```bash
npm run build          # Compilar proyecto
npm run format         # Formatear código con Prettier
npm run lint           # Ejecutar ESLint
npm run start          # Iniciar en modo producción
npm run start:dev      # Iniciar en modo desarrollo (watch)
npm run start:debug    # Iniciar en modo debug
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

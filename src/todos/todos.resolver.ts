import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, FilterTodoArgs, UpdateTodoInput } from './dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'Lista todas las tareas',
  })
  findAll(@Args() filters: FilterTodoArgs): Todo[] {
    return this.todosService.findAll(filters);
  }

  @Query(() => Todo, {
    name: 'todo',
    description: 'Obtiene una tarea por su ID',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo, {
    name: 'createTodo',
    description: 'Crea una nueva tarea',
  })
  create(@Args('data') data: CreateTodoInput) {
    return this.todosService.create(data);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo',
    description: 'Actualiza una tarea existente',
  })
  update(@Args('data') data: UpdateTodoInput) {
    return this.todosService.update(data);
  }

  @Mutation(() => Boolean, {
    name: 'deleteTodo',
    description: 'Elimina una tarea existente',
  })
  delete(@Args('id', { type: () => Int }) id: number) {
    this.todosService.delete(id);
    return true;
  }

  // ! 1. Aggregations
  // Esta es una forma de obtener las agregaciones de las tareas
  @Query(() => Int, {
    name: 'todosCount',
    description: 'Cuenta el número de tareas',
  })
  count(): number {
    return this.todosService.count();
  }

  @Query(() => Int, {
    name: 'completedTodosCount',
    description: 'Cuenta el número de tareas completadas',
  })
  completedCount(): number {
    return this.todosService.countCompleted();
  }

  @Query(() => Int, {
    name: 'incompletedTodosCount',
    description: 'Cuenta el número de tareas incompletas',
  })
  incompletedCount(): number {
    return this.todosService.countIncompleted();
  }

  // ! 2. Aggregations - ObjectType
  // Esta es otra forma de obtener las agregaciones de las tareas
  @Query(() => AggregationsType, {
    name: 'todosAggregations',
    description: 'Obtiene las agregaciones de las tareas',
  })
  aggregations(): AggregationsType {
    return {
      total: this.todosService.count(),
      completedCount: this.todosService.countCompleted(),
      incompletedCount: this.todosService.countIncompleted(),
      totalTodosCompleted: this.todosService.countCompleted(), // Deprecated
    };
  }
}

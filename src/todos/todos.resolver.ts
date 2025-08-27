import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';

@Resolver()
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], {
    name: 'todos',
    description: 'Lista todas las tareas',
  })
  findAll(): Todo[] {
    return this.todosService.findAll();
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

  delete() {}
}

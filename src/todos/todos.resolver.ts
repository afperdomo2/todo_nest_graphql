import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoInput } from './dto/inputs/create-todo-input.dto';

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

  update() {}

  delete() {}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterTodoArgs } from './dto/args/filter-todo.args';
import { CreateTodoInput } from './dto/inputs/create-todo-input.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', completed: false },
    { id: 2, description: 'Todo 2', completed: true },
    { id: 3, description: 'Todo 3', completed: false },
  ];

  findAll(filters: FilterTodoArgs): Todo[] {
    const { completed } = filters;
    const filterCondition = (todo: Todo) =>
      completed !== undefined ? todo.completed === completed : true;
    return this.todos.filter(filterCondition);
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  create(todo: CreateTodoInput): Todo {
    const { description } = todo;
    const id = this.genId();
    const newTodo = { id, description, completed: false };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(data: Partial<Todo>): Todo {
    const { id, ...changes } = data;
    const todo = this.findOne(id);
    if (todo) {
      Object.assign(todo, changes);
    }
    return todo;
  }

  delete(id: number): void {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  genId(): number {
    return this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
  }
}

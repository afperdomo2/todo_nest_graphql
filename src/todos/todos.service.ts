import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo-input.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    { id: 1, description: 'Todo 1', completed: false },
    { id: 2, description: 'Todo 2', completed: true },
    { id: 3, description: 'Todo 3', completed: false },
  ];

  findAll(): Todo[] {
    return this.todos;
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

  update(id: number, updatedTodo: Partial<Todo>): Todo {
    const todo = this.findOne(id);
    if (todo) {
      Object.assign(todo, updatedTodo);
    }
    return todo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  genId(): number {
    return this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1;
  }
}

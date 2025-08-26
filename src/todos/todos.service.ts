import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

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

  create(todo: Todo) {
    this.todos.push(todo);
  }

  update(id: number, updatedTodo: Partial<Todo>) {
    const todo = this.findOne(id);
    if (todo) {
      Object.assign(todo, updatedTodo);
    }
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

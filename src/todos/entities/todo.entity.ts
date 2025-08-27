import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Entidad de una tarea' })
export class Todo {
  @Field(() => Int, { description: 'ID de la tarea' })
  id: number;

  @Field(() => String, { description: 'Descripción de la tarea' })
  description: string;

  @Field(() => Boolean, { description: 'Estado de la tarea' })
  completed: boolean = false;
}

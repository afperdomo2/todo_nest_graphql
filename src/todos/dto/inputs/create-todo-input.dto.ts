import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Descripción de la tarea' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}

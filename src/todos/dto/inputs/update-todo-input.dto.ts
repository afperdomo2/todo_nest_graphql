import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, { description: 'ID de la tarea' })
  @IsInt()
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field(() => String, {
    description: 'Descripción de la tarea',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  description?: string;

  @Field(() => Boolean, { description: 'Estado de la tarea', nullable: true })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

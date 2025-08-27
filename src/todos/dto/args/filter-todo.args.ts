import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@ArgsType()
export class FilterTodoArgs {
  @Field(() => Boolean, {
    description: 'Filtrar por tareas completadas',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

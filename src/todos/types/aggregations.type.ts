import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Agregaciones de tareas' })
export class AggregationsType {
  @Field(() => Int, { description: 'Número total de tareas' })
  total: number;

  @Field(() => Int, { description: 'Número de tareas completadas' })
  completedCount: number;

  @Field(() => Int, { description: 'Número de tareas incompletas' })
  incompletedCount: number;

  // NOTE: Obsoleto
  @Field(() => Int, {
    description: 'Número de tareas completadas',
    deprecationReason: 'Usa `completedCount` en su lugar',
  })
  totalTodosCompleted: number;
}

import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'hello',
    description: 'Devuelve un saludo en español',
  })
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Devuelve un número aleatorio',
  })
  randomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Float, {
    name: 'randomFromZeroTo',
    description:
      'Devuelve un número aleatorio entre 0 y un máximo (por defecto 6)',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, defaultValue: 6 }) to: number,
  ): number {
    return Math.floor(Math.random() * to);
  }
}

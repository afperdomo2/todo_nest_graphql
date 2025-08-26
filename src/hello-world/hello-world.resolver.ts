import { Float, Query, Resolver } from '@nestjs/graphql';

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
}

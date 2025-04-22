import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todo.input';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  contents?: string;

  @Field({ nullable: true })
  status?: 'PENDING' | 'COMPLETED';
}

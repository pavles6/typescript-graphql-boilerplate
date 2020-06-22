import { MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class PasswordInput {
  @MinLength(8)
  @Field()
  password: string;
}

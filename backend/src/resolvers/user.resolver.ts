import { Arg, Mutation, Resolver } from 'type-graphql';
import { UpdateUserInput } from '../dtos/inputs/user.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async updateProfile(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: UserModel
  ): Promise<UserModel> {
    return this.userService.update(user.id, data);
  }
}

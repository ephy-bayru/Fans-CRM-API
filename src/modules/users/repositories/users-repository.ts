import { BaseRepository } from 'src/core/repository/base.repository';
import { User } from '../entities/user.entity';
import { Op } from 'sequelize';

export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  async findUserNameOrEmail(
    userName: string,
    email: string,
  ): Promise<{ userName: boolean; email: boolean }> {
    const conflicts = { userName: false, email: false };

    const user = await this.model.findOne({
      where: {
        [Op.or]: [{ userName }, { email }],
      },
    });

    if (user) {
      conflicts.userName = user.userName === userName;
      conflicts.email = user.email === email;
    }

    return conflicts;
  }
}

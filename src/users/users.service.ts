import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbConnectionService } from 'src/db/db.service';
import users from 'src/db/schema/users';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private dbConnection: DbConnectionService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await (await this.dbConnection.db)
        .insert(users)
        .values(createUserDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('User Creation Failed', {
          cause: new Error(),
          description: error.message,
        });
      } else {
        throw new InternalServerErrorException('User Creation Failed', {
          cause: new Error(error.message),
          description: error.message,
        });
      }
    }
  }

  async findAll() {
    try {
      return await (await this.dbConnection.db).query.users.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Couldn't Fetch Users", {
        cause: new Error(error.message),
        description: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      return await (await this.dbConnection.db)
        .select()
        .from(users)
        .where(eq(users.id, id));
    } catch (error) {
      throw new InternalServerErrorException(
        `Couldn't fetch user with the provided id: ${id}`,
        {
          cause: new Error(error.message),
          description: error.message,
        },
      );
    }
  }

  async findByEmail(email: string) {
    try {
      return await (await this.dbConnection.db)
        .select()
        .from(users)
        .where(eq(users.email, email));
    } catch (error) {
      throw new InternalServerErrorException(
        `Couldn't fetch user with the provided email: ${email}`,
        {
          cause: new Error(error.message),
          description: error.message,
        },
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await (await this.dbConnection.db)
        .update(users)
        .set(updateUserDto)
        .where(eq(users.id, id));
    } catch (error) {
      throw new InternalServerErrorException(`Updating User ${id} Failed`, {
        cause: new Error(error.message),
        description: error.message,
      });
    }
  }

  async remove(id: number) {
    try {
      return await (await this.dbConnection.db)
        .delete(users)
        .where(eq(users.id, id));
    } catch (error) {
      throw new InternalServerErrorException(`Deleting User ${id} Failed`, {
        cause: new Error(error.message),
        description: error.message,
      });
    }
  }
}

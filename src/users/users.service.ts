import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import users from '../db/schema/users';
import { eq } from 'drizzle-orm';
import { DbConnectionService } from '../db/db.service';

@Injectable()
export class UsersService {
  constructor(private dbConnection: DbConnectionService) {}

  private async handleError(action: () => Promise<any>, errorMessage: string) {
    try {
      return await action();
    } catch (error) {
      throw new InternalServerErrorException(errorMessage, {
        cause: new Error(error.message),
        description: error.message,
      });
    }
  }

  async create(createUserDto: CreateUserDto) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.insert(users).values(createUserDto);
    }

    return await this.handleError(action, 'User Creation Failed');
  }

  async findAll() {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.query.users.findMany();
    }

    return await this.handleError(action, "Couldn't Fetch Users");
  }

  async findOne(id: number) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.select().from(users).where(eq(users.id, id));
    }

    return await this.handleError(
      action,
      `Couldn't fetch user with the provided id: ${id}`,
    );
  }

  async findByEmail(email: string) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.select().from(users).where(eq(users.email, email));
    }

    return await this.handleError(
      action,
      `Couldn't fetch user with the provided email: ${email}`,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.update(users).set(updateUserDto).where(eq(users.id, id));
    }

    return await this.handleError(action, `Updating User ${id} Failed`);
  }

  async remove(id: number) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.delete(users).where(eq(users.id, id));
    }

    return await this.handleError(action, `Deleting User ${id} Failed`);
  }
}

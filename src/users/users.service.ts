import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import users from '../db/schema/users';
import { eq } from 'drizzle-orm';
import { DbConnectionService } from '../db/db.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT_ROUNDS: number;
  constructor(private dbConnection: DbConnectionService) {
    this.SALT_ROUNDS = 10;
  }

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

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePasswords(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async create(createUserDto: CreateUserDto) {
    const db = await this.dbConnection.db;
    let payload = { ...createUserDto };

    if (createUserDto?.password) {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      payload = { ...createUserDto, password: hashedPassword };
    }
    async function action() {
      return await db.insert(users).values(payload);
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

  async findByUsername(username: string) {
    const db = await this.dbConnection.db;
    async function action() {
      return await db.select().from(users).where(eq(users.username, username));
    }

    return await this.handleError(
      action,
      `Couldn't fetch user with the provided username: ${username}`,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const db = await this.dbConnection.db;
    let payload = { ...updateUserDto };

    if (updateUserDto?.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      payload = { ...updateUserDto, password: hashedPassword };
    }
    async function action() {
      return await db.update(users).set(payload).where(eq(users.id, id));
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

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbConnectionService } from 'src/db/drizzle.service';
import users from 'src/db/schema/users';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private dbConnection: DbConnectionService) {}

  async create(createUserDto: CreateUserDto) {
    return (await this.dbConnection.db).insert(users).values(createUserDto);
  }

  async findAll() {
    return (await this.dbConnection.db).query.users.findMany();
  }

  async findOne(id: number) {
    return (await this.dbConnection.db)
      .select()
      .from(users)
      .where(eq(users.id, id));
  }

  async findByEmail(email: string) {
    return (await this.dbConnection.db)
      .select()
      .from(users)
      .where(eq(users.email, email));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return (await this.dbConnection.db)
      .update(users)
      .set(updateUserDto)
      .where(eq(users.id, id));
  }

  async remove(id: number) {
    return (await this.dbConnection.db).delete(users).where(eq(users.id, id));
  }
}

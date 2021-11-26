import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // create the instance in memory
    const user = this.repo.create({ email, password });

    // actually persist to the db. save instance will trigger hooks
    return this.repo.save(user);

    // alteratively, this saves to the db as well.
    // however, it does not trigger hooks
    // this.repo.save({ email, password });
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<null | User> {
    // approach 1, find and update. two requests
    // it triggers the hook
    const user = await this.repo.findOne(id);

    if (!user) {
      return null;
    }

    Object.assign(user, attrs);

    return this.repo.save(user);

    // alteratively, this update to the db in one trip
    // however, it does not trigger hooks
    // return this.repo.update(id, attrs);
  }

  async remove(id: number): Promise<null | User> {
    // approach 1, find and delete. two requests
    // it triggers the hook
    const user = await this.repo.findOne(id);
    if (!user) {
      return null;
    }

    return this.repo.remove(user);

    // alteratively, this delete from the db in one trip
    // however, it does not trigger hooks
    // return this.repo.delete(id);
  }
}

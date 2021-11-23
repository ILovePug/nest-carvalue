import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  private logInsert() {
    console.log('inserted user with id', this.id);
  }

  @AfterUpdate()
  private logUpdate() {
    console.log('updated user with id', this.id);
  }

  @AfterRemove()
  private logRemove() {
    console.log('removed user with id', this.id);
  }
}

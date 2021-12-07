import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(
    () => Report, // link to Report Entity after all entites have been loaded. thats why it is callback
    (report) => report.user, // which property it maps to in report entity
  )
  reports: Report[];
  @Column({ nullable: true })
  gender: string | null;

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

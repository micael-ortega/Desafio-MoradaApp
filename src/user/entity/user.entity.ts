import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
    length: 120,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
    length: 320,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 420,
  })
  description: string;

  @Column({
    nullable: false,
    type: 'char',
    length: 60,
  })
  password: string;

  @Column({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}

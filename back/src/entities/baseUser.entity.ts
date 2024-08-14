import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  birthDate: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

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
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  birthDate: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;
}

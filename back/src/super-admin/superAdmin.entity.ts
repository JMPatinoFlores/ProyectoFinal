import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'super_admins',
})
export class SuperAdmins {
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
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  password: string;

  @Column({ type: 'boolean', default: true })
  superAdmin: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  email!: string

  @Column({ nullable: false })
  password!: string

  @Column({ nullable: false })
  droneId!: string

  @Column({ nullable: false })
  uuid!: string
}

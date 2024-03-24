import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false,
        type: 'varchar',
    })
    name: string

    @Column({
        nullable: false,
        type: 'varchar',
        unique: true,
    })
    email: string

    @Column({
        nullable: false,
        type: 'varchar',
    })
    description: string

    @Column({
        nullable: false,
        type: 'char',
    })
    password: string

    @Column({
        type: "timestamp without time zone",
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date


    @Column({
        type: "timestamp without time zone",
        default: () => 'CURRENT_TIMESTAMP'
    })
    updateAt: Date
}
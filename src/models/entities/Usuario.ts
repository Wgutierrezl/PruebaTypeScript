import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity({name:'usuarios'})
export class Usuarios {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  nombre!: string;

  @Column({ unique: true })
  correo!: string;

  @Column()
  contrasena!: string;

  @Column()
  rol?: string;

  /* @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[]; */
}


import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Pedidos } from "./Pedidos";


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

  @OneToMany(() => Pedidos, pedido => pedido.usuario)
  pedidos?: Pedidos[];
}


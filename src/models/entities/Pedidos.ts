import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuario";


@Entity({name:'pedidos'})
export class Pedidos {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  usuario_id!: string;

  @Column({ unique: true })
  producto!: string;

  @Column()
  cantidad!: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pedido!: Date;

  @ManyToOne(() => Usuarios, usuario => usuario.pedidos)
  usuario!: Usuarios;

  /* @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[]; */
}


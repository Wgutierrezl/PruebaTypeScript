import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


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

  /* @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[]; */
}


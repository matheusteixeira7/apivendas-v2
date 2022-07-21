import { Customer } from '@modules/customers/typeorm/entities/customer'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { OrdersProducts } from './orders-products'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
    customer: Customer

  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.order, {
    cascade: true
  })
    ordersProducts: OrdersProducts[]

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}

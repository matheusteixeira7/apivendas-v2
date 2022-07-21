import { Product } from '@modules/products/infra/typeorm/entities'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Order } from './order'

@Entity('ordersProducts')
export class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @ManyToOne(() => Order, order => order.ordersProducts)
  @JoinColumn({ name: 'orderId' })
    order: Order

  @ManyToOne(() => Product, product => product.ordersProducts)
  @JoinColumn({ name: 'productId' })
    product: Product

  @Column()
    orderId: string

  @Column()
    productId: string

  @Column('decimal')
    price: number

  @Column('int')
    quantity: number

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}

import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders-products'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.product)
    ordersProducts: OrdersProducts[]

  @Column()
    name: string

  @Column('decimal')
    price: number

  @Column('int')
    quantity: number

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}

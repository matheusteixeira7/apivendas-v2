import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddProductIdToOrders1658185802192 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('ordersProducts', new TableColumn({
      name: 'productId',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('ordersProducts', new TableForeignKey({
      name: 'ordersProductsProduct',
      columnNames: ['productId'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ordersProducts', 'ordersProductsProduct')
    await queryRunner.dropColumn('ordersProducts', 'productId')
  }
}

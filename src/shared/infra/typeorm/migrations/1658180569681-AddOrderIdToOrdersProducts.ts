import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddOrderIdToOrdersProducts1658180569681 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('ordersProducts', new TableColumn({
      name: 'orderId',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('ordersProducts', new TableForeignKey({
      name: 'ordersProductsOrder',
      columnNames: ['orderId'],
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ordersProducts', 'ordersProductsOrder')
    await queryRunner.dropColumn('ordersProducts', 'orderId')
  }
}

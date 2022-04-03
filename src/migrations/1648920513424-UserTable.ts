import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTable1648920513424 implements MigrationInterface {
    name = 'UserTable1648920513424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdm" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdm"`);
    }

}

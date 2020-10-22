import { MigrationInterface, QueryRunner } from 'typeorm';

export class Polls1603382301872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (621596882, 'iPhone 12 Mini', 2, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (323361012, 'iPhone 12', 6, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (111268928, 'iPhone 12', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (169975156, 'iPhone 12 Pro Max', 1, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (706227916, 'iPhone 12 Pro Max', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (380413897, 'iPhone 12 Pro', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (776935230, 'iPhone 12 Pro', 3, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (458766742, 'iPhone 12 Pro', 5, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (595041986, 'iPhone 12 Pro', 2, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (954290716, 'iPhone 12 Mini', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (526137113, 'iPhone 12 Mini', 5, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (215089547, 'iPhone 12', 2, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (895393467, 'iPhone 12', 4, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (698896331, 'iPhone 12', 1, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (199834423, 'iPhone 12 Mini', 6, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (924228830, 'iPhone 12 Mini', 4, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (164448647, 'iPhone 12 Mini', 6, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (706176563, 'iPhone 12 Pro', 2, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (222864809, 'iPhone 12 Mini', 4, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (910091583, 'iPhone 12 Pro', 6, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (350895320, 'iPhone 12 Mini', 1, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (236279756, 'iPhone 12', 5, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (571606677, 'iPhone 12 Mini', 4, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (847995650, 'iPhone 12 Pro', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (698345880, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (985740302, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (624786325, 'iPhone 12 Pro Max', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (167457529, 'iPhone 12 Pro Max', 6, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (549267992, 'iPhone 12 Mini', 2, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (561341331, 'iPhone 12 Pro', 2, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (676026246, 'iPhone 12 Mini', 3, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (927374175, 'iPhone 12 Mini', 4, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (913954351, 'iPhone 12 Pro Max', 4, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (315959980, 'iPhone 12 Pro Max', 6, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (952825187, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (317719506, 'iPhone 12 Pro Max', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (203466453, 'iPhone 12 Pro Max', 6, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (546009593, 'iPhone 12 Pro', 2, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (330280414, 'iPhone 12 Mini', 6, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (948122559, 'iPhone 12 Pro', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (112590811, 'iPhone 12 Mini', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (503299685, 'iPhone 12 Mini', 3, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (117246786, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (776668694, 'iPhone 12 Pro', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (616501308, 'iPhone 12 Pro', 5, false);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (230717661, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (499849054, 'iPhone 12 Mini', 6, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (625570294, 'iPhone 12 Mini', 6, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (794025248, 'iPhone 12', 3, true);
        insert into i_phone_poll ("BAN", model, quantity, started_process) values (773144080, 'iPhone 12 Pro', 5, false);    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

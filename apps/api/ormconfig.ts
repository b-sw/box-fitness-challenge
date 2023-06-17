import { Training, User, Winner } from '@box-fc/shared/types';
import { config } from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

config();
/*
  Be careful!
    "synchronize: true" should only be used for early development.
    It causes db schema to sync if it detects there's a mismatch between db schema and entities.
    This behaviour may lead to an automatic table drop.
 */
const entities = [User, Training, Winner];

export const dbConfig: MysqlConnectionOptions = {
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: entities,
    // synchronize: true,
    charset: 'utf8mb4_unicode_ci',
};

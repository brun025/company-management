import { DataSource } from 'typeorm';
import { dataSourceOptions } from './data-source.config';
import { AdminSeeder } from '../../src/shared/database/seeds/admin.seed';

export const seedDataSourceOptions = {
  ...dataSourceOptions,
  seeds: [AdminSeeder],
};

export default new DataSource(seedDataSourceOptions as any);
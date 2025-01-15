import { seedDataSourceOptions } from '../../../config/typeorm.config';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

async function runAllSeeders() {
  const dataSource = new DataSource(seedDataSourceOptions as any);

  try {
    await dataSource.initialize();
    await runSeeders(dataSource);
    console.log('✅ Seeding completed successfully');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

runAllSeeders()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
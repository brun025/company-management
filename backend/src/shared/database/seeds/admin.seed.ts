import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcryptjs';
import { UserTypeORM } from '../../../infra/database/typeorm/entities/user.typeorm.entity';

export class AdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(UserTypeORM);

    const existingAdmin = await userRepository.findOne({
      where: { email: 'admin@admin.com' }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = userRepository.create({
        name: 'Administrator',
        email: 'admin@admin.com',
        password: hashedPassword,
      });

      await userRepository.save(admin);
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  }
}
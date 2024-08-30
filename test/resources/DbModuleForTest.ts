import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config({ path: '.env.test' });
export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.TESTDB_HOST,
  port: +process.env.TESTDB_PORT,
  username: process.env.TESTDB_USER,
  password: process.env.TESTDB_PASSWORD,
  database: process.env.TESTDB_DBNAME,
  autoLoadEntities: true,
  synchronize: true,
  dropSchema: true,
});

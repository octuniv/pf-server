import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from './data-source';

(async () => {
  const seederOptions: SeederOptions = {
    seeds: ['dist/src/db/seeds/**/*.seed.js'],
    factories: ['dist/src/db/factories/**/*.factory.js'],
  };

  const options: DataSourceOptions & SeederOptions = Object.assign(
    seederOptions,
    dataSourceOptions,
  );

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})();

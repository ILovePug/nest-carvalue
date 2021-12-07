const dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true, // make sure migration runs at every test
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL, // come from heroku
      migrationsRun: true, // make sure migration runs on start up
      entities: ['**/*.entity.js'],
      // heroku specific config
      ssl: {
        rejectUnauthorized: false,
      },
    });
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;

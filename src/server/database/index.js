import mongoose, { connect, connection } from 'mongoose';
import migrations from './migrations';
import Migration from '@models/migration';
import logger from '@utils/logger';

mongoose.set('debug', (collectionName, method, query, doc) => {
  logger.info({ message: `${collectionName}.${method} ${JSON.stringify(query)}` });
});

export default async function init() {
  if (connection.readyState === 1) {
    return;
  }
  try {
    let dbConnectionURI = process.env.DB_CONNECTION_URI;
    if (process.env.DB_AUTHSOURCE) {
      dbConnectionURI = `${dbConnectionURI}&authSource=${process.env.DB_AUTHSOURCE}`;
    }
    await connect(dbConnectionURI);

    logger.info({ message: 'Database connected. Starting migrations..' });
    await migrate();
    logger.info({ message: 'Migrations complete' });
  } catch (error) {
    console.log(error);
    logger.error({
      message: { customMessage: 'Failed to connect to database.', errorMessage: error.message, stack: error.stack },
    });
    process.exit(1);
  }
}

async function migrateNewChanges(migrationsToPerform) {
  for await (let migrationName of migrationsToPerform) {
    const migration = migrations[migrationName];
    try {
      await migration(mongoose);
      logger.info({ message: `Migration complete: ${migrationName}` });
      await Migration.create({
        name: migrationName,
      });
    } catch (error) {
      logger.error({
        message: {
          customMessage: `Error encountered while migrating : ${migrationName}`,
          errorMessage: error.message,
          stack: error.stack,
        },
      });
      process.exit(1);
    }
  }
}

async function migrate() {
  let migrationsToPerform = Object.keys(migrations);
  let previousMigrations = await Migration.find();
  if (previousMigrations && previousMigrations.length > 0) {
    previousMigrations = previousMigrations.map((migration) => migration.name);
    migrationsToPerform = migrationsToPerform.filter(
      (migrationName) => previousMigrations.indexOf(migrationName) === -1
    );
  }

  if (migrationsToPerform.length > 0) {
    await migrateNewChanges(migrationsToPerform);
  } else {
    logger.info({ message: 'Nothing new to migrate' });
  }
}

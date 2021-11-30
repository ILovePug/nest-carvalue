import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// wipe out the test db before every e2e test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {} // only throw when the test file does not exist. we do not care
});

// typeorm by default maintains the connection between each e2e test run.
// this causes error due to we are wiping out the db file between the tests.
// the solution here is to close the connection after each test
global.afterEach(async () => {
  const conn = await getConnection();
  await conn.close();
});

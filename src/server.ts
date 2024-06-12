import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    const { ConnectionStates } = await mongoose.connect(
      config.db_url_local as string,
    );

    if (ConnectionStates.connected) {
      console.log('Db is connected');
    }

    app.listen(config.port, () => {
      console.log(`App is listing at http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

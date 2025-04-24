// Largely ripped from Discord sample app https://github.com/discord/discord-example-app/blob/main/utils.js
import 'dotenv/config';
import {Collection, Db, MongoClient} from 'mongodb';

export async function DiscordRequest(endpoint: string, options: any) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/egreco12/tee-time-manager, 1.0.0)',
    },
    ...options
  });

  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }

  // return original response
  return res;
}

export async function InstallGlobalCommands(appId: string | undefined, commands: any) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Our only global, I hope
export const collections: { times?: Collection } = {}

export async function connectToDatabase () {
  const client: MongoClient = new MongoClient(process.env.DB_CONN_STRING!!);
  await client.connect();
  const db: Db = client.db(process.env.DB_NAME);
  const timesCollection: Collection = db.collection(process.env.TIMES_COLLECTION_NAME!!);
  collections.times = timesCollection;   
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${timesCollection.collectionName}`);
}
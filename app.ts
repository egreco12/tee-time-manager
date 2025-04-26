import 'dotenv/config';
import express, { Application } from "express";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';

import { testCommand } from './src/test_command';
import { createTeeTimeCommand } from './src/create_tee_time_command';
import { TeeTime } from './src/models/tee_time';
import { connectToDatabase } from './utils';
import { handleModalResponse } from './src/modals';

const app: Application = express();
const PORT = process.env.PORT || '3000';

connectToDatabase().then(() => {
  app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY!!), async (req, res): Promise<any> => {
    const { id, type, data } = req.body;

    /**
     * Handle verification requests
     */
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }

    if (type === InteractionType.APPLICATION_COMMAND) {
      const { name } = data;

      switch (name) {
        case 'test':
          return testCommand(res);
        case 'create-tee-time':
          console.log("creating tee time");
          return createTeeTimeCommand(req, res);
      }

      console.error(`unknown command: ${name}`);
      return res.status(400).json({ error: 'unknown command' });
    }

  if (type === InteractionType.MODAL_SUBMIT) {
    return handleModalResponse(req, res);
  }

    console.error('unknown interaction type', type);
    return res.status(400).json({ error: 'unknown interaction type' });
  });

  app
    .listen(Number(PORT), 'localhost', function () {
      console.log(`Server is running on port ${PORT}.`);
    })
    .on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        console.log('Error: address already in use');
      } else {
        console.log(err);
      }
    })
}).catch((error: Error) => {
  console.error("Database connection failed", error);
  process.exit();
});

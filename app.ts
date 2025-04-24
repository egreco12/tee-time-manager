import 'dotenv/config';
import express, { Application } from "express";
import {
  ButtonStyleTypes,
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  MessageComponentTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';

import {testCommand} from './src/test_command';
import {createTeeTimeCommand, CreateTeeTimeCommandPayload} from './src/create_tee_time_command';

const app: Application = express();
const PORT = process.env.PORT || '3000';


app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY!!), async (req, res): Promise<any> => {
  const { id, type, data } = req.body;
  console.log(JSON.stringify(req.body));

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
        const payload: CreateTeeTimeCommandPayload = {
          GolfCourse: data.options[0].value,
          DateAndTime: data.options[1].value,
          Slots: data.options[2].value,
          Owner: data.options[3].value
        }

        return createTeeTimeCommand(payload, res);
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
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
  });

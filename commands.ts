import 'dotenv/config';
import { InstallGlobalCommands } from './utils';

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const CREATE_TEE_TIME_COMMAND = {
  name: 'create-tee-time',
  description: 'Create a new tee time',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
  options: [
    {
      type: 3,
      name: 'golf-course',
      description: 'Where is the golf being played',
      required: true,
    },
    {
      type: 3,
      name: 'date-and-time',
      description: 'When is the golf being played',
      required: true,
    },
    {
      type: 4,
      name: 'slots',
      description: 'Number of slots available',
      required: true,
    },
    {
      type: 9,
      name: 'owner',
      description: 'Discord user who owns the tee time',
      required: true,
    },
  ],
}

const ALL_COMMANDS = [TEST_COMMAND, CREATE_TEE_TIME_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
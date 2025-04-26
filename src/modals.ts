import 'constants';
import { DiscordCustomId } from './constants';
import { createTeeTime } from './services/tee_times';
import { TeeTime, validateAndCreateTeeTimeModel } from './models/tee_time';

export async function handleModalResponse(req: any, res: any) {
  console.log(JSON.stringify(req.body.data));
  const modalId: string = req?.body?.data?.custom_id;

  switch (modalId) {
    case DiscordCustomId.CREATE_TEE_TIME_MODAL:
      // Validate response and create tee time
      const teeTime: TeeTime = validateAndCreateTeeTimeModel(req.body.data);
      await createTeeTime(teeTime);
      return res.send({
        "type": 4,
        "data": {
          "tts": false,
          "content": "Tee time created!",
          "embeds": [],
          "allowed_mentions": { "parse": [] }
        }
      });
    default:
      console.log(`Invalid modal id provided: ${modalId}`);
  }
}
import 'constants';
import { DiscordCustomId } from './constants';

export async function handleModalResponse(req: any, res: any) {
  console.log(JSON.stringify(req.body.data));
  const modalId: string = req?.body?.data?.custom_id;

  switch (modalId) {
    case DiscordCustomId.CREATE_TEE_TIME_MODAL:
      res.send({
        "type": 4,
        "data": {
          "tts": false,
          "content": "Congrats on sending your command!",
          "embeds": [],
          "allowed_mentions": { "parse": [] }
        }
      });
    default:
      console.log(`Invalid modal id provided: ${modalId}`);
  }
}
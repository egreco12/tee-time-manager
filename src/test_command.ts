import { InteractionResponseType } from "discord-interactions";

export async function testCommand(res: any){ 
  return res.send({
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: `hello world!`,
  },
});
}
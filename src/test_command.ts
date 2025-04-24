import { InteractionResponseType } from "discord-interactions";

export async function testCommand(res: any){ 
  return res.send({
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    // Fetches a random emoji to send from a helper function
    content: `hello world!`,
  },
});
}
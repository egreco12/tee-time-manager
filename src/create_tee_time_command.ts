import { InteractionResponseType } from "discord-interactions";
import { TeeTime } from "./models/tee_time";

// TODO: we need a datastore
export async function createTeeTimeCommand(payload: TeeTime, res: any){
  return res.send({
  type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  data: {
    content: `
    New tee time created:
    Golf Course: ${payload.GolfCourse}
    Date and Time: ${payload.DateAndTime}
    Slots: ${payload.Slots}
    Owner: ${payload.Owner}
    `,
  },
});
}
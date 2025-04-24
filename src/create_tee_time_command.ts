import { InteractionResponseType } from "discord-interactions";

export interface CreateTeeTimeCommandPayload {
  GolfCourse: string,
  DateAndTime: string,
  Slots: number,
  Owner: string
}

// TODO: we need a datastore
export async function createTeeTimeCommand(payload: CreateTeeTimeCommandPayload, res: any){
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
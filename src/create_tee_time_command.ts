import { InteractionResponseType } from "discord-interactions";
import { TeeTime } from "./models/tee_time";

// TODO: we need a datastore
export async function createTeeTimeCommand(req: any, res: any) {
  return res.send({
    type: InteractionResponseType.MODAL,
    data: {
      custom_id: "create_tee_time_modal",
      title: "Create Tee Time",
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "tee_time_owner",
              label: "Owner",
              style: 1,
              min_length: 1,
              max_length: 100,
              placeholder: "Your Name (probably)",
              required: true
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "tee_time_course",
              label: "Golf Course",
              style: 1,
              min_length: 1,
              max_length: 100,
              placeholder: "Nile Shrine",
              required: true
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "tee_time_datetime",
              label: "Date and Time (format: MM/DD/YYYY HH:MM)",
              style: 1,
              min_length: 1,
              max_length: 16,
              placeholder: "10/18/1989 16:20",
              required: true
            }
          ]
        },
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "tee_time_slots",
              label: "Total Slots Available",
              style: 1,
              min_length: 1,
              max_length: 1,
              placeholder: "4",
              required: true
            }
          ]
        },
      ]
    }
  });
}
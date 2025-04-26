export interface TeeTime {
  GolfCourse: string,
  DateAndTime: string,
  Slots: number,
  Owner: string
}


// Parse out tee time from the modal response.
// TODO: create an input type and do validations on each field
export function validateAndCreateTeeTimeModel(req: any): TeeTime {
  const teeTime: TeeTime = {
    Owner: req.components[0].components[0].value,
    GolfCourse: req.components[1].components[0].value,
    DateAndTime: req.components[2].components[0].value,
    Slots: req.components[3].components[0].value,
  };

  return teeTime;
}
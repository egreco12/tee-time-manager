import { collections } from '../../utils'
import { TeeTime } from '../models/tee_time'

export async function createTeeTime(teeTime: TeeTime) {
  return await collections.times?.insertOne(teeTime);
}
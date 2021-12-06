import { IRoom, ISeat } from './IArrangement';
import { IUser } from './IUser';

export interface IReservation {
  id: number;
  startTime: Date;
  endTime: Date;
  topic?: string;
  status: number;
  seat: ISeat;
  room: IRoom;
  user: IUser;
}

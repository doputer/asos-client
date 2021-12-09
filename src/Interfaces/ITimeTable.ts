import { IReservation } from './IReservation';

export interface ITimeTable extends IReservation {
  start_time: Date;
  end_time: Date;
}

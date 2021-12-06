import { IFloor } from './IFloor';
import { IReservation } from './IReservation';

export interface ISeat {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  floor: IFloor;
  reservations: IReservation[];
}

export interface IRoom {
  id: number;
  name: string;
  maxUser: number;
  x: number;
  y: number;
  width: number;
  height: number;
  floor: IFloor;
}

export interface IFacility {
  id: number;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  floor: IFloor;
}

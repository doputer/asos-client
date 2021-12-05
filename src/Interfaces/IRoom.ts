import { IFloor } from './IFloor';

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

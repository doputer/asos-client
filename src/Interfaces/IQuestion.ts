import { IAnswer } from './IAnswer';

export interface IQuestion {
  id: number;
  title: string;
  message: string;
  status: number;
  answer?: IAnswer;
}

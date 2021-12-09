export interface ITimeTableRow {
  key: number;
  time: string;
  topic?: string;
  participant: string;
  startTime: Date;
  endTime: Date;
}

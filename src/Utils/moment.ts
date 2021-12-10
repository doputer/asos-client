import moment from 'moment';

export const getToday = (): moment.Moment => moment();

export const getDate = (date: moment.Moment | null): Date =>
  moment(date).toDate();

export const getFormatDate = (date: Date, format: string): string =>
  moment(date).format(format);

export const getMomentFormatDate = (
  date: Date,
  format: string,
): moment.Moment => moment(moment(date), format);

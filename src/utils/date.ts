import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const generateDatePost = () => new Date();

export const generateDatePostFormatted = (date : number | Date)  =>
  format(date, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  });

export const publishedDateRelativeToNow = (date: number | Date) =>
  formatDistanceToNow(date, {
    locale: ptBR,
  });
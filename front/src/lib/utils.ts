import Moment from 'moment';

// function __timeFormatter (t: string | Array<(string|number)>, fmt: string) {
function __timeFormatter (t: any, fmt: string) {
  return Moment(t).format('YYYY-MM-DD HH:mm');
  // let result;
  // // always returns a string
  // function pad2(n: any) { return (n < 10 ? '0' : '') + n; }
  // console.log(t);
  // if (typeof +t === 'number') t = new Date(+t);
  // else if (typeof t === 'string') t = new Date(t);
  // console.log(t);
  // switch (fmt) {
  //   case '-':
  //     // tslint:disable-next-line: max-line-length
  //     result = `${t.getFullYear()}-${pad2(t.getMonth() + 1)}-${pad2(t.getDate())} ${pad2(t.getHours())}:${pad2(t.getMinutes())}`;
  //     break;
  //   default:
  //     result = new Date(t).getTime();
  // }
  // return result;
}

export {
  __timeFormatter,
};

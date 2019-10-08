import Moment from 'moment';

// function __timeFormatter (t: string | Array<(string|number)>, fmt: string) {
export function __timeFormatter (t: any, fmt: string) {
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

export function __debouce (func: any, delay: number, immediate: boolean) {
  let timer: any = null;
  return function (this: any) {
    const context = this;
    const args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 根据距离上次触发操作的时间是否到达delay来决定是否要现在执行函数
      const doNow = !timer;
      // 每一次都重新设置timer，就是要保证每一次执行的至少delay秒后才可以执行
      timer = setTimeout(function () {
        timer = null;
      }, delay);
      // 立即执行
      if (doNow) {
        func.apply(context, args);
      }
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, delay);
    }
  };
}

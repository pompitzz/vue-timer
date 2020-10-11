class StopWatch {
  constructor(hour = 0, minute = 0, second = 0, millisecond = 0) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.millisecond = millisecond;
  }

  toString() {
    const { hour, minute, second, millisecond } = this;
    let timeStr = `${twoDigitsTime(minute)}:${twoDigitsTime(second)}:${threeDigitsTime(millisecond)}`;
    if (hour > 0) {
      timeStr = `${twoDigitsTime(hour)}:${timeStr}`;
    }
    return timeStr
  }

  goAudio(audioIntervalSecond) {
    return this.second % audioIntervalSecond === 0;
  }
}

class TimeUtils {
  static buildStopwatch = (diffTime) => {
    const millisecond = Math.floor(diffTime % 1000);
    const second = Math.floor(diffTime / 1000);
    const minute = Math.floor((second / 60));
    const hour = Math.floor((minute / 60));
    return new StopWatch(hour, minute % 60, second % 60, millisecond);
  }
  static calculateDiffTime = (startTime) => TimeUtils.getNowTime() - startTime;
  static getNowTime = () => new Date().getTime();
}

const twoDigitsTime = (time) => time < 10 ? `0${time}` : `${time}`;
const threeDigitsTime = (time) => time < 10 ? `00${time}` : time < 100 ? `0${time}` : time;
export {
  StopWatch,
  TimeUtils,
}

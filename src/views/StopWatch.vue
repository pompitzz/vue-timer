<template>
  <v-container class="stop-watch-container">
    <div class="stop-watch-box absolute-center text-center">
      <div class="mb-3 display-1">
        {{ time.toString() }}
      </div>
      <div>
        <v-btn v-if="this.interval === null"
               class="mr-2"
               @click="start"
               v-text="'Start'"
        />
        <v-btn v-else
               class="mr-2"
               @click="stop"
               v-text="'Stop'"
        />
        <v-btn :disabled="this.interval === null"
               class="mr-2"
               @click="records.push(time.toString())"
               v-text="'Record'"
        />
        <v-btn :disabled="this.startTime === null"
               @click="end"
               v-text="'End'"
        />
      </div>
      <v-text-field label="알림 반복 주기(초)"
                    :value="audioIntervalSecond"
                    @input="changeAudioIntervalSecond"
                    class="mt-5 px-15"
                    outlined
                    type="number"
                    counter="3"
                    :disabled="this.interval !== null"
      />
      <div v-for="record in records"
           :key="record"
      >
        {{ record }}
      </div>
    </div>
  </v-container>
</template>

<script>
import {StopWatch, TimeUtils} from "@/StopWatch.js";

export default {
  name: "StopWatch",
  data() {
    return {
      time: new StopWatch(),
      interval: null,
      startTime: null,
      stopTime: null,
      records: [],
      audio: new Audio(require(`../audio/sound3.mp3`)),
      audioIntervalSecond: 0,
      lastSecond: 0,
    };
  },
  watch: {
    audioIntervalSecond() {
      const subStringSecond = String(this.audioIntervalSecond).substring(0, 3);
      this.audioIntervalSecond = parseInt(subStringSecond);
    }
  },
  methods: {
    start() {
      if (!this.startTime) {
        this.startTime = TimeUtils.getNowTime();
      } else {
        this.startTime = this.recalculateStartTime();
        this.stopTime = null;
      }
      this.interval = setInterval(this.intervalHandler, 10);
    },
    stop() {
      this.initInterval();
      this.stopTime = TimeUtils.getNowTime();
      this.records.push(this.time.toString());
    },
    end() {
      this.initInterval();
      this.startTime = null;
      this.time = new StopWatch()
      this.records = [];
    },
    initInterval() {
      clearInterval(this.interval);
      this.interval = null;
    },
    intervalHandler() {
      const diffTime = TimeUtils.calculateDiffTime(this.startTime);
      this.time = TimeUtils.buildStopwatch(diffTime);
      if (this.time.second !== this.lastSecond) {
        if (this.time.goAudio(this.audioIntervalSecond)) {
          if (this.audio.currentTime > 0) {
            this.audio.pause();
            this.audio.currentTime = 0;
          }
          this.audio.play();
        }
        // console.log(this.time.minute, this.time.second, this.time.millisecond);
        this.lastSecond = this.time.second;
      }
    },
    recalculateStartTime() {
      const pausedTime = TimeUtils.getNowTime() - this.stopTime;
      return this.startTime + pausedTime;
    },
    changeAudioIntervalSecond(number) {
      if (number > 999) {
        return;
      }
      this.audioIntervalSecond = number;
    }
  },
}
</script>

<style scoped>
.stop-watch-container {
  width: 100%;
  height: 100%;
}

@media (min-width: 700px) {
  .stop-watch-box {
    width: 360px !important;
  }
}

.stop-watch-box {
  width: 80%;
  background-color: #949494;
  border-radius: 8px;
  border: #949494 1px solid;
  padding: 20px;
}
</style>

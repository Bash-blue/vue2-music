<template>
  <div class="song-detail" v-if="song">
    <div class="imgdiv">
      <img
        class="anima"
        :class="{ playing: playing }"
        :src="song.al.picUrl"
        alt=""
      />
    </div>

    <SongLyric
      style="margin-top: 25px"
      :currentTime="currentTime"
      :duration="duration"
      :playing="playing"
    />
    <div class="progressbar">
      <div class="">
        <div class="progress">
          <div
            class="mask"
            :style="{ width: (userValue / duration) * 100 + '%' }"
          ></div>
          <input
            type="range"
            style="width: 100%"
            min="0"
            :max="duration"
            v-model.number="userValue"
            @input="inputing = true"
            @change="
              inputing = false;
              $emit('change-play-time', userValue);
            "
          />
        </div>
        <div class="span">{{ currentTime | time2mmss }}</div>
        <div class="span2">{{ duration | time2mmss }}</div>
      </div>

      <div class="controls">
        <button>模</button>
        <button>上</button>
        <button v-if="playing" @click="pplayMusic" class="playbar-button">
          暂停
        </button>
        <button v-else @click="ppauseMusic" class="playbar-button">播放</button>
        <button>下</button>

        <button>列</button>
      </div>
    </div>
  </div>
</template>

<script>
import SongLyric from "@/components/SongLyric.vue";

export default {
  components: {
    SongLyric,
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
    currentSong: Object,
  },
  data: function () {
    return {
      song: null,
      userValue: this.currentTime,
      inputing: false,
      showDisc: false,
    };
  },
  methods: {
    pplayMusic() {
      this.$emit("playMusic");
    },
    ppauseMusic() {
      this.$emit("pauseMusic");
    },
  },
  created: function () {
    this.axios
      .get("/song/detail", {
        params: {
          ids: this.$route.query.id,
        },
      })
      .then((res) => {
        this.song = res.data.songs[0];
        this.$emit("play-this-song", res.data.songs[0]);
      });
  },
  watch: {
    currentTime: function (currentTime) {
      if (!this.inputing) {
        this.userValue = currentTime;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.progressbar {
  margin-top: 60px;
  .progress {
    margin-left: 35px;
    position: relative;
    width: 80%;
    height: 1px;
    background: rgba(220, 215, 215, 0.547);
    .mask {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      background-color: rgb(1, 1, 1);
      z-index: 0;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
  .span {
    margin-left: 20px;
    position: absolute;
    left: 0;
    bottom: 90px;
    font-size: 12px;
  }
  .span2 {
    position: absolute;
    right: 25px;
    bottom: 90px;
    font-size: 12px;
  }
  .controls {
    height: 50px;
    margin-top: 48px;
    margin-left: 20px;
    margin-bottom: 14px;
    display: flex;

    width: 90%;
    justify-content: space-between;
  }
}

.song-detail {
  max-height: 600px; /* 设置一个固定的最大高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: linear-gradient(
    to right,
    rgba(37, 37, 37, 0.721),
    rgba(67, 43, 9, 0.704)
  );
  overflow: hidden; /* 隐藏溢出的内容 */
  .imgdiv {
    position: relative;
    margin: 0 auto;
    margin-top: 60px;
  }
  .imgdiv:after {
    content: "";
    position: absolute;
    z-index: 5;
    top: -10vw;
    left: 14vw;
    width: 31vw;
    height: 28vw;
    background: url(https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/28513977227/139b/06a3/e1e3/929b3b4b49bf5c6ef05c795e9e1f2516.png)
      no-repeat center center / cover;
  }
  .anima {
    animation: rotate 3s linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .playing {
    animation-play-state: running;
  }
}
</style>
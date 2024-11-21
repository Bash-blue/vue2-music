<template>
  <div class="song-detail" v-if="song">
    <button @click="$router.back()">返回</button>
    <h3>SongDetail - {{ $route.query.id }}</h3>
    <img
      class="anima"
      :class="{ playing: playing }"
      style="width: 200px; height: 200px; border-radius: 50%"
      :src="song.al.picUrl"
      alt=""
    />

    <div>
      <div class="">
        <div class="span">{{ currentTime | time2mmss }}</div>
        <div class="progress" style="width: 60%; height: 20px; background: red">
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

        <div class="span">{{ duration | time2mmss }}</div>
      </div>

      <div class="controls">
        <button>上</button>
        <button>播放</button>
        <button>暂停</button>
        <button>下</button>
        <button>模</button>
        <button>列</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSongId: Number,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
  },
  data: function () {
    return {
      song: null,
      userValue: this.currentTime,
      inputing: false,
    };
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

.progress {
  position: relative;
  .mask {
    position: absolute;
    bottom: 0;
    left: 0;
    // width: 50%;
    height: 100%;
    background-color: aqua;
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
.song-detail {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .anima {
    animation: rotate 3s linear;
    animation-iteration-count: infinite;
    animation-play-state: paused;
  }
  .playing {
    animation-play-state: running;
  }
}
</style>

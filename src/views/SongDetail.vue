<template>
  <div class="song-detail" v-if="song" >
    <div class="background" :style="{ 'background-image': `url(${song.al.picUrl})` }"></div>

    <div style="z-index:1">
    <div class="imgdiv" :style="{ '--degree': rotateState ? '30deg' : '0deg' }">
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
      :currentSongId="currentSongId"
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
       <transition name="fade-slide">
          <div class="mode-text" v-if="showModeText" key="mode-text">
            {{ playbackModeText }}
          </div>
        </transition>
        <button
          v-if="currentButtonIndex === 0"
          class="button1"
          @click="toggleButton"
        >
          <img src="../assets/danqubofang(1).png" alt="pattern" />
        </button>
        <button
          v-else-if="currentButtonIndex === 1"
          class="button1"
          @click="toggleButton"
        >
          <img src="../assets/xunhuanbofang.png" alt="pattern" />
        </button>
        <button v-else class="button1" @click="toggleButton">
          <img src="../assets/ziyuan.png" alt="pattern" />
        </button>

        <button class="button2" @click="playPreviousSong">
          <img src="../assets/diyiyeshouyeshangyishou.png" alt="up" />
        </button>
        <button v-if="playing" @click="pplayMusic" class="playbar-button">
          <img src="../assets/zanting.png" alt="pause" />
        </button>
        <button v-else @click="ppauseMusic" class="playbar-button">
          <img src="../assets/bofangplay.png" alt="play" />
        </button>
        <button class="button2" @click="playNextSong">
          <img src="../assets/zuihouyiyemoyexiayishou.png" alt="down" />
        </button>

        <button class="button1" @click="toggleSongList">
          <img src="../assets/bofangliebiao(1).png" alt="list" />
        </button>
      </div>
    </div>
    <transition name="slide">
      <section v-if="showSongList" class="listbar">
        <ul>
          <NewsonglistCard
            v-for="item in currentSongList"
            :key="item.id"
            :item="item"
            @play-this-song="setCurrentSong"
            :currentSongId="currentSongId"
            :playing="playing"
          ></NewsonglistCard>
        </ul>
      </section>
    </transition>
  </div>
  </div>
</template>

<script>
import SongLyric from "@/components/SongLyric.vue";
import NewsonglistCard from "@/components/NewsonglistCard.vue";
export default {
  components: {
    SongLyric,
    NewsonglistCard,
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
    currentTime: Number,
    duration: Number,
    currentSong: Object,
    currentSongList: Array,
  },
  data: function () {
    return {
      song: null,
      userValue: this.currentTime,
      inputing: false,
      showDisc: false,
      rotateState: false,
      showSongList: false,
      currentButtonIndex: 1,
      playbackModeText: "当前为列表循环",
      showModeText: false, // 控制提示文本显示
    };
  },
  methods: {
    singleplay() {
      this.$refs.audioEle.loop = true;
      console.log(1111111111111111111111111111111111111111);
    },
    toggleButton() {
      this.showModeText = !this.showModeText;
      this.currentButtonIndex = (this.currentButtonIndex + 1) % 3;
      switch (this.currentButtonIndex) {
        case 0:
          this.playbackModeText = "当前为单曲循环";
          this.$emit("singleplay")
          break;
        case 1:
          this.playbackModeText = "当前为列表循环";
          this.$emit("listplay")
          break;
        case 2:
          this.playbackModeText = "当前为随机播放";
          this.$emit("randomplay")
          break;
      }
      this.$emit("change-playback-mode", this.currentButtonIndex);
      setTimeout(() => {
        this.showModeText = !this.showModeText; // 三秒后再次取反
      }, 2000);
    },
    pplayMusic() {
      this.$emit("playMusic");
      this.rotateState = true; // 设置旋转状态为真
    },
    ppauseMusic() {
      this.$emit("pauseMusic");
      this.rotateState = false; // 设置旋转状态为假
    },
    toggleSongList() {
      this.showSongList = !this.showSongList;
    },
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
      this.$emit("update:ScurrentSongId", item.id);
    },
    playPreviousSong() {
      const currentIndex = this.currentSongList.findIndex(
        (song) => song.id === this.currentSongId
      );
      if (currentIndex > 0) {
        this.setCurrentSong(this.currentSongList[currentIndex - 1]);
      } else {
        // 如果已经是第一首，则播放最后一首
        this.setCurrentSong(
          this.currentSongList[this.currentSongList.length - 1]
        );
      }
    },
  playNextSong() {
      const currentIndex = this.currentSongList.findIndex(
        (song) => song.id === this.currentSongId
      );
      if (this.currentButtonIndex === 2) { // 随机播放
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * this.currentSongList.length);
        } while (randomIndex === currentIndex); // 确保不是当前歌曲
        this.setCurrentSong(this.currentSongList[randomIndex]);
      } else if (currentIndex < this.currentSongList.length - 1) {
        this.setCurrentSong(this.currentSongList[currentIndex + 1]);
      } else {
        this.setCurrentSong(this.currentSongList[0]);
      }
    },
    fetchSongDetail(songId) {
      this.axios
        .get("/song/detail", {
          params: {
            ids: songId, // 使用 songId 参数
          },
        })
        .then((res) => {
          this.song = res.data.songs[0];
          this.$emit("play-this-song", this.song);
        })
        .catch((error) => {
          console.error("获取歌曲详情失败:", error);
        });
    },
  },
  created: function () {
    if (this.currentSongId) {
      this.fetchSongDetail(this.currentSongId);
    } else {
      this.tip = "路由参数不合法";
    }
  },
  watch: {
    currentTime: function (currentTime) {
      if (!this.inputing) {
        this.userValue = currentTime;
      }
    },
    currentSongId(newId) {
      this.fetchSongDetail(newId); // 当 currentSongId 变化时，使用新值重新获取歌曲详情
    },
  },
};
</script>

<style lang="less" scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter, .fade-slide-leave-to /* 2.1.8+ */ {
  transform: translateY(-20px);
  opacity: 0;
}
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
align-items: center;
    width: 90%;
    justify-content: space-between;
    .mode-text {
      margin-top: 10px;
      font-size: 10px;
      padding: 5px 10px;
      color: #ffffff; /* 根据你的设计调整颜色 */
      position: absolute;
      top: 76%;
      left: 38%;
      background-color: #777373f1;
      border-radius: 12px;
    }

    button {
      width: 50px;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(46, 49, 49, 0);
      border: 1px solid rgba(0, 0, 0, 0);
    }
    .button1 {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: auto;
      }
    }
    .button2 {
      width: 35px;
      height: 35px;
    }
  }
}

.song-detail {
  max-height: 600px; /* 设置一个固定的最大高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative; /* 设置相对定位 */
  overflow: hidden; /* 隐藏溢出的内容 */
  
.background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover; /* 确保背景图覆盖整个区域 */
  background-position: center; /* 背景图居中显示 */
  background-repeat: no-repeat; /* 背景图不重复 */
  filter: blur(10px); /* 添加模糊效果 */
  z-index: 0; /* 确保背景在最底层 */
}
  .listbar {
    background-color: #ffffff;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    overflow: hidden;
    z-index: 6;
    &.slide-enter-active,
    &.slide-leave-active {
      transition: all 0.3s ease;
    }
    &.slide-enter, &.slide-leave-to /* 2.1.8+ */ {
      transform: translateY(-100%);
      opacity: 0;
    }
    ul {
      height: 350px; /* 设置固定高度 */
      overflow-y: auto; /* 允许垂直滚动 */
      margin: 0; /* 重置默认的外边距 */
      padding: 0; /* 重置默认的内边距 */
    }
  }
  .imgdiv {
    position: relative;
    margin-left: 25%;
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
    transition: transform 0.3s; /* 添加过渡效果 */
    transform: rotate(var(--degree, 0deg)); /* 使用CSS变量控制旋转 */
    transform-origin: 50% 16%;
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
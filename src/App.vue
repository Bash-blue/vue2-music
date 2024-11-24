<template>
  <div id="app">
    <div class="netease-music">
      <img src="@/assets/wangyiyunyinle.png" alt="网易云音乐图标" />
      <div class="download-button" @click="downloadApp">下载APP</div>
    </div>
    <div style="margin-top: 40px" v-if="currentPath === '/'">
      <img src="@/assets/huiyuan.png" alt="开通会员" />
    </div>
    <nav v-if="$route.meta.showNav">
      <div class="nav-item">
        <router-link to="/" :class="{ active: $route.path === '/' }"
          >推荐音乐</router-link
        >
      </div>
      <div class="nav-item">
        <router-link to="/hot" :class="{ active: $route.path === '/hot' }"
          >热歌榜</router-link
        >
      </div>
      <div class="nav-item">
        <router-link to="/search" :class="{ active: $route.path === '/search' }"
          >搜索</router-link
        >
      </div>
    </nav>

    <router-view
      @playMusic="playMusic"
      @pauseMusic="pauseMusic"
      @play-this-song="currentSong = $event"
      :currentSongId="currentSong?.id"
      :playing="playing"
      :duration="duration"
      :currentTime="currentTime"
      @change-play-time="$refs.audioEle.currentTime = $event"
      @send-hot-songs="handleHotSongs"
      :hotSongs="hotSongs"
    />

    <audio
      v-if="currentSong"
      style="height: 30px"
      autoplay
      :src="`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`"
      @play="playing = true"
      @pause="playing = false"
      @durationchange="duration = $event.target.duration"
      @timeupdate="currentTime = $event.target.currentTime"
      ref="audioEle"
    ></audio>

    <PlayBar
      v-if="currentSong && !$route.meta.hidePlaybar"
      :currentSong="currentSong"
      :playing="playing"
      @start-play-song="$refs.audioEle.play()"
      @pause-play-song="$refs.audioEle.pause()"
    />
  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";

export default {
  components: {
    PlayBar,
  },
  data: function () {
    return {
      duration: 0,
      currentTime: 0,
      currentSong: null,
      playing: false,
      currentPath: this.$route.path, // 添加当前路由路径到data中
      hotSongs: []
    };
  },
  watch: {
    "$route.path": function (newPath) {
      // 当路由路径变化时，更新currentPath
      this.currentPath = newPath;
    },
  },
  methods: {
    downloadApp() {
      alert("下载APP功能尚未实现");
    },

    playMusic() {
      console.log("Play method called22222222222");
      // this.playing = !this.playing;
      this.$refs.audioEle.pause();
    },
    pauseMusic() {
      console.log("Play method called111111111111111111");
      this.$refs.audioEle.play();
      // this.playing = !this.playing;
    },
     handleHotSongs(songs) {
      this.hotSongs = songs; // 接收子组件发送的数据
    },
  },
};
</script>


<style lang="less">
@navbar-height: 85px;
@nav-item-height: 40px;
@active-color: #c20d0d;
@background-color: #d43c33;
@button-background-color: white;
@button-color: #d43c33;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: @navbar-height; // 确保内容不会被固定的导航栏遮挡
}

.netease-music {
  background-color: @background-color;
  color: white;
  padding: 10px;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  height: @navbar-height;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  img {
    margin-right: 10px;
    height: 32px;
  }

  .download-button {
    background-color: @button-background-color;
    color: @button-color;
    padding: 7px 18px;
    border-radius: 20px;
    margin-left: auto;
    cursor: pointer;
  }
}

nav {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  position: fixed;
  top: @navbar-height;
  left: 0;
  right: 0;
  z-index: 999;

  .nav-item {
    display: inline-block;
    margin-right: 20px;
    height: @nav-item-height;
    line-height: @nav-item-height;

    a {
      text-decoration: none;
      color: #000;

      &.active {
        color: @active-color;
        border-bottom: 2px solid @active-color;
      }
    }
  }
}
</style>

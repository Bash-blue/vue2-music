<template>
  <div id="app">
    <nav v-if="$route.meta.showNav">
      <router-link to="/">推荐音乐</router-link>
      <router-link to="/hot">热歌榜</router-link>
      <router-link to="/search">搜索</router-link>
    </nav>
    <router-view
      @play-this-song="currentSong = $event"
      :currentSongId="currentSong?.id"
      :playing="playing"
      :duration="duration"
      :currentTime="currentTime"
      @change-play-time="$refs.audioEle.currentTime = $event"
    />

    <audio
      v-if="currentSong"
      controls
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
      currentTime:0,
      currentSong: null,
      playing: false,
    };
  },
};
</script>


<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: space-around;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

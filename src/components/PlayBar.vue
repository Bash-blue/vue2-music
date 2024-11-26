<template>
  <div class="playbar">
    <img
      :class="{ playing: playing }"
      @click="gotoPlaySongPage"
      style="width: 30px; height: 30px"
      :src="
        currentSong.song
          ? currentSong.picUrl
          : currentSong.al
          ? currentSong.al.picUrl
          : currentSong.artists
          ? currentSong.album.artist.img1v1Url
          : ''
      "
      alt=""
    />
    <div class="playbar-info">
      <h3 class="playbar-title">{{ currentSong.name }}</h3>
<span v-if="currentSong.song && currentSong.song.artists[0].name">
    {{ currentSong.song.artists[0].name }}
  </span>
  <span v-else-if="currentSong.ar && currentSong.ar[0].name">
    {{ currentSong.ar[0].name }}
  </span>
    </div>

    <button
      v-if="playing"
      @click.stop="$emit('pause-play-song')"
      class="playbar-button"
    >
      <img src="../assets/bofang.png" alt="pause" />
    </button>
    <button
      v-else
      @click.stop="$emit('start-play-song')"
      class="playbar-button"
    >
      <img src="../assets/24gl-pauseCircle.png" alt="play" />
    </button>

    <button
      ref="playButton"
      class="playbar-button"
      @click.stop="clickshowSongList"
    >
      <img src="../assets/16gf-playlistHeart.png" alt="list" />
    </button>
    <!-- <button class="playbar-button">列表</button> -->
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
</template>

<script>
import NewsonglistCard from "@/components/NewsonglistCard.vue";

export default {
  props: [
    "currentSong",
    "playing",
    "newsong",
    "currentSongId",
    "currentSongList",
  ],
  data: function () {
    return {
      showSongList: false, // 从父组件接收当前歌曲列表
    };
  },
  components: {
    NewsonglistCard,
  },
  methods: {
    gotoPlaySongPage: function () {
      this.$router.push({
        path: "/song",
        query: {
          // xx: JSON.stringify(this.currentSong), // 不要这样写 URL太长可能会丢失
          id: this.currentSong.id,
        },
      });
    },
    clickshowSongList: function () {
      this.showSongList = !this.showSongList;
    },
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
      this.$emit("update:currentSongId", item.id);
    },
  },
};
</script>

<style lang="less" scoped>
.playbar {
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.96);
  position: fixed;
  bottom: -1px;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  color: #3a3939;
  font-size: 14px;
  box-shadow: 0px -3px 20px rgba(0, 0, 0, 0.5);

  &-cover {
    width: 40px; /* 根据需要调整大小 */
    height: 40px; /* 根据需要调整大小 */
    border-radius: 50%; /* 使图片变为圆形 */
    overflow: hidden; /* 隐藏超出圆形部分的图片 */
    position: relative;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 50%; /* 使图片变为圆形 */
  }

  .playing {
    animation: spin 5s linear infinite; /* 旋转动画 */
  }
  // 旋转动画的 keyframes
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .listbar {
    background-color: #ffffff;
    width: 100%;
    margin-bottom: 150px;
    position: absolute;
    bottom: -90px;
    left: 0;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.5);
     transition: all 0.3s ease;
    overflow: hidden;
     &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s ease;
    }
    &.slide-enter, &.slide-leave-to /* 2.1.8+ */ {
      transform: translateY(100%);
      opacity: 0;
    }
    ul {
      height: 350px; /* 设置固定高度 */
      overflow-y: auto; /* 允许垂直滚动 */
      margin: 0; /* 重置默认的外边距 */
      padding: 0; /* 重置默认的内边距 */
    }
  }
  .playbar-button {
    img {
      width: 30px;
      height: 30px;
    }
  }
  &-cover {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    margin-right: 10px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    margin-right: 20px;
  }

  &-title {
    font-size: 12px;
    margin-left: 10px;
  }

  &-artist {
    font-size: 12px;
  }

  &-button {
    padding: 5px 10px;
    background-color: #c8c3c300;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin: 5px;
    outline: none;

    &:hover {
      background-color: #c8c3c300;
    }
  }
  .playbar-info{
    span{
      font-size: 12px;
      margin-left: 10px;
    }
  }
}
</style>

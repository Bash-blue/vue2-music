<template>
  <div class="playbar">
    <img
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
    </div>

    <button
      v-if="playing"
      @click.stop="$emit('pause-play-song')"
      class="playbar-button"
    >
      <img
        src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207667955/0616/bd45/3537/50928579d6616a7f811d19da1162e149.png"
        alt="pause"
      />
    </button>
    <button
      v-else
      @click.stop="$emit('start-play-song')"
      class="playbar-button"
    >
      <img
        src="https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207669669/f020/7908/a749/34315097c835773c4e003e72fbbae607.png"
        alt="play"
      />
    </button>

    <button
      ref="playButton"
      class="playbar-button"
      @click.stop="clickshowSongList"
    >
      列表
    </button>
    <!-- <button class="playbar-button">列表</button> -->
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
  </div>
</template>

<script>
import NewsonglistCard from "@/components/NewsonglistCard.vue";
export default {
  props: ["currentSong", "playing", "newsong", "currentSongId","currentSongList"],
  data: function () {
    return {
      showSongList: false,// 从父组件接收当前歌曲列表
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
  background-color: rgba(0, 0, 0);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  .listbar {
    background-color: #ffffff;
    width: 100%;
    margin-bottom: 150px;
    position: absolute;
    bottom: -90px;
    left: 0;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.5);
    ul {
      height: 350px; /* 设置固定高度 */
      overflow-y: auto; /* 允许垂直滚动 */
      margin: 0; /* 重置默认的外边距 */
      padding: 0; /* 重置默认的内边距 */
    }
  }
  .playbar-button {
    width: 50px;
    height: 35px;
    img {
      width: 30px;
      height: 25px;
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
    margin-bottom: 17px;
  }

  &-artist {
    font-size: 12px;
  }

  &-button {
    padding: 5px 10px;
    background-color: #c20d0d;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
    outline: none;

    &:hover {
      background-color: #d43c33;
    }
  }
}
</style>

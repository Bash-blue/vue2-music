<template>
  <div class="playbar" @click="gotoPlaySongPage">
    <img
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
      暂停
    </button>
    <button
      v-else
      @click.stop="$emit('start-play-song')"
      class="playbar-button"
    >
      播放
    </button>
    <button class="playbar-button">
      列表
    </button>
  </div>
</template>

<script>
export default {
  props: ["currentSong", "playing"],
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

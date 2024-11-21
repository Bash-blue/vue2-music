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
    <h3>{{ currentSong.name }}</h3>

    <button v-if="playing" @click.stop="$emit('pause-play-song')">暂停</button>
    <button v-else @click.stop="$emit('start-play-song')">播放</button>
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
  height: 50px;
  background-color: lightblue;
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
}
</style>

<template>
  <div style="margin: 0px 0 50px 0">
    <div class="hotop">
      <div class="hotopct">
        <div class="u-hmsprt hoticon"></div>
        <div class="hottime">更新日期：11月22日</div>
      </div>
    </div>
    <ul class="HomeHot">
      <NewsonglistCard
        v-for="item in hotsong"
        :key="item.id"
        :item="item"
        :currentSongId="currentSongId"
        :playing="playing"
        @play-this-song="setCurrentSong"
      ></NewsonglistCard>
    </ul>
  </div>
</template>

<script>
import NewsonglistCard from "@/components/NewsonglistCard.vue";
export default {
  components: {
    NewsonglistCard,
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
  },
  data: function () {
    return {
      // NewsonglistCard: [],
      hotsong: [],
    };
  },
  methods: {
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
      this.$emit('update:hotSongs', this.hotsong);
      this.$emit("update:HcurrentSongId", item.id); // 触发事件传递当前歌曲的 id
    },
    sendHotSongsToParent() {
      // 获取前八个热门歌曲项
      const hotSongs = this.hotsong.slice(0, 100);
      // 触发事件，将数据传递给父组件
      this.$emit('send-hot-songs', hotSongs);
      
    },
  },
  created: function () {
    this.axios.get("/music/playlist/detail?id=3778678").then((response) => {
      console.log("1111111", response.data);
      this.hotsong = response.data.playlist.tracks;
       this.sendHotSongsToParent();
    });
  },
};
</script>

<style lang="less" scoped>
.hotop {
  position: relative;
  padding-top: 38.9%;
  overflow: hidden;
  background: url(//s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252…=)
    no-repeat;
  background-size: contain;
  margin-top: 38px;
  .hotopct {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    box-sizing: border-box;
    .u-hmsprt {
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
    }
    .hoticon {
      width: 142px;
      height: 67px;
      background-position: -24px -30px;
    }
    .hottime {
      margin-top: 10px;
      color: hsla(0, 0%, 100%, 0.8);
      font-size: 12px;
      -webkit-transform: scale(0.91);
      -ms-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-transform-origin: left top;
      -ms-transform-origin: left top;
      transform-origin: left top;
    }
  }
  &::after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
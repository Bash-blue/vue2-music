<template>
  <div v-if="tip">{{ tip }}</div>
  <div v-else-if="playlist">
    <div
      class="playtop"
      :style="{ backgroundImage: 'url(' + playlist.coverImgUrl + ')' }"
    ></div>
    <span>{{ formattedPlayCount   }}</span>
    <img :src="playlist.coverImgUrl" alt="" />
    <h5>{{ playlist.name }}</h5>
    <div>
      <h3 class="u-smtitle">歌曲列表</h3>
      <ul>
        <!-- <li v-for="item in playlist.tracks" :key="item.id">{{ item.name }}</li> -->
        <NewsonglistCard
          v-for="item in playlist.tracks"
          :key="item.id"
          :item="item"
          :currentSongId="currentSongId"
          :playing="playing"
          @play-this-song="setCurrentSong"
        ></NewsonglistCard>
      </ul>
    </div>
  </div>
</template>

<script>
import NewsonglistCard from "@/components/NewsonglistCard.vue";

export default {
  data: function () {
    return {
      tip: "",
      playlist: null,
    };
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
  },
  components: {
    NewsonglistCard,
  },
  methods: {
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
      this.$emit("update:playlistTracks", this.playlist.tracks); // 触发事件传递 playlist.tracks
      this.$emit("update:DcurrentSongId", item.id); // 触发事件传递当前歌曲的 id
    },
  },
  created: function () {
    if (this.$route.query.id) {
      this.axios
        .get("/music/playlist/detail", {
          params: { id: this.$route.query.id },
        })
        .then((response) => {
          console.log(response.data);
          this.playlist = response.data.playlist;
        });
    } else {
      this.tip = "路由参数不合法";
    }
  },
    computed: {
    formattedPlayCount() {
      if (!this.playlist) return '0';
      const { playCount } = this.playlist;
      if (playCount < 10000) {
        return playCount.toString(); // 不超过十万正常显示
      } else if (playCount < 100000000) {
        return (playCount / 10000).toFixed(1) + '万'; // 十万到一亿以下，显示为万
      } else {
        return (playCount / 100000000).toFixed(1) + '亿'; // 一亿以上，显示为亿
      }
    },
  },
};
</script>

<style lang="less" scoped>
.playtop {
  height: 200px;
  background-size: cover;
  filter: blur(10px);
  position: relative;
  margin-top: -10px;
}
.playtop:after {
  content: " ";
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
span {
    position: absolute;
    top: 110px;
    left: 85px;
    color: #fff;
    z-index: 1;
    font-size: 12px;
    font-weight: 800;
}
img {
  width: 35%;
  position: absolute;
  top: 110px;
  left: 15px;
}
h5 {
  width: 50%;
  position: absolute;
  top: 115px;
  left: 170px;
  color: #fff;
}
.u-smtitle {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background-color: #eeeff0;
}
</style>

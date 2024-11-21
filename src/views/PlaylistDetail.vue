<template>
  <div v-if="tip">{{ tip }}</div>
  <div v-else-if="playlist">
    <h5>PlaylistDetail-{{ $route.query.id }} --{{ playlist.name }}</h5>
    <img style="width: 100%" :src="playlist.coverImgUrl" alt="" />
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
};
</script>

<style lang="less" scoped></style>

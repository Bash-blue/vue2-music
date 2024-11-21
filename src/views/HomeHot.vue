<template>
  <div>
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
    },
  },
  created: function () {
    this.axios
      .get("/music/playlist/detail?id=3778678")
      .then((response) => {
        console.log("1111111", response.data);
        this.hotsong = response.data.playlist.tracks;
      });
  },
};
</script>

<style lang="less" scoped>
</style>
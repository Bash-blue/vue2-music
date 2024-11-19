<template>
  <div>
    <ul class="HomeHot">
      <NewsonglistCard
        v-for="item in hotsong"
        :key="item.id"
        :item="item"
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

  data: function () {
    return {
      NewsonglistCard: [],
      hotsong: [],
    };
  },

  created: function () {
    this.axios
      .get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((response) => {
        console.log("1111111", response.data);
        this.hotsong = response.data.playlist.tracks;
      });
  },
};
</script>

<style lang="less" scoped>
</style>
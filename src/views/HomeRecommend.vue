<template>
  <div>
    <h3>编辑推荐</h3>
    <ul class="personalized">
      <!-- <li v-for="item in personalized" :key="item.id">
        {{ item.name }}
      </li> -->
      <PlaylistCard
        v-for="item in personalized.slice(0,6)"
        :key="item.id"
        :item="item"
        :col="3"
      ></PlaylistCard>
    </ul>
    <h3>最新音乐</h3>
    <ul class="newsong">
      <li v-for="item in newsong" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>


<script>
import PlaylistCard from "@/components/PlaylistCard.vue";

export default {
  components: {
    PlaylistCard,
  },

  data: function () {
    return {
      personalized: [],
      newsong: [],
    };
  },
  // 编辑推荐获取
  created: function () {
    this.axios
      .get("https://apic.netstart.cn/music/personalized")
      .then((response) => {
        console.log(response.data);
        this.personalized = response.data.result;
      });

    // 最新音乐获取
    this.axios
      .get("https://apis.netstart.cn/music/personalized/newsong")
      .then((response) => {
        console.log(response.data);
        this.newsong = response.data.result;
      });
  },
};
</script>


<style lang="less" scoped>
.personalized{
  display: flex;
  flex-wrap: wrap;
}
</style>
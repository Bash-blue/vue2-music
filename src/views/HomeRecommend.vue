<template>
  <div class="HomeRecommend">
    <h3>编辑推荐</h3>
    <ul class="personalized">
      <PlaylistCard
        v-for="item in personalized.slice(0, 6)"
        :key="item.id"
        :item="item"
        :col="3"
      ></PlaylistCard>
    </ul>

    <h3 class="newest" style="padding-top: 35px">最新音乐</h3>
    <ul class="newsong">
      <!-- <li v-for="item in newsong" :key="item.id">
        {{ item.name }}
      </li> -->
      <NewsonglistCard
        v-for="item in newsong"
        :key="item.id"
        :item="item"
        @play-this-song="setCurrentSong"
        :currentSongId="currentSongId"
        :playing="playing"
      ></NewsonglistCard>
    </ul>
  </div>
</template>


<script>
import PlaylistCard from "@/components/PlaylistCard.vue";
import NewsonglistCard from "@/components/NewsonglistCard.vue";

export default {
  components: {
    PlaylistCard,
    NewsonglistCard,
  },
  props: {
    currentSongId: Number,
    playing: Boolean,
  },
  data: function () {
    return {
      personalized: [],
      NewsonglistCard: [],
      newsong: [],
    };
  },
  methods: {
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
    },
  },
  // 编辑推荐获取
  created: function () {
    this.axios.get("/music/personalized").then((response) => {
      console.log(response.data);
      this.personalized = response.data.result;
    });

    // 最新音乐获取
    this.axios.get("/music/personalized/newsong").then((response) => {
      console.log(response.data);
      this.newsong = response.data.result;
    });
  },
};
</script>


<style lang="less" scoped>
.HomeRecommend {
  h3 {
    font-size: 17px;
    padding: 10px;
    position: relative;
    &::before {
      left: 0px;
      content: "";
      position: absolute;
      top: 31%;
      width: 3px;
      height: 20px;
      background-color: #d33a31;
      border-radius: 1.5px;
    }
  }
  .newest {
    &::before {
      margin-top: 14px;
    }
  }
  .personalized {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
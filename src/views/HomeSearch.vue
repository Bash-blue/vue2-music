<template>
  <div>
    <p>请输入你要搜索的歌曲或歌手</p>
    <input type="text" v-model="question" />

    <section v-if="result">
      <ul>
        <li
          v-for="item in allMatch"
          @click="fetchDetails(item.keyword)"
          :key="item.id"
        >
          {{ item.keyword }}
        </li>
      </ul>
    </section>

    <section v-if="songesult">
      <ul>
        <NewsonglistCard
          v-for="item in songMatch"
          :key="item.id"
          :item="item"
        ></NewsonglistCard>
      </ul>
    </section>
  </div>
</template>

<script>
import NewsonglistCard from "@/components/NewsonglistCard.vue";

export default {
  components: {
    NewsonglistCard,
  },
  data() {
    return {
      question: "",
      result: false,
      allMatch: [],
      songesult: false,
      songMatch: [],
      NewsonglistCard: [],
    };
  },
  watch: {
    question: function (n) {
      this.result = true;
      this.axios
        .get(
          `/music/search/suggest?keywords=${n}"&type=mobile`
        )
        .then((response) => {
          this.allMatch = response.data.result.allMatch;
        });
    },
  },
  methods: {
    fetchDetails(keyword) {
      this.result = false;
      this.songesult = true;
      this.axios
        .get(`/music/search?keywords=${keyword}`)
        .then((response) => {
          this.songMatch = response.data.result.songs;
        });
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
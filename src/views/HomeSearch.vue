<template>
  <div style="margin: 32px 0 50px 0">
    <!-- <p>请输入你要搜索的歌曲或歌手</p> -->
    <form
      class="m-input f-bd f-bd-btm"
      method="get"
      @submit.prevent="handleFormSubmit"
    >
      <div class="inputcover">
        <i class="u-svg u-svg-srch"></i
        ><input
          type="search"
          name="search"
          class="input"
          placeholder="搜索歌曲、歌手、专辑"
          autocomplete="off"
          value=""
          v-model="question"
          @keyup.enter="handleEnter"
        />
        <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
      </div>
    </form>
    <!-- <input type="text" v-model="question" /> -->

    <section class="bendi"  v-if="result && !question">
      <p>热门搜索</p>
      <div
        v-for="(item, index) in topHotSongs"
        :key="index"
        class="search-item"
        @click="fetchDetails(item.name)"
      >
        <span>{{ item.name }}</span>
      </div>
    </section>

    <section class="lishi"  v-if="result && !question">
      <div
        v-for="(item, index) in searchHistory"
        :key="index"
        class="search-item"
        @click="fetchDetails(item)"
      >
        <i class="u-svg u-svg-histy"></i>
        <span>{{ item }}</span>
        <i class="u-svg u-svg-close" @click="removeFromHistory(index)"></i>
      </div>
    </section>

    <section v-if="result" class="searchtips">
      <h3 v-if="question" class="tips">搜索“{{ question }}”</h3>
      <ul>
        <li
          v-for="item in allMatch"
          @click="handleEnter(item.keyword)"
          :key="item.id"
          
        >
          <i></i>
          <span>{{ item.keyword }}</span>
        </li>
      </ul>
    </section>

    <section v-if="!result">
      <ul>
        <NewsonglistCard
          v-for="item in songMatch"
          :key="item.id"
          :item="item"
          :currentSongId="currentSongId"
          :playing="playing"
          @play-this-song="setCurrentSong"
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
  props: {
    currentSongId: Number,
    playing: Boolean,
    hotSongs: Array,
  },
  data() {
    return {
      question: "",
      result: true,
      allMatch: [],
      songesult: false,
      songMatch: [],
      NewsonglistCard: [],
      searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
    };
  },
  
  computed: {
    formattedSearchHistory() {
      return this.searchHistory
        .slice(0, 4)
        .map((item) => `<li>${item}</li>`)
        .join("");
    },
topHotSongs() {
    return this.hotSongs.slice(0, 8);
  },
  },
  watch: {
    question: function (n) {
      this.result = true;
      this.axios
        .get(`/music/search/suggest?keywords=${n}"&type=mobile`)
        .then((response) => {
          this.allMatch = response.data.result.allMatch;
        });
    },
    searchHistory(newHistory) {
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    },
    
  },  
  methods: {
    handleFormSubmit() {
      // 执行搜索逻辑
      this.search();
      // 更新搜索历史
      this.updateSearchHistory(this.question);
    },
    fetchDetails(keyword) {
      this.result = false;
      this.songesult = true;
      this.axios.get(`/music/search?keywords=${keyword}`).then((response) => {
        console.log("23132211", response.data);
        this.songMatch = response.data.result.songs;
       this.$emit('update:songMatch', this.songMatch); // 触发事件传递 songMatch
      });
    },
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
      this.$emit("update:ScurrentSongId", item.id);  // 触发事件传递当前歌曲的 id
    },

   handleEnter(keyword) {
      // 执行搜索逻辑
      this.fetchDetails(keyword);
      // 更新搜索历史
      this.updateSearchHistory(keyword);
    },
     updateSearchHistory(keyword) {
      // 确保搜索词不在历史中，或者移除旧的搜索词
      const history = this.searchHistory.filter((item) => item !== keyword);
      // 添加新的搜索词到数组开头
      history.unshift(keyword);
      // 只保留最近的8个搜索值
      history.splice(8);
      // 保存到localStorage
      localStorage.setItem("searchHistory", JSON.stringify(history));
      // 更新组件的数据
      this.searchHistory = history;
    },
    search() {
      // 执行搜索逻辑...
      this.updateSearchHistory(this.question);
    },

    removeFromHistory(index) {
      // 从数组中删除对应的项
      this.searchHistory.splice(index, 1);
      // 更新本地存储
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
  },
  mounted() {
    this.searchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
  },
};
</script>

<style lang="less" scoped>
.m-input {
  padding: 15px 10px 0px 10px;
}
.m-input .input:focus + .holder {
  display: none;
}
.f-bd {
  position: relative;
}
.m-input .inputcover {
  position: relative;
  width: 100%;
  height: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  background: #ebecec;
  border-radius: 30px;
}
.m-input .u-svg-srch {
  position: absolute;
  left: 0;
  top: 9px;
  margin: 0 8px;
  vertical-align: middle;
}

.u-svg-srch {
  width: 13px;
  height: 13px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
}
.u-svg {
  display: inline-block;
  vertical-align: middle;
  background-position: 0 0;
  background-size: contain;
  background-repeat: no-repeat;
}
.m-input .input {
  width: 100%;
  height: 30px;
  line-height: 18px;
  background: rgba(0, 0, 0, 0);
  font-size: 14px;
  color: #333;
}

input,
select,
textarea {
  -webkit-appearance: none;
  border-radius: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
}
.m-input .holder {
  position: absolute;
  left: 30px;
  top: 5px;
  font-size: 14px;
  color: #c9c9c9;
  background: rgba(0, 0, 0, 0);
  pointer-events: none;
}

label,
summary {
  cursor: default;
}
.m-input .close {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
}
.m-input .u-svg-empty {
  display: none;
  vertical-align: middle;
}
.u-svg-empty {
  width: 14px;
  height: 14px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
}

.searchtips {
  margin: 0 auto;
  .tips {
    height: 50px;
    margin-left: 10px;
    padding-right: 10px;
    font-size: 15px;
    line-height: 50px;
    color: #507daf;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
  }

  li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    height: 45px;
    padding-left: 10px;

    width: 90%;
    margin-left: 15px;

    border-bottom: 0.5px solid rgba(126, 123, 123, 0.1);

    i {
      -webkit-box-flex: 0;
      -webkit-flex: 0 0 auto;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
      margin-right: 7px;
      width: 15px;
      height: 15px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
    }
  }
}
.bendi {
  padding: 18px 18px 0px 18px;
  p {
    font-size: 12px;
    padding: 10px;
  }
  .search-item {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;
    padding: 5px 12px;
    background-color: #fbfcfd;
    border-radius: 15px;
    font-size: 14px;
    border: 1px solid #efeff2;
  }
}

.lishi {
  .m-history .u-svg-histy {
    margin: 0 10px;
  }
  .u-svg-histy {
    width: 15px;
    height: 15px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+);
  }
  .u-svg-close {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 12px;
    height: 12px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=);
  }
  span {
    font-size: 16px;
    margin-left: 10px;
  }
  .search-item {
    position: relative;
    height: 55.5px;
    margin-left: 20px;
    margin-right: 10px;
    padding-left: 0;
    padding-top: 20px;
    border-bottom: 1px solid rgba(211, 211, 211, 0.448);
    &:hover {
    }
  }
}
</style>
<template>
  <div style="margin: 32px 0 50px 0">
    <!-- <p>请输入你要搜索的歌曲或歌手</p> -->
    <form class="m-input f-bd f-bd-btm" method="get" action="#">
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
        />
        <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
      </div>
    </form>
    <!-- <input type="text" v-model="question" /> -->

    <section v-if="result" class="searchtips">
      <h3 class="tips">搜索“{{ question }}”</h3>
      <ul>
        <li
          v-for="item in allMatch"
          @click="fetchDetails(item.keyword)"
          :key="item.id"
        >
          <i></i>
          <span>{{ item.keyword }}</span>
        </li>
      </ul>
    </section>

    <section v-if="songesult">
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
        .get(`/music/search/suggest?keywords=${n}"&type=mobile`)
        .then((response) => {
          this.allMatch = response.data.result.allMatch;
        });
    },
  },
  methods: {
    fetchDetails(keyword) {
      this.result = false;
      this.songesult = true;
      this.axios.get(`/music/search?keywords=${keyword}`).then((response) => {
        console.log("23132211", response.data);
        this.songMatch = response.data.result.songs;
      });
    },
    setCurrentSong(item) {
      this.$emit("play-this-song", item);
    },
  },
};
</script>

<style lang="less" scoped>
.m-input {
  padding: 15px 10px;
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
</style>
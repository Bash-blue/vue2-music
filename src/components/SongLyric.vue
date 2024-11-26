<template>
  <div class="song-lyric" :class="{ playing: playing }">
    <ul
      class="list"
      :style="{
        marginTop:
          -1 *
            lyricElementsHeight
              .slice(0, currentLyricIndex)
              .reduce((total, num) => total + num, 0) +
          50 +
          'px',
      }"
    >
      <li
        :class="{ active: index === currentLyricIndex }"
        v-for="(item, index) in parsedLyric"
        :key="index"
        ref="lyricElements"
      >
        <span
          :style="{
            animationDuration:
              ((parsedLyric[index + 1]?.time || duration) - item.time) * 1 +
              's',
          }"
          >{{ item.text }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number,
    duration: Number,
    playing: Boolean,
    currentSongId: Number,
  },
  data: function () {
    return {
      lyric: "",
      lyricElementsHeight: [],
    };
  },
  watch: {
    currentSongId(newId) {
      // 当 currentSongId 发生变化时，重新获取歌词
      this.fetchLyric(newId);
    },
  },
  methods: {
    fetchLyric(songId) {
      this.axios
        .get("/lyric", {
          params: {
            id: songId, // 使用传入的 songId 而不是 this.$route.query.id
          },
        })
        .then((res) => {
          // 处理响应结果，将歌词赋值给组件的数据属性
          this.lyric = res.data.lrc.lyric;

          // 在下一次 DOM 更新完成后计算歌词元素的高度
          this.$nextTick(() => {
            this.lyricElementsHeight = this.$refs.lyricElements.map(
              (ele) => ele.offsetHeight
            );
          });
        })
        .catch((error) => {
          console.error("获取歌词失败:", error);
        });
    },
  },
  created: function () {
    this.fetchLyric(this.currentSongId);
  },
  computed: {
    currentLyricIndex: function () {
      // console.log(10, this.parsedLyric);
      return this.parsedLyric.findLastIndex((item) => {
        return item.time <= this.currentTime;
      });
    },
    parsedLyric: function () {
      return this.lyric
        .split("\n")
        .filter((o) => o)
        .map((item) => {
          var res = item.match(
            /\[(?<m>\d{2}):(?<s>\d{2}\.\d{2,3})\](?<str>.*)/i
          );
          // return res.groups;
          return {
            time: res.groups.m * 60 + parseFloat(res.groups.s),
            text: res.groups.str || "---",
          };
        });
    },
  },
};
</script>


<style lang="less" scoped>
@keyframes xxx {
  0% {
    background-position-x: 100%;
    font-weight: 800;
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 49%,
      rgb(255, 255, 255) 51%
    );
    color: transparent;
  }
  100% {
    background-position-x: 0%;
    font-weight: 800;
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 49%,
      rgb(255, 255, 255) 51%
    );
    color: transparent;
  }
}
.song-lyric {
  height: 120px;
  overflow: hidden;
  text-align: center;
  //
  .list {
    // padding: 10px;
    transition: all 0.2s;

    li {
      span {
        font-size: 12px;
        line-height: 25px;
        display: inline-block;
        background-size: 200%;
        background-repeat: no-repeat;
        background-position-x: 100%;
        background-clip: text;

        // transition: background-position-x linear 1s;
      }

      &.active {
        span {
          font-size: 16px;
          line-height: 30px;
          //   background-image: linear-gradient(to right, blue 49%, red 51%);
          //   color: transparent;
          //   background-position-x: 0%;
          animation: xxx 3s linear;
          animation-play-state: paused;
        }
      }
    }
  }
  &.playing {
    .list {
      li {
        span {
          animation-play-state: running;
        }
      }
    }
  }
}
</style>
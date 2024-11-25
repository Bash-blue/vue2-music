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
          45 +
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
              ((parsedLyric[index + 1]?.time || duration) - item.time) * 0.8 +
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
  },
  data: function () {
    return {
      lyric: "",
      lyricElementsHeight: [],
    };
  },
  created: function () {
    this.axios
      .get("/lyric", {
        params: {
          id: this.$route.query.id,
        },
      })
      .then((res) => {
        // console.log(res.data.lrc.lyric);
        this.lyric = res.data.lrc.lyric;

        this.$nextTick(() => {
          this.lyricElementsHeight = this.$refs.lyricElements.map(
            (ele) => ele.offsetHeight
          );
        });
      });
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
    background-image: linear-gradient(to right, rgb(30, 30, 43) 49%, rgb(198, 194, 194) 51%);
    color: transparent;
  }
  100% {
    background-position-x: 0%;
    background-image: linear-gradient(to right, rgb(30, 30, 43) 49%, rgb(198, 194, 194)51%);
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
    transition: all 0.3s;

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
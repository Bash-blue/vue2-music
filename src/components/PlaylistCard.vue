<template>
  <li
    class="playlist-card"
    :class="{ col3: col === 3, col2: col === 2 }"
    @click="gotoPlaylistDetailPage(item.id)"
    
  >
    <div class="thumb" style="height: 50px">
      <img
        :src="`${item.picUrl}?imageView=1&type=webp&thumbnail=247x0`"
        alt=""
      />
        <span>{{ formattedPlayCount }}</span>
    </div>
    <h5>{{ item.name }}</h5>
  </li>
</template>

<script>


export default {
  props: {
    item: Object,
    col: Number,
  },
  methods: {
    gotoPlaylistDetailPage: function (id) {
      // console.log(123);
      this.$router.push({ path: "playlist", query: { id } });
    },
  },
   computed: {
    formattedPlayCount() {
      const { playCount } = this.item;
      if (playCount < 10000) {
        return playCount.toString(); // 不超过十万正常显示
      } else if (playCount < 100000000) {
        return (playCount / 10000).toFixed(1) + '万'; // 十万到一亿以下，显示为万
      } else {
        return (playCount / 100000000).toFixed(1) + '亿'; // 一亿以上，显示为亿
      }
    },
  },
};
</script>

<style lang="less" scoped>
.playlist-card {
  list-style: none;
  flex-grow: 1;
  margin-bottom: 3px;
  .thumb {
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
    }
  }
  h5 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 6px 2px 0 6px;
    min-height: 30px;
    line-height: 1.2;
    font-size: 13px;
    margin-top: 70px;
    margin-bottom: 10px;
  }
  &.col3 {
    width: 30%;
    &:nth-child(3n + 1) {
      margin-left: 3px;
      margin-right: 3px;
    }
    &:nth-child(3n + 2) {
      margin-right: 3px;
    }
    &:nth-child(3n + 3) {
      margin-right: 3px;
    }
  }
  &.col2 {
    width: 40%;
  }
}
</style>
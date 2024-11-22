<template>
  <div>
    <li
      class="song-item"
      :class="{ active: currentSongId === item.id }"
      @click="playthissong(item)"
    >
      <div class="Signature">
        <h5>{{ item.name }}</h5>
        <p>
          <i class="u-hmsprt sghot"></i>
          <span
            v-for="ar in item.song ? item.song.artists : item.ar"
            :key="ar.id"
            >{{ ar.name }}</span
          >
        </p>
      </div>
      <div class="icon">
        <div v-if="currentSongId !== item.id" class="play"></div>
        <div v-else class="anima" :class="{ playing: playing }">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    currentSongId: Number,
    playing: Boolean,
  },
  methods: {
    playthissong(item) {
      this.$emit("play-this-song", item);
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  // background-color: #d43c33;
}
.song-item {
  height: 55.5px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  margin-left: 10px;
  padding-left: 0;
  border-bottom: 1px solid rgba(211, 211, 211, 0.448);
  .Signature {
    .u-hmsprt {
      background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28…=)
        no-repeat;
      background-size: 166px 97px;
      display: inline-block;
      width: 12px;
      height: 8px;
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: #888;
      padding-top: 5px; 
    }
  }
}

.icon {
  .play {
    background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
    width: 22px;
    height: 22px;
    background-position: -24px 0;
    margin-top: 12px;
    background-size: 166px 97px;
  }

  @keyframes xxx {
    0% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }

  .anima {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: space-around;
    // background-color: antiquewhite;
    span {
      display: block;
      width: 15%;
      height: 100%;
      background-color: #d43c33;
      animation: xxx 0.8s linear 0;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      transform-origin: bottom;
      animation-play-state: paused;
      margin-top: 12px;
      border-radius: 7px;
      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: -0.4s;
      }
      &:nth-child(3) {
        animation-delay: -0.2s;
      }
      &:nth-child(4) {
        animation-delay: -0.6s;
      }
    }

    &.playing {
      span {
        animation-play-state: running;
      }
    }
  }
}
</style>
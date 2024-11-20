<template>
    <div class="song-detail">
        <button @click="$router.back()">返回</button>
        <h3>SongDetail - {{ $route.query.id }}</h3>
        <img style="width: 200px; height: 200px; border-radius: 50%" :src="song.al.picUrl" alt="" />

        <div>
            <div class="progress">
                <div class="span">0.00</div>
                <div style="width: 60%; height: 10px; background: red"></div>
                <div class="span">4.20</div>
            </div>

            <div class="controls">
                <button>上</button>
                <button>播放</button>
                <button>暂停</button>
                <button>下</button>
                <button>模</button>
                <button>列</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            song: null,
        };
    },
    created: function () {
        this.axios
            .get("/song/detail", {
                params: {
                    ids: this.$route.query.id,
                },
            })
            .then((res) => {
                this.song = res.data.songs[0];
            });
    },
};
</script>

<style lang="less" scoped>
.song-detail {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>

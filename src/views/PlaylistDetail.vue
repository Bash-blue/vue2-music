<template>
    <div v-if="tip">{{ tip }}</div>
    <div v-else-if="playlist">
        <h5>PlaylistDetail-{{ $route.query.id }} --{{ playlist.name }}</h5>
                <img style="width: 100%" :src="playlist.coverImgUrl" alt="" />
        <ul>
            <li v-for="item in playlist.tracks" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            tip: "",
            playlist: null,
        };
    },
    created: function () {
        if (this.$route.query.id) {
            this.axios
                .get("/music/playlist/detail", {
                    params: { id: this.$route.query.id },
                })
                .then((response) => {
                    console.log(response.data);
                    this.playlist = response.data.playlist;
                });
        } else {
            this.tip = "路由参数不合法";
        }
    },
};
</script>

<style lang="less" scoped></style>

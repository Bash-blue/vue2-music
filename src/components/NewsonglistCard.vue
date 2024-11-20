<template>
  <div>
    <li style="height: 50px" @click="playthissong(item)">
      <h5>{{ item.name }}</h5>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    playthissong(item) {
      this.$emit("play-this-song", item);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
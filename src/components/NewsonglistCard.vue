<template>
  <div>
    <li>
      <h5>{{ item.name }}</h5>
    </li>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="less" scoped>
</style>
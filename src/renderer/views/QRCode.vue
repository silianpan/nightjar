<template>
<div class="qrcode">
  <Input v-model="value" placeholder="等待扫描输入...." style="width: 300px"
    :autofocus="true"
    @on-enter="enterClick">
  </Input>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  mounted() {
  },
  methods: {
    enterClick() {
      this.open(this.value)
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  }
}
</script>

<style lang="less">
@import './qrCode.less';
</style>

<template>
<div class="qrcode">
  <Input v-model="value" placeholder="等待扫描输入...." style="width: 100vw"
    :autofocus="true"
    @on-enter="enterClick">
  </Input>
  <webview :src="webviewUrl" autosize="on" style="width:100vw;height:100vh"></webview>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      webviewUrl: ''
    }
  },
  mounted() {
  },
  methods: {
    enterClick() {
      // this.open(this.value)
      this.webviewUrl = this.value
      this.value = ''
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

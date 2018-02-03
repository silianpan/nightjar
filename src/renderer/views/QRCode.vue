<template>
<div class="qrcode">
  <Input v-model="value" placeholder="等待扫描输入...." style="width: 100vw"
    :autofocus="true"
    @on-enter="enterClick">
  </Input>
  <webview :src="webviewUrl" autosize="on" style="width:100vw;height:100vh"></webview>
  <Spin fix v-if="isScaning">
    <Icon type="load-c" size=100 class="demo-spin-icon-load"></Icon>
    <div style="font-size:100px">等待扫描中...</div>
  </Spin>
</div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      webviewUrl: '',
      spinShow: true,
      isScaning: false
    }
  },
  mounted() {
  },
  methods: {
    enterClick() {
      // this.open(this.value)
      this.isScaning = true
      this.webviewUrl = this.value
      this.value = ''

      setTimeout(() => {this.isScaning = false}, 1000)
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

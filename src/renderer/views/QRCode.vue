<template>
<div>
  <Input v-model="value" placeholder="Enter something..." style="width: 300px"
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

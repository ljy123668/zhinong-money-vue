<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import * as echarts from "echarts";

@Component
export default class Chart extends Vue {
  @Prop() options?: echarts.EChartsOption;
  chart?: any;
  mounted() {
    console.log(this.options);
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options!);
  }
  @Watch("options")
  onOptionsChange(newValue: echarts.EChartsOption) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>
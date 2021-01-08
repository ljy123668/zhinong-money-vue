<template>
  <ul class="tabs" :class="{ [classPrefix + '-tabs']: classPrefix }">
    <li
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="liClass(item)"
      @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

type DateSourceItem = {
  text: string;
  value: string;
};

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DateSourceItem;
  @Prop({ default: "-" }) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DateSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
  select(item: DateSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #fff;
  display: flex;
  text-align: center;
  font-size: 16px;
  &-item {
    width: 50%;
    line-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 13%;
      height: 4px;
      transform: translateX(-50%);
      background: #9900ff;
    }
  }
}
.selected {
  color: #9900ff;
}
</style>
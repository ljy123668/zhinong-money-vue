<template>
  <Layout class-prefix="layout">
    <div>
      <div class="createdAt">
        <FormItem
          type="date"
          field-name="日期"
          placeholder="请选择日期"
          :value.sync="record.createdAt"
        />
      </div>
      <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    </div>
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="请输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags @update:value="record.tags = $event" />
    <div class="output">
      {{ $store.state.output }}
    </div>

    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/money/Tags.vue";
import FormItem from "@/components/money/FormItem.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Watch } from "vue-property-decorator";

import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tags, FormItem, NumberPad, Tabs },
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createdAt: new Date().toISOString(),
  };
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  created() {
    this.$store.commit("fetchRecords");
  }
  updated() {
    console.log(this.record);
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert("请至少选择一个标签");
    }

    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.output {
  @extend %clearFix;
  // @extend %innerShadow;
  background-color: #fff;
  font-size: 36px;
  font-family: Consolas, monospace;
  padding: 9px 24px;
  text-align: right;
  height: 72px;
}
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes,
.createdAt {
  padding: 12px 0;
}
</style>

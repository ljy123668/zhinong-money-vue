<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types />
    <Notes />
    <Tags :data-source="tags" />
  </Layout>
</template>

<script>
import Tags from "@/components/money/Tags";
import Notes from "@/components/money/Notes";
import NumberPad from "@/components/money/NumberPad";
import Types from "@/components/money/Types";
export default {
  components: {
    Tags,
    Notes,
    NumberPad,
    Types,
  },
  data() {
    return {
      tags: ["衣", "食", "住", "行", "玩"],
    };
  },
};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

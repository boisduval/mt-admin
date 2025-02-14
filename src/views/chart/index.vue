<script setup lang="ts">
import { getChartList } from "@/api/chart";
import ChartBar from "./component/charts/ChartBar.vue";
import { onMounted } from "vue";

const requireData = [120, 132, 101, 134, 90, 230, 210];
const questionData = [220, 182, 191, 234, 290, 330, 310];

const getChartData = () => {
  getChartList({}).then(res => {
    console.log(res);
  });
};

onMounted(() => {
  getChartData();
});
</script>
<template>
  <div class="main-content bg-bg_color">
    <ChartBar :requireData="requireData" :questionData="questionData" />
  </div>
</template>

<style lang="scss" scoped></style>

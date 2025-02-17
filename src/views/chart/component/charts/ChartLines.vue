<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import {
  type PropType,
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onUnmounted
} from "vue";
const props = defineProps({
  seriesData: {
    type: Array as PropType<echarts.SeriesOption[]>,
    default: () => []
  },
  xAxis: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 0
  }
});
const emit = defineEmits(["rendered"]);
const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions, resize } = useECharts(chartRef, {
  theme
});

watch(
  () => props,
  async () => {
    await nextTick(); // 确保DOM更新完成后再执行
    setOptions(
      {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "1%",
          right: "1%",
          containLabel: true
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            start: 0,
            end: 100
          }
        ],

        xAxis: [
          {
            type: "time",
            // data: props.xAxis,
            axisLabel: {
              fontSize: "0.875rem"
              // rotate: 45
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              fontSize: "0.875rem"
            },
            splitLine: {
              show: false // 去网格线
            },
            min: props.min > 100 ? props.min - 100 : 0,
            max: props.max + 100
          }
        ],
        series: props.seriesData
      },
      {
        name: "rendered",
        callback: () => {
          emit("rendered");
        }
      }
    );
  },
  {
    deep: true,
    immediate: true
  }
);

onMounted(() => {
  window.addEventListener("resize", resize);
});
onUnmounted(() => {
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <div ref="chartRef" class="flex-1" style="height: calc(100% - 24px)" />
</template>

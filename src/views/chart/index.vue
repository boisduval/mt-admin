<script setup lang="ts">
import { getChartList, importExcel } from "@/api/chart";
import ChartLines from "./component/charts/ChartLines.vue";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { ElButton, genFileId, UploadFile, UploadUserFile } from "element-plus";
import { message } from "@/utils/message";

const loading = ref(false);
const dataList = ref([]);
const min = ref(0);
const max = ref(100);

const getChartData = () => {
  loading.value = true;
  getChartList({})
    .then(res => {
      if (res.data.list.length > 0) {
        min.value = res.data.stats.min;
        max.value = res.data.stats.max;
        let lines = Object.keys(res.data.list[0].values);
        // xAxis.value = res.data.map(item => {
        //   return dayjs(item.timestamp).format("YYYY-MM-DD HH:mm:ss");
        // });
        let series = lines.map((item, index) => {
          return {
            name: item,
            type: "line",
            showSymbol: false,
            data: []
          };
        });

        for (let index = 0; index < res.data.list.length; index++) {
          const element = res.data.list[index];
          for (let j = 0; j < lines.length; j++) {
            series[j].data.push({
              name: dayjs(element.timestamp).format("YYYY-MM-DD HH:mm:ss"),
              value: [element.timestamp, element.values[lines[j]]]
            });
            // series[j].data.push(element.values[lines[j]]);
          }
        }

        dataList.value = series;
      } else {
        dataList.value = [];
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleRendered = () => {
  loading.value = false;
};

onMounted(() => {
  getChartData();
});

const uploadRef = ref();
const isUploading = ref(false);
const onFileChange = (file: UploadFile) => {
  isUploading.value = true;
  const formData = new FormData();
  if (file.raw) {
    formData.append("file", file.raw);
  } else {
    throw new Error("File raw data is undefined");
  }
  importExcel(formData)
    .then(res => {
      if (res.success) {
        message("导入成功", { type: "success" });
        getChartData();
      }
    })
    .finally(() => {
      isUploading.value = false;
    });
};

const onExceed = (files: File[]) => {
  uploadRef.value.clearFiles();
  const file = files[0] as UploadUserFile;
  file.uid = genFileId();
  file.uid = genFileId();
  uploadRef.value.handleStart(file);
};
</script>
<template>
  <div
    v-loading="loading"
    class="main-content flex justify-center bg-bg_color p-8 pb-0 relative"
  >
    <div class="button-container absolute left-0 top-0 z-10">
      <el-upload
        ref="uploadRef"
        class="upload-reference"
        :limit="1"
        accept=".csv"
        :on-exceed="onExceed"
        :on-change="onFileChange"
        :auto-upload="false"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button :loading="isUploading" type="primary">
            上传文件
          </el-button>
        </template>
      </el-upload>
    </div>
    <ChartLines
      v-if="dataList.length > 0"
      :seriesData="dataList"
      :min="min"
      :max="max"
      @rendered="handleRendered"
    />

    <el-empty v-else :image-size="200" />
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 24px);
  margin-bottom: 0;
}
.button-container {
  padding: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>

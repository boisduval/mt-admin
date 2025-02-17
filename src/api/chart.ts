import { http } from "@/utils/http";
import { baseUrlApi } from "@/utils/baseUrl";

type ResData = {
  timestamp: string;
  values: Record<string, number>;
};

type Stats = {
  min: number;
  max: number;
};

type Result = {
  success: boolean;
  data: {
    list: Array<ResData>;
    stats: Stats;
  };
};

export const getChartList = (data?: object) => {
  return http.request<Result>("get", baseUrlApi("timeseriesdata"), {
    data
  });
};

export const importExcel = (data?: object) => {
  return http.request<Result>(
    "post",
    baseUrlApi("timeseriesdata/import-excel"),
    {
      data
    },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

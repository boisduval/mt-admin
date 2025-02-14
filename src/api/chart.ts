import { http } from "@/utils/http";
import { baseUrlApi } from "@/utils/baseUrl";

type Result = {
  success: boolean;
  data?: {
    list: Array<any>;
  };
};

export const getChartList = (data?: object) => {
  return http.request<Result>("get", baseUrlApi("timeseriesdata"), {
    data
  });
};

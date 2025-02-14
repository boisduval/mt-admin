import { chart } from "@/router/enums";

export default {
  path: "/chart",
  redirect: "/chart/index",
  meta: {
    icon: "hugeicons:activity-01",
    title: "图表",
    rank: chart
  },
  children: [
    {
      path: "/chart/index",
      name: "Chart",
      component: () => import("@/views/chart/index.vue"),
      meta: {
        title: "图表示例"
      }
    }
  ]
} satisfies RouteConfigsTable;

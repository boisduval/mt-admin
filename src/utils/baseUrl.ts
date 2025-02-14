/**
 * 根据环境获取请求地址
 *
 * @returns - string
 */
export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/api/${url}`
    : `https://api.inkwise.ai/api/${url}`;

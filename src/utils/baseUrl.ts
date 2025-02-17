/**
 * 根据环境获取请求地址
 *
 * @returns - string
 */
export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/api/${url}`
    : `http://172.20.82.243:3444/api/${url}`;

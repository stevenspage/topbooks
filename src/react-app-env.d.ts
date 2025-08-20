/// <reference types="react-scripts" />

// 声明JSON模块类型
declare module "*.json" {
  const value: any;
  export default value;
}

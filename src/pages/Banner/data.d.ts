/*
 * @Description: banner ts
 * @Author: 尚夏
 * @Date: 2021-07-22 16:19:36
 * @LastEditTime: 2021-07-22 16:26:03
 * @FilePath: /mining-admin-desktop/src/pages/Banner/data.d.ts
 */
declare namespace Banner {
  type FormProps = {
    id: number;
    theme?: string;
    banner?: string;
    url?: string;
    carouselTime?: number[];
    status?: string;
  }
}
/*
 * @Description: 公告ts
 * @Author: 尚夏
 * @Date: 2021-07-21 10:30:25
 * @LastEditTime: 2021-07-22 16:20:13
 * @FilePath: /mining-admin-desktop/src/pages/Notice/data.d.ts
 */
declare namespace Notice {
  type FormProps = {
    id: number;
    title?: string;
    createAuthor?: string;
    publishObj?: string;
    publishTime?: string;
    editTime?: string;
    status?: string;
  }
}
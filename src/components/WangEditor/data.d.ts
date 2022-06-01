/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-07-16 14:05:00
 * @LastEditTime: 2021-09-26 10:32:27
 * @FilePath: /mining-admin-desktop/src/components/WangEditor/data.d.ts
 */

export interface EditorProps {
  id: string; // 编辑器id
  value?: string; // value 字段用来 配合 form表单 成为控件
  // content?: string; // 编辑器内容
  onChange?: any; // onChange 字段用来 配合 form表单 成为控件
  htUeditor: number; // 编辑器高度
  getEditor: (any) => void; // 抛出编辑器对象
}

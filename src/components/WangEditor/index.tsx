/*
 * @Description:  编辑器组件
 * @Author: 尚夏
 * @Date: 2021-07-16 10:02:54
 * @LastEditTime: 2021-10-13 16:50:29
 * @FilePath: /mining-admin-desktop/src/components/WangEditor/index.tsx
 */

// https://www.wangeditor.com/doc/
import React, { useState, useEffect } from 'react';
import E from 'wangeditor';
import type { EditorProps } from './data';

const WangEditor: React.FC<any> = (props: EditorProps) => {
  const { id, value, htUeditor, getEditor, onChange } = props;
  const [editor, setEditor] = React.useState<any>();

  // const [content, setContent] = useState<any>('');
  // useEffect(() => {
  //   setContent(value);
  // }, [value]);

  // 如果存在 先销毁
  const destoryEditor = () => {
    if (editor) {
      editor.destroy();
      setEditor(null);
    }
  };

  // 初始化编辑器
  const newInitEditor = () => {
    destoryEditor();

    const edt = new E(`#${id}`);

    edt.config.menus = [
      'undo', // 撤销
      'redo', // 重复
      'head', // 标题
      'bold', // 粗体
      // 'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon',  // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video',  // 插入视频
      // 'code',  // 插入代码
    ];

    // edt.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    // edt.config.showLinkImg = false;
    edt.config.pasteIgnoreImg = false; // 黏贴是否忽图片
    edt.config.uploadImgShowBase64 = true; // 可使用 base64 格式保存图 uploadImgShowBase64（base64 格式）和 uploadImgServer（上传图片到服务器）两者不能同时使用！！！
    edt.config.zIndex = 0;

    // 配置触发 onchange 的时间频率，默认为 200ms
    edt.config.onchangeTimeout = 500; // 修改为 500ms
    // edt.disable = true; // 修改为 500ms

    edt.config.onchange = (newHtml: string) => {
      if (onChange) {
        onChange(newHtml);
      }
    };

    edt.create();

    edt.$textContainerElem.css('height', `${htUeditor}px`);
    // .css('border', 'none')

    // 抛出编辑器对象
    getEditor(edt);

    setEditor(edt);
  };

  useEffect(() => {
    newInitEditor();
    return () => {
      destoryEditor();
    };
  }, []);

  // 配合form 控件 内容回填
  useEffect(() => {
    if (value && editor) {
      editor.txt.html(value);
    }
  }, [value]);

  return <div id={id} />;
};

export default WangEditor;

/*
 * @Description: quill 编辑器
 * @Author: 尚夏
 * @Date: 2021-07-16 15:10:33
 * @LastEditTime: 2021-07-23 13:59:31
 * @FilePath: /mining-admin-desktop/src/components/QuillEditor/index.tsx
 */
import React, { useState } from "react";
// import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';
// import type { EditorProps } from './data';

const QuillEditor = (props: {
  // content: string,
  // setContent: any
}) => {

  // const { content, setContent } = props;
  // const [value, setValue] = useState<string>(content);
  const [editor, setEditor] = React.useState<any>()
  
  React.useEffect(() => {
    if(editor) return;

    // eslint-disable-next-line no-new
    const edt = new Quill('#quill_editor', {
      theme: 'snow', // 设置主题
      modules: {
        toolbar: {
          container: [
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体设置
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题字号，不能设置单个字大小
            ['bold', 'italic', 'underline', 'strike'],  
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'], // a链接和图片的显示
            [{ 'align': [] }],
            // [{
            //   'background': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
            //     'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
            //     'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
            //     'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
            //     'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
            //     'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
            //     'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
            //     'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
            //     'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
            //     'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
            //     'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
            //     'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
            // }],
            // [{
            //   'color': ['rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
            //     'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
            //     'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
            //     'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
            //     'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
            //     'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
            //     'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
            //     'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
            //     'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
            //     'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
            //     'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
            //     'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)']
            // }],
            ['clean'],
            // ['emoji'], // emoji表情，设置了才能显示
            ['video'], // 我自定义的视频图标，和插件提供的不一样，所以设置为video2
          ],
          handlers: {},
          // value: content,
          // text-change: (value: string) => {
          //   console.log(value,'222')
          // },
        },
        
      },
     
    })
    
    // edt.on('text-change', function(delta, oldDelta, source) {
    //   if (source == 'api') {
    //     console.log("An API call triggered this change.");
    //   } else if (source == 'user') {
    //     console.log(edt.getText());
    //     // setContent()
    //   }
    // });

    setEditor(edt);
    
  }, [])

  return (
    <div id="quill_editor"></div>
  );
}


export default QuillEditor;

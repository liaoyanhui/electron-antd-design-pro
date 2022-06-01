/*
 * @Description: 
 * @Author: 尚夏
 * @Date: 2021-07-08 17:45:49
 * @LastEditTime: 2021-07-27 10:27:37
 * @FilePath: /mining-admin-desktop/src/components/CustomBreadcrumb/index.tsx
 */
import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './index.less';
import { history } from 'umi';
// import type { PageHeaderProps } from 'antd';

interface CustomBreadcrumn {
    params?: any,
    tip?: string
}

const CustomBreadcrumb: React.FC<CustomBreadcrumn> = (props: CustomBreadcrumn) => {
    const { params, tip } = props;
    const { breadcrumb, currentMenu } = params;
    const { routes } = breadcrumb;
    
    return (
        <>
          <Breadcrumb>
            {routes ? routes.map((item: any, index: number) => {
                return (
                    <Breadcrumb.Item key={index}>
                        <a onClick={() => history.push(item.path)}>{item.breadcrumbName}</a>
                    </Breadcrumb.Item>
                )
            }) : (
                <Breadcrumb.Item>
                    {/* <a href={currentMenu.path}>{currentMenu.name}</a> */}
                    {currentMenu.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
        {tip && <div className={styles.tip}>{tip}</div>}
      </>
    )
};

export default CustomBreadcrumb;
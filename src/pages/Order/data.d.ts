/*
 * @Description:
 * @Author: 尚夏
 * @Date: 2021-08-10 16:17:40
 * @LastEditTime: 2021-09-26 11:36:58
 * @FilePath: /mining-admin-desktop/src/pages/Order/data.d.ts
 */
declare namespace Order {
  type GateringModalProps = {
    visible: boolean;
    setVisible: any;
    afterClose: () => void;
    activeOrder: any;
    tableRef: any;
  };
  type PledgeModal = {
    visible: boolean;
    setVisible: any;
    afterClose: () => void;
    activeOrder: any;
    tableRef: any;
    estimate: any;
    getSealCostForOrder: (any) => void;
  };
  type AddFiatModal = {
    visible: boolean;
    setVisible: any;
    orderId: number;
    fetchList: () => void;
  };
  type AddCryptoModal = {
    visible: boolean;
    setVisible: any;
    orderId: number;
    fetchList: () => void;
  };
  type AddPledgeModal = {
    visible: boolean;
    setVisible: any;
    orderId: number;
    fetchList: () => void;
    type: string;
  };
  type SetPledgeModal = {
    visible: boolean;
    orderId: number;
    onOk: () => void;
    onCancel: () => void;
    estimate: any;
  };
}



import { PageLocationStateEnum } from '@/api/pageLocation';

export interface SerialGroupState{
    Port: string;         // 串口号
    BaudRate: number;     // 波特率
    Target:  PageLocationStateEnum;        // 串口的控制目标
    IsOpen: boolean;      // 是否为打开状态
    SerialObject?: any;    // 串口对象
    SerialParser?: any;    // 串口解析对象
    SerialTask?: any;      // 串口任务
}


export interface SerialGettingDataModel {
    data_type: keyof SerialGroupState;
}
export interface SerialSettingDataModel {
    data_type: keyof SerialGroupState;
    value: any;
}



 

```javascript
       // 初始化任务
        // let initial_data1 = serial_data_package_factory([], current_control_page.value, 'initial');
        // console.log(initial_data1);
        //
        // for(const [index, data] of initial_data1.entries()){
        //   console.log('模拟串口发送：',data.toString('hex'));
        // }
        // console.log(store);

        // console.log('baudRate',baudRate);
```


```javascript
const amplifier_channel2_packaged_setting_power_data = cut_data_package_list(amplifier_channel2_packaged_data,store);
console.log('packaged_setting_power_data',amplifier_channel2_packaged_setting_power_data)
const amplifier_channel2packaged_data = serial_data_package_factory(amplifier_channel2_packaged_setting_power_data[0], PageLocationStateEnum.Amplifier, other_instruct);
```

需要注意的是cut_data_package_list返回是二维数组，而serial_data_package_factory需要的是一维数组，所以需要取[0]。

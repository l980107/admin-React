import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
/**
 * 柱状图路由
 */
export default class Line extends Component {
    getOption = () => {
        return {
            title: {
                text: 'ECharts 入门示例',
            },
            tooltip: {},
            legend: {
                data: ['销量'],
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20],
                },
            ],
        };
    };

    render() {
        return <ReactECharts style={{ margin: 50 }} option={this.getOption()} />;
    }
}

import React, { Component } from 'react';
import ReactECharts from 'echarts-for-react';
import './index.css';
/**
 * 首页路由
 */
export default class Home extends Component {
    getOption = () => {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid',
                    },
                },
            },

            legend: {
                data: ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD'],
            },

            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true,
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2,
                    },
                },
            },

            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)',
                        },
                    },
                    data: [
                        ['2015/11/08', 10, 'DQ'],
                        ['2015/11/09', 15, 'DQ'],
                        ['2015/11/10', 35, 'DQ'],
                        ['2015/11/11', 38, 'DQ'],
                        ['2015/11/12', 22, 'DQ'],
                        ['2015/11/13', 16, 'DQ'],
                        ['2015/11/14', 7, 'DQ'],
                        ['2015/11/15', 2, 'DQ'],
                        ['2015/11/16', 17, 'DQ'],
                        ['2015/11/17', 33, 'DQ'],
                        ['2015/11/18', 40, 'DQ'],
                        ['2015/11/19', 32, 'DQ'],
                        ['2015/11/20', 26, 'DQ'],
                        ['2015/11/21', 35, 'DQ'],
                        ['2015/11/22', 40, 'DQ'],
                        ['2015/11/23', 32, 'DQ'],
                        ['2015/11/24', 26, 'DQ'],
                        ['2015/11/25', 22, 'DQ'],
                        ['2015/11/26', 16, 'DQ'],
                        ['2015/11/27', 22, 'DQ'],
                        ['2015/11/28', 10, 'DQ'],
                        ['2015/11/08', 35, 'TY'],
                        ['2015/11/09', 36, 'TY'],
                        ['2015/11/10', 37, 'TY'],
                        ['2015/11/11', 22, 'TY'],
                        ['2015/11/12', 24, 'TY'],
                        ['2015/11/13', 26, 'TY'],
                        ['2015/11/14', 34, 'TY'],
                        ['2015/11/15', 21, 'TY'],
                        ['2015/11/16', 18, 'TY'],
                        ['2015/11/17', 45, 'TY'],
                        ['2015/11/18', 32, 'TY'],
                        ['2015/11/19', 35, 'TY'],
                        ['2015/11/20', 30, 'TY'],
                        ['2015/11/21', 28, 'TY'],
                        ['2015/11/22', 27, 'TY'],
                        ['2015/11/23', 26, 'TY'],
                        ['2015/11/24', 15, 'TY'],
                        ['2015/11/25', 30, 'TY'],
                        ['2015/11/26', 35, 'TY'],
                        ['2015/11/27', 42, 'TY'],
                        ['2015/11/28', 42, 'TY'],
                        ['2015/11/08', 21, 'SS'],
                        ['2015/11/09', 25, 'SS'],
                        ['2015/11/10', 27, 'SS'],
                        ['2015/11/11', 23, 'SS'],
                        ['2015/11/12', 24, 'SS'],
                        ['2015/11/13', 21, 'SS'],
                        ['2015/11/14', 35, 'SS'],
                        ['2015/11/15', 39, 'SS'],
                        ['2015/11/16', 40, 'SS'],
                        ['2015/11/17', 36, 'SS'],
                        ['2015/11/18', 33, 'SS'],
                        ['2015/11/19', 43, 'SS'],
                        ['2015/11/20', 40, 'SS'],
                        ['2015/11/21', 34, 'SS'],
                        ['2015/11/22', 28, 'SS'],
                        ['2015/11/23', 26, 'SS'],
                        ['2015/11/24', 37, 'SS'],
                        ['2015/11/25', 41, 'SS'],
                        ['2015/11/26', 46, 'SS'],
                        ['2015/11/27', 47, 'SS'],
                        ['2015/11/28', 41, 'SS'],
                        ['2015/11/08', 10, 'QG'],
                        ['2015/11/09', 15, 'QG'],
                        ['2015/11/10', 35, 'QG'],
                        ['2015/11/11', 38, 'QG'],
                        ['2015/11/12', 22, 'QG'],
                        ['2015/11/13', 16, 'QG'],
                        ['2015/11/14', 7, 'QG'],
                        ['2015/11/15', 2, 'QG'],
                        ['2015/11/16', 17, 'QG'],
                        ['2015/11/17', 33, 'QG'],
                        ['2015/11/18', 40, 'QG'],
                        ['2015/11/19', 32, 'QG'],
                        ['2015/11/20', 26, 'QG'],
                        ['2015/11/21', 35, 'QG'],
                        ['2015/11/22', 40, 'QG'],
                        ['2015/11/23', 32, 'QG'],
                        ['2015/11/24', 26, 'QG'],
                        ['2015/11/25', 22, 'QG'],
                        ['2015/11/26', 16, 'QG'],
                        ['2015/11/27', 22, 'QG'],
                        ['2015/11/28', 10, 'QG'],
                        ['2015/11/08', 10, 'SY'],
                        ['2015/11/09', 15, 'SY'],
                        ['2015/11/10', 35, 'SY'],
                        ['2015/11/11', 38, 'SY'],
                        ['2015/11/12', 22, 'SY'],
                        ['2015/11/13', 16, 'SY'],
                        ['2015/11/14', 7, 'SY'],
                        ['2015/11/15', 2, 'SY'],
                        ['2015/11/16', 17, 'SY'],
                        ['2015/11/17', 33, 'SY'],
                        ['2015/11/18', 40, 'SY'],
                        ['2015/11/19', 32, 'SY'],
                        ['2015/11/20', 26, 'SY'],
                        ['2015/11/21', 35, 'SY'],
                        ['2015/11/22', 4, 'SY'],
                        ['2015/11/23', 32, 'SY'],
                        ['2015/11/24', 26, 'SY'],
                        ['2015/11/25', 22, 'SY'],
                        ['2015/11/26', 16, 'SY'],
                        ['2015/11/27', 22, 'SY'],
                        ['2015/11/28', 10, 'SY'],
                        ['2015/11/08', 10, 'DD'],
                        ['2015/11/09', 15, 'DD'],
                        ['2015/11/10', 35, 'DD'],
                        ['2015/11/11', 38, 'DD'],
                        ['2015/11/12', 22, 'DD'],
                        ['2015/11/13', 16, 'DD'],
                        ['2015/11/14', 7, 'DD'],
                        ['2015/11/15', 2, 'DD'],
                        ['2015/11/16', 17, 'DD'],
                        ['2015/11/17', 33, 'DD'],
                        ['2015/11/18', 4, 'DD'],
                        ['2015/11/19', 32, 'DD'],
                        ['2015/11/20', 26, 'DD'],
                        ['2015/11/21', 35, 'DD'],
                        ['2015/11/22', 40, 'DD'],
                        ['2015/11/23', 32, 'DD'],
                        ['2015/11/24', 26, 'DD'],
                        ['2015/11/25', 22, 'DD'],
                        ['2015/11/26', 16, 'DD'],
                        ['2015/11/27', 22, 'DD'],
                        ['2015/11/28', 10, 'DD'],
                    ],
                },
            ],
        };
    };

    getOption2 = () => {
        return {
            title: {
                text: '折线图堆叠',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320],
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                },
            ],
        };
    };
    render() {
        return (
            <div className='first_pages'>
                <ReactECharts style={{marginTop: 50}} option={this.getOption()} />
                <ReactECharts style={{marginTop: 100}} option={this.getOption2()} />
            </div>
        );
    }
}

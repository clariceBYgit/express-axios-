import React, { Component } from 'react'
import banner1 from '../../assets/img/banner1.png'

export default class Map extends Component {
 
//   问题：react父组件中，若父组件传过来的数值是由异步获取是，将其传给子组件，在componentDidMount中使用只能获取在父组件中的初始值，无法获取异步的最新数据
// 问题产生原因：react打包执行后，所有组件都会初始化一遍，由于获取服务器参数的函数是异步调用的，所以在组件初始化的时候获取到的是初始值。当异步函数执行后，值发生改变，此时将参数传递给子组件，一直以为父组件传递参数后，子组件会重新渲染 ，所以在组件挂载之后执行的函数componentDidMount() 中获取参数，但是一直得到的是空值。原来父组件传递的参数改变后，子组件会重新渲染的只有render函数
// 解决问题：使用componentWillReceiveProps
//  componentWillReceiveProps 
  componentWillReceiveProps (nextProps) {
      let { mapData } = nextProps
    //   let obj = {}
    // //  console.log(mapData)
    //     mapData.map((item,index)=>{
    //         // console.log(item.name)
    //         obj[item.name] = item.name
    //         // console.log(obj)
    //     })
    //     for(var item in mapData){
    //         obj[mapData[item].name] = mapData[item]
    //     }
    //     let list = []
    //     for(const key in obj){
    //         obj[key].name = key
    //         list.push(obj[key])
    //     }
    //     console.log(list)
      function randomValue() {
          return Math.round(Math.random()*1000);
                }
                let dataList=[
                    {name:"南海诸岛",value:0},
                    {name: '北京', value: randomValue()},
                    {name: '天津', value: randomValue()},
                    {name: '上海', value: randomValue()},
                    {name: '重庆', value: randomValue()},
                    {name: '河北', value: randomValue()},
                    {name: '河南', value: randomValue()},
                    {name: '云南', value: randomValue()},
                    {name: '辽宁', value: randomValue()},
                    {name: '黑龙江', value: randomValue()},
                    {name: '湖南', value: randomValue()},
                    {name: '安徽', value: randomValue()},
                    {name: '山东', value: randomValue()},
                    {name: '新疆', value: randomValue()},
                    {name: '江苏', value: randomValue()},
                    {name: '浙江', value: randomValue()},
                    {name: '江西', value: randomValue()},
                    {name: '湖北', value: randomValue()},
                    {name: '广西', value: randomValue()},
                    {name: '甘肃', value: randomValue()},
                    {name: '山西', value: randomValue()},
                    {name: '内蒙古', value: randomValue()},
                    {name: '陕西', value: randomValue()},
                    {name: '吉林', value: randomValue()},
                    {name: '福建', value: randomValue()},
                    {name: '贵州', value: randomValue()},
                    {name: '广东', value: randomValue()},
                    {name: '青海', value: randomValue()},
                    {name: '西藏', value: randomValue()},
                    {name: '四川', value: randomValue()},
                    {name: '宁夏', value: randomValue()},
                    {name: '海南', value: randomValue()},
                    {name: '台湾', value: randomValue()},
                    {name: '香港', value: randomValue()},
                    {name: '澳门', value: randomValue()}
    ]
    // 将实时数据的value值进行替换
    dataList.map((item,index)=>{
                    if(mapData[index[item.name]]){
        //                 item.value =mapData[index[item.confirmedNum]]
                    } else {
                        item.value = 0
                    }
                    return item
                })
              console.log(dataList)
                // 由于在public的index.html中导入了echarts.mim.js 在window中，而在此文件中import导入了echarts的话， index.html中导入的China.js，没有对其进行加工   需要改写为 window.echarts
                var myChart = window.echarts.init(document.getElementById('map'));
             
                let option = {
                    tooltip: {
                        formatter:function(params,ticket, callback){
                            return params.seriesName+'<br />'+params.name+'：'+params.value
                        }//数据格式化
                    },
                    visualMap: {
                        min: 0,
                        max: 2000,
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'],//取值范围的文字
                        inRange: {
                            color: ['#eeefff', '#ff0000']//取值范围的颜色
                        },
                        show:true//图注
                    },
                    geo: {
                        map: 'china',
                        roam: false,//不开启缩放和平移
                        zoom:1.23,//视角缩放比例
                        label: {
                            normal: {
                                show: true,
                                fontSize:'10',
                                color: 'rgba(0,0,0,0.7)'
                            }
                        },
                        itemStyle: {
                            normal:{
                                borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis:{
                                areaColor: '#F3B329',//鼠标选择区域颜色
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    series : [
                        {
                            name: '确诊人数',
                            type: 'map',
                            geoIndex: 0,
                            data:dataList
                        }
                    ]
                };
                myChart.setOption(option)
        // console.log(myChart)
    }
 
    render() {
        // console.log( this.props.mapData)
       
      return (
            <div className='contentItem'>
                <div className='banner'>
                    <img src={banner1} alt='banner' />
                </div>
                全国疫情
                <div id='map'></div>
            </div>
        )
    }
}

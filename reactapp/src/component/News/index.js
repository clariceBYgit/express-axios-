import React, { Component } from 'react'
import axios from 'axios'
import banner2 from '../../assets/img/banner2.jpg'
export default class News extends Component {
    constructor () {
        super()
        this.state = {
            datalist: []
        }
    }
    async componentWillMount () {
      let res = await  axios.get('http://localhost:8080/api/news')
      let data = JSON.parse(res.data.data[0].content)
    //   console.log(data.sub_raw_datas)
      this.setState({
          datalist: data.sub_raw_datas
      })
    }
    render() {
        return (
            <div className='contentItem'>
                <div className='banner'>
                    <img src={banner2} alt='banner' />
                    <h1>疫情追踪</h1>
                </div>
                <div className='newContent'>
                    <div className='line'></div>
                    <div className='newList'>
                        {
                            this.state.datalist.map( (item,index)=>{
                                let imgDom = null
                                if (item.raw_data.event_image){
                                  imgDom = (  <div className='img'>
                                  <img src={item.raw_data.event_image.url} alt="" />
                              </div>)
                                    
                                } 
                                return (
                                    <div key={index} className='newsListItem'>
                                        <div className='time'>
                                            {item.raw_data.showtime_string}
                                        </div>
                                        <div className='desc'>
                                            {item.raw_data.desc}
                                        </div>
                                        {imgDom}
                                    </div>
                                )
                            } )
                        }
                    </div>
                </div>

            </div>
        )
    }
}

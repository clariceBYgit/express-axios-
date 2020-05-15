import React, { Component } from 'react'
import axios from 'axios'
import '../src/assets/css/style.css'
import { 
  News,
  Map,
  Oppintions,
  Site,

} from './component'

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      newData: null,
      navList: ['疫情地图','最新进展','广州疫情','直击现场'],
      tabIndex:0,  //默认是第一个，选中
      barStyle:{
        left:'22px'
      },
      contentStyle:{
        transform:'translate(0,0)'
      },
      mapData:[]
    }
  }

  async componentWillMount () {
    let res = await axios.get('http://localhost:8080/api/newsdata')
    let data = JSON.parse(res.data.forum.extra.ncov_string_list)
    this.setState({
      mapData: data.provinces
    })
    // console.log(this.state.mapData[0].name)
  }

  tabClickEvent = (index) => {
    // console.log(index)
    this.setState({
      barStyle:{
        left:(index*88+22)+'px'
      },
      tabIndex:index,
      contentStyle:{
        transform:`translate(-${index*375}px,0)`
      }
     
      
    })
  }
  render() {
    return (
      <div className="app">
        <div className="nav"> 
          {
            this.state.navList.map((item,index) => {
              if(index===this.state.tabIndex){
                return (
                  <div key={index} onClick={()=>{this.tabClickEvent(index)}} className='navItem active'>{item}</div>
                  )
              } else {
                return (
                  <div key={index} onClick={()=>{this.tabClickEvent(index)}} className='navItem'>{item}</div>
                  )
              }
             
            })
          }
          <div className='bar' style={this.state.barStyle}></div>
        </div>
        <div className='content' style={this.state.contentStyle}>
          <Map mapData={this.state.mapData}></Map>
          <News></News>
          <Oppintions></Oppintions>
          <Site></Site>
        </div>
      </div>
    )
  }
}

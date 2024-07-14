import React from 'react'
import Body from './body/Body'
import ToolBar from './toolBar/ToolBar'
import './MainPage.css'

const MainPage = () => {
  return (
    <div className = "mainContainer">
        <ToolBar/>
        <Body/>
    </div>
  )
}

export default MainPage
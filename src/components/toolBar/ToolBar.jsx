import React from 'react'
import './ToolBar.css'

const ToolBar = () => {
  return (
    <div id = "toolBar">
      <div class = "toolBarItem">
        Bubble Sort
      </div>
      <div class = "toolBarItem">
        Merge Sort
      </div>
      <div class = "toolBarItem">
        Heap Sort
      </div>
      <div class = "toolBarItem">
        Quick Sort
      </div>
      <div class = "toolBarItem">
        Selection Sort
      </div>
      <div class = "toolBarItem">
        Insertion Sort
      </div>
      <div class = "toolBarItem">
        Radix Sort
      </div>
    </div>
  )
}

export default ToolBar
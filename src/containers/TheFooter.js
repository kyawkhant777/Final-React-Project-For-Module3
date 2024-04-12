import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
    {/* <div>
      <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
      <span className="ml-1">&copy; 2020 creativeLabs.</span>
    </div> */}
    <div className="mfs-auto">
      <marquee><span>Powered by</span>
      <a style={{color:"royalblue"}} target="_blank"><em><h5>Kyaw Khant!</h5></em></a></marquee>
    </div>
  </CFooter>
  )
}

export default React.memo(TheFooter)

import React, { useContext } from 'react'
import { web3Context } from './context/web3Context'

const Child = () => {
  const obj = useContext(web3Context)
  console.log(obj);
  
  return (
    <div>Child</div>
  )
}

export default Child;
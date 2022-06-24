import React, { useState } from 'react'
import B from './B';
const A = () => {
  const [val, setVal] = useState('Hello')
  return (
    <>
      <B val={val}/>
    </>
  )
}

export default A
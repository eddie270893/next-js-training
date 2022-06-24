import React from 'react'
import C from './C'

const B = (props: {val: string}) => {
  return (
    <div>
      <C val={props.val} />
    </div>
  )
}

export default B
import React from 'react'
import {RotatingLines} from 'react-loader-spinner'

export default function () {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        minHeight:'100vh'
}}>
        <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
        />

    </div>
  )
}

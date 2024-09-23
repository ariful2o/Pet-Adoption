import React from 'react'
import exploreIcon from "../assets/icons/Frame.svg"

export default function CustomBtn({text}) {
  return (
    <button className="btn text-[#0E2515] border-1 border-[#E0E8E0]">{text} <img src={exploreIcon}/></button>
  )
}

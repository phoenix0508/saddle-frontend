import "./AssetButton.scss"

import React, { ReactElement } from "react"

import { Link } from "react-router-dom"
import defaultIcon from "../assets/icons/icon_btc.svg"

interface Props {
  title: string
  to: string
  icon?: string
}

// const icon_btc = require("../assets/icons/icon_btc.svg") as string;

function AssetButton({ title, to, icon }: Props): ReactElement {
  return (
    <Link to={to}>
      <button className="asset">
        <img src={icon ? icon : defaultIcon} alt="" />
        <span>{title}</span>
      </button>
    </Link>
  )
}

export default AssetButton

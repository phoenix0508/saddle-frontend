import { ComponentMeta, ComponentStory } from "@storybook/react"
import { BigNumber } from "ethers"
import React from "react"
import { SWAP_TYPES } from "../constants"
import SwapTokenInput from "../components/SwapTokenInput"
import { TokenOption } from "../pages/Swap"

export default {
  title: "Light components/SwapTokenInput",
  component: SwapTokenInput,
} as ComponentMeta<typeof SwapTokenInput>

const Template: ComponentStory<typeof SwapTokenInput> = (args) => (
  <SwapTokenInput {...args} />
)

const dummyAddr = "0x6b175474e89094c44da98b954eedeac495271d0f"

const tokenOptionLists: TokenOption[] = [
  {
    address: dummyAddr,
    name: "sBTC",
    symbol: "sBTC",
    decimals: 18,
    amount: BigNumber.from("81234500000000"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: true,
  },
  {
    address: dummyAddr,
    name: "renBTC",
    symbol: "RENBTC",
    decimals: 8,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "WBTC",
    symbol: "WBTC",
    decimals: 8,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Dai",
    symbol: "DAI",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "USDC Coin",
    symbol: "USDC",
    decimals: 6,
    amount: BigNumber.from("912345"),
    valueUSD: BigNumber.from("0x42"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Tether",
    symbol: "USDT",
    decimals: 6,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "WETH",
    symbol: "WETH",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Alchemix ETH",
    symbol: "alETH",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Synth sETH",
    symbol: "sETH",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "sUSD",
    symbol: "sUSD",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "tBTCv2",
    symbol: "TBTCv2",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: true,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Alchemix USD",
    symbol: "alUSD",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: false,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Fei Protocol",
    symbol: "FEI",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: false,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Frax",
    symbol: "FRAX",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: false,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Liquity USD",
    symbol: "LUSD",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: false,
    isOnTokenLists: false,
  },
  {
    address: dummyAddr,
    name: "Wrapped Celo USD",
    symbol: "wCUSD",
    decimals: 18,
    amount: BigNumber.from("0x00"),
    valueUSD: BigNumber.from("0x00"),
    swapType: SWAP_TYPES.DIRECT,
    isAvailable: false,
    isOnTokenLists: false,
  },
]
export const SwapInput = Template.bind({})
SwapInput.args = {
  inputValue: "23",
  inputValueUSD: BigNumber.from("234245"),
  tokens: tokenOptionLists,
}

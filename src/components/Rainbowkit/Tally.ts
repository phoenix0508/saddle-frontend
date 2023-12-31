import { Chain, Wallet } from "@rainbow-me/rainbowkit"
import { InjectedConnector } from "wagmi/connectors/injected"

import TallyIcon from "../../assets/icons/tally.svg"

type TallyOptions = {
  chains: Chain[]
  shimDisconnect?: boolean
}

const Tally = ({ chains, shimDisconnect }: TallyOptions): Wallet => ({
  id: "tally",
  iconBackground: "#D08E39",
  name: "Tally Ho",
  iconUrl: TallyIcon,
  downloadUrls: {
    browserExtension:
      "https://chrome.google.com/webstore/detail/tally-ho/eajafomhmkipbjmfmhebemolkcicgfmd",
  },
  createConnector: () => {
    const connector = new InjectedConnector({
      chains,
      options: { shimDisconnect },
    })
    return {
      connector,
    }
  },
})

export default Tally

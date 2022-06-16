import { Gauges, getGaugeData, initialGaugesState } from "../utils/gauges"
import React, { ReactElement, useEffect, useState } from "react"
import {
  useGaugeControllerContract,
  useGaugeMinterContract,
} from "../hooks/useContract"

import { useActiveWeb3React } from "../hooks"

export const GaugeContext = React.createContext<Gauges>(initialGaugesState)

export default function GaugeProvider({
  children,
}: React.PropsWithChildren<unknown>): ReactElement {
  const { chainId, library } = useActiveWeb3React()
  const gaugeControllerContract = useGaugeControllerContract()
  const minterContract = useGaugeMinterContract() // only exists on mainnet
  const [gauges, setGauges] = useState<Gauges>(initialGaugesState)

  useEffect(() => {
    async function fetchGauges() {
      if (!gaugeControllerContract || !chainId || !library || !minterContract)
        return
      const gauges: Gauges =
        (await getGaugeData(
          library,
          chainId,
          gaugeControllerContract,
          minterContract,
        )) || initialGaugesState
      setGauges(gauges)
    }

    void fetchGauges()
  }, [chainId, library, gaugeControllerContract, minterContract])

  return (
    <GaugeContext.Provider value={gauges}>{children}</GaugeContext.Provider>
  )
}

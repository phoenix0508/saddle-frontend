import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { JsonRpcProvider, getDefaultProvider } from "@ethersproject/providers"
import React, { useContext, useEffect, useMemo, useState } from "react"

import CalculateIcon from "@mui/icons-material/Calculate"
import { ExpandedPoolsContext } from "../../providers/ExpandedPoolsProvider"
import { IS_PRODUCTION } from "../../utils/environment"
import { formatUnits } from "ethers/lib/utils"
import { isNumberOrEmpty } from "../../utils"

type BlockState = {
  blockNumber: number
  blockTimestamp: number
  error: string | null
}

export default function DevTool() {
  const provider = useMemo(
    () => !IS_PRODUCTION && getDefaultProvider("http://localhost:8545"),
    [],
  ) as JsonRpcProvider
  const [stateBefore, setStateBefore] = useState<BlockState | null>(null)
  const [stateAfter, setStateAfter] = useState<BlockState | null>(null)

  const [skippingTime, setSkippingTime] = useState<string>("")
  const [openTool, setOpenTool] = useState<boolean>(false)

  const { isLoaded, data: poolsData } = useContext(ExpandedPoolsContext)

  useEffect(() => {
    const getTBlockAndTime = async () => {
      if (!provider) {
        setStateBefore({
          blockNumber: 0,
          blockTimestamp: 0,
          error: "Error fetching current block, provider undefined",
        })
        return
      }
      try {
        const block = await provider.getBlock("latest")
        setStateBefore({
          blockNumber: block.number,
          blockTimestamp: block.timestamp,
          error: null,
        })
      } catch {
        setStateBefore({
          blockNumber: 0,
          blockTimestamp: 0,
          error: "Error fetching current block",
        })
      }
    }
    void getTBlockAndTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isNumberOrEmpty(event.target.value)) {
      setSkippingTime(event.target.value)
    }
  }

  const handleLogPools = () => {
    const dataToLog = Object.values(poolsData.byName).map(
      ({
        poolName,
        tokens,
        underlyingTokens,
        poolAddress,
        basePoolAddress,
        aParameter,
        typeOfAsset,
        isPaused,
      }) => ({
        name: poolName,
        type: ["BTC", "ETH", "USD", "Other"][typeOfAsset],
        aParameter: formatUnits(aParameter, 0),
        isPaused,

        address: poolAddress,
        basePoolAddress,

        tokens: tokens.map(({ symbol, address, decimals }) => ({
          symbol,
          address,
          decimals,
        })),
        underlyingTokens: underlyingTokens?.map(
          ({ symbol, address, decimals }) => ({ symbol, address, decimals }),
        ),
      }),
    )
    console.table(dataToLog)
    console.log(dataToLog)
  }

  const handleSubmit = async () => {
    try {
      if (!provider) {
        setStateAfter({
          blockNumber: 0,
          blockTimestamp: 0,
          error: "Error, provider undefined",
        })
        return
      }
      await provider.send("evm_increaseTime", [+skippingTime])
      await provider.send("evm_mine", [])
      const block = await provider.getBlock("latest")
      setStateAfter({
        blockNumber: block.number,
        blockTimestamp: block.timestamp,
        error: null,
      })
    } catch (error) {
      setStateAfter({
        blockNumber: 0,
        blockTimestamp: 0,
        error: (error as Error).message,
      })
    }
  }

  return (
    <Box>
      <Drawer open={openTool} anchor="right" onClose={() => setOpenTool(false)}>
        <Box width={300} mx="12px" mt="24px">
          <Box>
            <Typography>Block number: {stateBefore?.blockNumber}</Typography>
            <Typography>Timestamp: {stateBefore?.blockTimestamp}</Typography>
            {stateBefore?.error ? (
              <Typography color="error">{stateBefore?.error}</Typography>
            ) : null}
          </Box>
          <Box my="20px">
            <TextField
              fullWidth
              value={skippingTime}
              placeholder="Enter seconds"
              onChange={handleChange}
            />
          </Box>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => void handleSubmit()}
          >
            Submit
          </Button>
          <Collapse in={!!stateAfter}>
            <Box mt="12px">
              <Typography>
                Updated block number: {stateAfter?.blockNumber}
              </Typography>
              <Typography>
                Updated block Timestamp: {stateAfter?.blockTimestamp}
              </Typography>
              {stateAfter?.error ? (
                <Typography color="error">
                  Error: {stateAfter?.error}
                </Typography>
              ) : null}
            </Box>
          </Collapse>

          <Box mt="24px">
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={!isLoaded}
              onClick={() => void handleLogPools()}
            >
              Log Pools State
            </Button>
          </Box>
        </Box>
      </Drawer>
      <Box>
        {!IS_PRODUCTION && (
          <IconButton
            onClick={() => setOpenTool((prev) => !prev)}
            sx={{ position: "fixed", bottom: 24, right: 24 }}
          >
            <CalculateIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

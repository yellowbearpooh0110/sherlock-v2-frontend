import React from "react"

import { Box } from "../../components/Box"
import { Row, Column } from "../../components/Layout"
import Options from "../../components/Options/Options"
import TokenInput from "../../components/TokenInput/TokenInput"
import { Text } from "../../components/Text"
import useERC20 from "../../hooks/useERC20"
import useSherlock, { StakingTypeEnum } from "../../hooks/useSherlock"

import { formatAmount } from "../../utils/format"
import { BigNumber } from "ethers"

export const CalculatorPage: React.FC = () => {
  const { decimals: daiDecimals } = useERC20("DAI")
  const { decimals: usdcDecimals } = useERC20("USDC")
  const { decimals: wftmDecimals } = useERC20("WFTM")

  const [daiAmount, setDAIAmount] = React.useState<string>()
  const [usdcAmount, setUSDCAmount] = React.useState<string>()
  const [wftmAmount, setWFTMAmount] = React.useState<string>()

  const [stakingType, setStakingType] = React.useState<StakingTypeEnum>(StakingTypeEnum.One)

  const { rewardFactor: DAIRewardFactor } = useSherlock("DAI")
  const { rewardFactor: USDCRewardFactor } = useSherlock("USDC")
  const { rewardFactor: WFTMRewardFactor } = useSherlock("WFTM")

  const [daiRewardFactorOne, setDAIRewardFactorOne] = React.useState<number>(0)
  const [daiRewardFactorTwo, setDAIRewardFactorTwo] = React.useState<number>(0)
  const [usdcRewardFactorOne, setUSDCRewardFactorOne] = React.useState<number>(0)
  const [usdcRewardFactorTwo, setUSDCRewardFactorTwo] = React.useState<number>(0)
  const [wftmRewardFactorOne, setWFTMRewardFactorOne] = React.useState<number>(0)
  const [wftmRewardFactorTwo, setWFTMRewardFactorTwo] = React.useState<number>(0)

  React.useEffect(() => {
    DAIRewardFactor(StakingTypeEnum.One).then((value) => {
      setDAIRewardFactorOne(value.div(BigNumber.from(10).pow(daiDecimals - 3)).toNumber() / 1000)
    })
    DAIRewardFactor(StakingTypeEnum.Two).then((value) => {
      setDAIRewardFactorTwo(value.div(BigNumber.from(10).pow(daiDecimals - 3)).toNumber() / 1000)
    })
  }, [DAIRewardFactor, daiDecimals])

  React.useEffect(() => {
    USDCRewardFactor(StakingTypeEnum.One).then((value) => {
      setUSDCRewardFactorOne(value.div(BigNumber.from(10).pow(usdcDecimals - 3)).toNumber() / 1000)
    })
    USDCRewardFactor(StakingTypeEnum.Two).then((value) => {
      setUSDCRewardFactorTwo(value.div(BigNumber.from(10).pow(usdcDecimals - 3)).toNumber() / 1000)
    })
  }, [USDCRewardFactor, usdcDecimals])

  React.useEffect(() => {
    WFTMRewardFactor(StakingTypeEnum.One).then((value) => {
      setWFTMRewardFactorOne(value.div(BigNumber.from(10).pow(wftmDecimals - 3)).toNumber() / 1000)
    })
    WFTMRewardFactor(StakingTypeEnum.Two).then((value) => {
      setWFTMRewardFactorTwo(value.div(BigNumber.from(10).pow(wftmDecimals - 3)).toNumber() / 1000)
    })
  }, [WFTMRewardFactor, wftmDecimals])

  return (
    <Column spacing="m">
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={daiDecimals}
                  value={daiAmount}
                  setValue={setDAIAmount}
                  token="DAI"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingType}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingType(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {daiAmount &&
                    formatAmount(
                      Number(daiAmount) *
                        (stakingType === StakingTypeEnum.One ? daiRewardFactorOne : daiRewardFactorTwo)
                    )}{" "}
                  DAI
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={usdcDecimals}
                  value={usdcAmount}
                  setValue={setUSDCAmount}
                  token="USDC"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingType}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingType(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {usdcAmount &&
                    formatAmount(
                      Number(usdcAmount) *
                        (stakingType === StakingTypeEnum.One ? usdcRewardFactorOne : usdcRewardFactorTwo)
                    )}{" "}
                  USDC
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
      <Row>
        <Box fullWidth>
          <Column spacing="m">
            <Row spacing="m">
              <Column grow={1} spacing="m">
                <TokenInput
                  decimals={wftmDecimals}
                  value={wftmAmount}
                  setValue={setWFTMAmount}
                  token="WFTM"
                  placeholder="Choose amount"
                ></TokenInput>
              </Column>
            </Row>
            <Row spacing="m">
              <Options
                value={stakingType}
                options={[
                  { label: "15 days", value: StakingTypeEnum.One },
                  { label: "30 days", value: StakingTypeEnum.Two },
                ]}
                onChange={(value: StakingTypeEnum) => setStakingType(value)}
              />
            </Row>
            <Row alignment="space-between">
              <Column>
                <Text>Estimated Rewards</Text>
              </Column>
              <Column>
                <Text strong variant="mono">
                  {wftmAmount &&
                    formatAmount(
                      Number(wftmAmount) *
                        (stakingType === StakingTypeEnum.One ? wftmRewardFactorOne : wftmRewardFactorTwo)
                    )}{" "}
                  WFTM
                </Text>
              </Column>
            </Row>
          </Column>
        </Box>
      </Row>
    </Column>
  )
}

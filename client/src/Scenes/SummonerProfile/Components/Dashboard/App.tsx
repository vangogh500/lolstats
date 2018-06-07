/**
 * @file Summoner profile dashboard
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { SeasonQueueStats } from 'Services/GraphQL/types'

import { VictoryTheme, VictoryChart, VictoryLine, VictoryAxis, VictoryVoronoiContainer } from 'victory'
import ToolTip from 'Components/Chart/ToolTip'

/**
 * Query string
 */
const query = gql`
  query summonerProfileDashboard($accountId: String!, $seasonId: String!, $queueId: String!) {
    seasonQueueStats(accountId: $accountId, seasonId: $seasonId, queueId: $queueId) {
      lp
      matchSummaries {
        id
        lpDelta
        spDelta
        dateTime
      }
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  seasonQueueStats: SeasonQueueStats
}
/**
 * Query variable types
 */
interface QueryVariables {
  accountId: string,
  seasonId: string,
  queueId: string
}
/**
 * Summoner Profile Dashboard Query
 */
class SummonerProfileDashboardQuery extends Query<QueryResponseData, QueryVariables> {}

/**
 * @type PropTypes
 * @prop {string} accountId
 * @prop {string} seasonId
 * @prop {string} queueId
 */
interface PropTypes {
  accountId: string,
  seasonId: string,
  queueId: string
}
/**
 * @type StateTypes
 */
interface StateType {}

/**
 * Summoner profile dashboard component
 */
export default class extends React.Component<PropTypes, StateType> {
  render() {
    const {accountId, seasonId, queueId} = this.props
    return (
      <SummonerProfileDashboardQuery query={query} variables={{ accountId, seasonId, queueId }}>
        {
          ({loading, error, data}) => {
            if(!loading) {
              if(data) {
                console.log({loading, error, data})
                const {seasonQueueStats} = data
                const {lp, matchSummaries} = seasonQueueStats

                const [_, ...plots] = matchSummaries.reverse().reduce((acc, summary, i) => {
                  return [...acc, {
                    x: summary.dateTime,
                    y: acc[i].y - ( (i-1 < 0) ? 0 : matchSummaries[i-1].lpDelta)
                  }]
                }, [{ x: 0, y: lp}])
                const [yMax, yMin] = plots.reduce(([max, min], plot) => (
                  [Math.max(max, plot.y), Math.min(min, plot.y)]
                ), [plots[0].y, plots[0].y])
                const today_start = new Date(2018, 1, 2, 0)
                const today_end = new Date(2018, 1, 2, 24)
                console.log(today_start.getTime() + "," + today_end.getTime())
                return (
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-8">
                        <VictoryChart
                          theme={VictoryTheme.material}
                          domain={{x: [today_start, today_end], y: [yMin, yMax]}}
                          style={{parent: { width: "100%"}}}
                          scale={{ x: 'time', y: 'linear' }}
                          containerComponent={<VictoryVoronoiContainer
                            labels={(d) => d.y}
                            labelComponent={<ToolTip />}
                          />}>
                          <VictoryAxis crossAxis tickFormat={() => ''} />
                          <VictoryLine
                            style={{data: { stroke: '#21ce99', strokeWidth: '1' }}}
                            y={(datum) => {
                              const plot = plots.find(plot => {
                                return plot.x <= datum.x
                              })
                              if(!plot) {
                                return plots[plots.length - 1].y - matchSummaries[0].lpDelta
                              } else {
                                return plot.y
                              }
                            }} />
                        </VictoryChart>
                      </div>
                      <div className="col-4">
                      </div>
                    </div>
                  </div>
                )
              } else {
                return null
              }
            } else {
              return null
            }
          }
        }
      </SummonerProfileDashboardQuery>
    )
  }
}

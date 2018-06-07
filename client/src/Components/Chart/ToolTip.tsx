import * as React from 'react'
import {Point} from 'victory'

/**
 * @type PropTypes
 * @prop {string} accountId
 * @prop {string} seasonId
 * @prop {string} queueId
 */
interface PropTypes {
  x?: number,
  y?: number,
  datum?: any,
  active?: any
}
/**
 * @type StateTypes
 */
interface StateType {}

export default class ToolTip extends React.Component<PropTypes, StateType> {
  render() {
    const { x, y, datum, active } = this.props
    const dateString = new Date(datum.x).toLocaleDateString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: 'short'
    }).replace(/[\w\/,]*\s/,'')
    return (
      <g>
        <text fontSize={8} color="#8c8c8e" textAnchor="middle" x={x} y={25}>{dateString}</text>
        <line stroke="#8c8c8e" strokeWidth="0.5" x1={x} x2={x} y1={30} y2={y+200} />
        <Point
          datum={datum}
          size={2}
          symbol={"circle"}
          style={{ fill: '#21ce99' }}
          x={x}
          y={y} />
      </g>
    )
  }
}

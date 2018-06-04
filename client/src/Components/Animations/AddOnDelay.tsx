/**
 * @file AddOnDelay
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'

/**
 * @type AddOnDelay
 * @prop {React.ReactNode} children ReactNode children
 * @prop {string} className CSS class for primary nav bar
 * @prop {number} delay Delay in ms
 */
interface PropType {
  children?: React.ReactNode,
  className?: string,
  delay: number
}
/**
 * @type AddOnDelay
 * @prop {boolean} hidden Whether contents are hidden
 */
interface StateType {
  hidden: boolean
}

/**
 * AddOnDelay
 * Content will be added after delay
 */
export default class AddOnDelay extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = { hidden: true }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false })
    }, this.props.delay)
  }
  render() {
    const {children, className} = this.props
    if(this.state.hidden) {
      return null
    } else {
      return (
        <div ref="container" className={className}>
          { children }
        </div>
      )
    }
  }
}

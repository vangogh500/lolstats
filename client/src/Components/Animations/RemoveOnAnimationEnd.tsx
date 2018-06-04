/**
 * @file RemoveOnAnimationEnd
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'

/**
 * @type RemoveOnAnimationEnd prop types
 * @prop {React.ReactNode} children ReactNode children
 * @prop {string} className CSS class for primary nav bar
 */
interface PropType {
  children?: React.ReactNode,
  className?: string
}
/**
 * @type RemoveOnAnimationEnd state types
 * @prop {boolean} hidden Whether contents are hidden
 */
interface StateType {
  hidden: boolean
}

/**
 * RemoveOnAnimationEnd
 * Contents will be removed after animationEndEvent is triggered
 */
export default class RemoveOnAnimationEnd extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = { hidden: false }
  }
  onAnimationEnd() {
    this.setState({ hidden: true })
  }
  render() {
    const {children, className} = this.props
    if(this.state.hidden) {
      return null
    } else {
      return (
        <div ref="container" className={className} onAnimationEnd={(e) => this.onAnimationEnd()}>
          {children}
        </div>
      )
    }
  }
}

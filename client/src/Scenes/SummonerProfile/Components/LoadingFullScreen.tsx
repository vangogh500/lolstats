/**
 * @file loading animation for full screen
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'


interface PropTypes {
  className?: string
}

interface StateType {
}

export default class LoadingFullScreen extends React.Component<PropTypes, StateType> {
  render() {
    const {className} = this.props
    return (
      <div className={className}>
        <div>
          <img src="https://streamlabs.com/images/gallery/default.gif"/>
        </div>
        <h5 className="mt-4 text-white font-family-vt323">
          Contacting HQ
          <span className="animation-loop-blink">.</span>
          <span className="animation-loop-blink animation-delay-200">.</span>
          <span className="animation-loop-blink animation-delay-400">.</span>
        </h5>
      </div>
    )
  }
}

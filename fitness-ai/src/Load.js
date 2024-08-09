import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../src/assets/Animation - 1723192106101.json'

export default class LottieControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isStopped: false, isPaused: false};
  }

  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
              height={200}
              width={200}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}/>
    </div>
  }
}
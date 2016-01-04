import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import CountCarousel from 'cmp/CountCarousel'
import Icons from 'cmp/Icons'
import Feature from 'cmp/Feature'

import CSS from 'css/apply'
import styles from 'css/Splash'

class Splash extends Component {
  state = {
    feature: 1,
  }

  handleClick = feature => event => {
    this.setState({feature})
  }

  render() {
    const { feature } = this.state
    return (
      <div styleName="container">
        <section styleName="fold">
          <div styleName="space" />
          <div styleName="title">Can you do <CountCarousel /> pushups in 2016?</div>
          <div styleName="subtitle">There's only one way to find out.</div>
          <Link styleName="sign-up" to="/register">Sign up today</Link>
          <div styleName="_space" />
          <div styleName="details">
            More details
            <Icons.ChevronDown styleName="details-icon" />
          </div>
        </section>
        <section styleName="features">
          <div styleName="feature-list">
            <Feature
              styleName="feature"
              number={1}
              active={feature == 1}
              onClick={this.handleClick}
              title="Simple">
              pushups.io couldn't be easier to use.  Just set a goal for the year, and add and subtract pushups as you go throughout your day.
            </Feature>
            <Feature
              styleName="feature"
              number={2}
              active={feature == 2}
              onClick={this.handleClick}
              title="Customizable">
              One size doesn't fit all, so why should one app?  Choose a goal that fits your fitness level, and even select a color to match your personality.
            </Feature>
            <Feature
              styleName="feature"
              number={3}
              active={feature == 3}
              onClick={this.handleClick}
              title="Informative">
              Get at at-a-glance overview of your current progress.  All the tools you need to reach your goal.
            </Feature>
          </div>
          <div styleName="feature-preview">
            <div styleName="screenshot" className={`screenshot${feature}`} />
          </div>
        </section>
        <section styleName="contact">
          Get in touch on twitter!
          <a href="//twitter.com/pushupsio" styleName="twitter-handle">@pushupsio</a>
        </section>
      </div>
    )
  }
}

export default CSS(Splash, styles)

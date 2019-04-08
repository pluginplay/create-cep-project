import React from 'react'
import Flex from 'styled-flex-component'
import styled from 'styled-components'

class About extends React.Component {
  render () {
    return (
      <Flex column alignCenter justifyCenter className={this.props.className}>
        <p>Version <strong>{process.env.APP_VERSION}</strong></p>
        <p className={'footer'}>Created with ❤</p>
      </Flex>
    )
  }
}

export default styled(About)`
  margin-top: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  img {
    width: 300px;
    max-width: 80%;
    margin: auto 0 10px 0;
  }
  p {
    margin: 0;
  }
  .footer {
    color: ${props => props.theme.background.lighter};
    margin: auto auto 20px auto;
  }
`

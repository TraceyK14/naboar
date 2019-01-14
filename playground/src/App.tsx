import React, { Component } from 'react'
import { css } from 'styled-components'
import {
  Button,
  IconIOS,
  IconLogo,
  IconMD,
  Input,
  NavDrawer,
  NavDrawerDivider,
  NavDrawerLink,
} from '../../src'

class App extends Component {
  state = {
    activeIndex: 0,
    notifs: [],
    text: 'Clear Me',
  }

  clearText = () => this.setState({ text: '' })
  updateText = text => this.setState({ text })
  updateActiveIndex = activeIndex => this.setState({ activeIndex })

  render() {
    return (
      <div>
        <Button onClick={alert}>Click Me</Button>
        <IconIOS name="open" size={35} />
        <IconLogo name="github" color="blue" size={35} />
        <IconMD name="close" color="red" size={35} />
        <Input css={inputStyles} name="test" type="number" min={34} max={50} />
        <Input
          css={inputStyles}
          name="clearTest"
          value={this.state.text}
          canClear={!!this.state.text}
          onClear={this.clearText}
          onChange={e => this.updateText(e.target.value)}
        />
        <Input
          disabled={true}
          css={inputStyles}
          name="disabledTest"
          value={"Can't touch this"}
        />
        <NavDrawer from={45} to={350} title={'Application'}>
          <NavDrawerLink
            css={linkStyles}
            title={'First Item'}
            iconName={'trending-up'}
            isActive={this.state.activeIndex === 0}
            onClick={() => this.updateActiveIndex(0)}
          />
          <NavDrawerLink
            css={linkStyles}
            title={'Second Item'}
            iconName={'trending-up'}
            isActive={this.state.activeIndex === 1}
            onClick={() => this.updateActiveIndex(1)}
          />
          <NavDrawerDivider css={dividerStyles}/>
          <NavDrawerLink
            css={linkStyles}
            title={'Group 2 - First Item'}
            iconName={'trending-up'}
            isActive={this.state.activeIndex === 2}
            onClick={() => this.updateActiveIndex(2)}
          />
          <NavDrawerLink
            css={linkStyles}
            title={'Group 2 - Second Item'}
            iconName={'trending-up'}
            isActive={this.state.activeIndex === 3}
            onClick={() => this.updateActiveIndex(3)}
          />
        </NavDrawer>
      </div>
    )
  }
}

const inputStyles = css`
  color: black;
  border: 1px solid;
  width: 300px;
  i {
    color: black;
  }
`

const dividerStyles = css`
  margin-top: 30px;
  width: 90%;
`

const linkStyles = css`
  padding: 10px;
  &:hover {
    background: #11a07c;
    cursor: pointer;
  }
`

export default App

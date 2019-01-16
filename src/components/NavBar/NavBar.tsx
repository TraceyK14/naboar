import React from 'react'
import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { Expand } from '../..'
import detectElementOverflow from '../../helperFns/detectElementOverflow'
import { ITheme } from '../../theme'
import { Dropdown, DropdownItem, DropdownMenu, DropdownNode } from '../Dropdown'
import { IconMD, md } from '../Icon'
import { INavBarLinkProps, NavBarHeader, NavBarLink  } from './index'

/**
 * NavBar State interface
 */
interface IState {
  /** isMenuOpen */
  isMenuOpen: boolean
  /** isMenuVisible */
  isMenuVisible: boolean
  /** Total Navlink width */
  navLinksWidth: number
  windowWidth: number
}

/**
 * NavBar prop interface
 */
interface IProps {
  /** NavBar Links */
  children: React.ReactNode
  /** CSS styling using css from styled-components */
  css?: FlattenSimpleInterpolation
  /** isMenuOpen */
  isMenuOpen?: boolean
  /** Event fired on click */
  onClick?: () => void
  /** Nav title */
  title: string
}

/**
 * NavBar Component
 * @since v1.0.0
 * @author Tracey King
 */
class NavBar extends React.Component<IProps, IState> {
  state = {
    isMenuOpen: this.props.isMenuOpen || false,
    isMenuVisible: false,
    navLinksWidth: 0,
    windowWidth: window.innerWidth,
  }
  private wrapper: any
  private navLinksWrapper: any

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })
  toggleMenuVisibility = () => {
    const windowWidth = window.innerWidth
    if (
      this.navLinksWrapper &&
      detectElementOverflow(this.navLinksWrapper, this.wrapper).overflowRight
    ) {
      return this.setState({
        isMenuOpen: false,
        isMenuVisible: true,
        navLinksWidth: this.navLinksWrapper.offsetWidth,
        windowWidth,
      })
    } else if (
      !this.navLinksWrapper &&
      (this.wrapper.offsetWidth - 133 > this.state.navLinksWidth) &&
      this.state.windowWidth < windowWidth
    ) {
      return this.setState({
        isMenuOpen: false,
        isMenuVisible: false,
        windowWidth,
      })
    }

    return this.setState({ windowWidth })
  }
  calculateExpandHeight = () => {
    return React.Children.toArray(this.props.children).length * 40
  }

  componentDidMount() {
    this.toggleMenuVisibility()
    window.addEventListener('resize', this.toggleMenuVisibility)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleMenuVisibility)
  }

  cloneWithProps = () => {
    return React.Children.toArray(this.props.children)
      .map((child: React.ReactElement<INavBarLinkProps>) => React.cloneElement(child, {
        onClick: () => { child.props.onClick(); this.toggleMenu() }
      }))
  }

  render() {
    return (
      <Wrapper
        css={this.props.css}
        ref={ref => (this.wrapper = ref)}
        isMenuVisible={this.state.isMenuVisible}
      >
        <NavBarHeader title={this.props.title} onClick={this.props.onClick} />
        {!this.state.isMenuVisible ? (
          <NavLinksWrapper ref={(ref: any) => (this.navLinksWrapper = ref)}>
            {this.cloneWithProps()}
          </NavLinksWrapper>
        ) : (
          <MenuWrapper>
            <NavBarLink onClick={this.toggleMenu}>
              <IconMD name={'menu'} color={'white'} />
            </NavBarLink>
            <Expand
              from={0}
              to={this.calculateExpandHeight()}
              vertical={true}
              isExpanded={this.state.isMenuOpen}
              css={menuStyles}
            >
              {this.cloneWithProps()}
            </Expand>
          </MenuWrapper>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  background-color: ${({ theme }: IStyledProps) => theme.black};
  color: ${({ theme }: IStyledProps) => theme.white};
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: ${({ isMenuVisible }: IStyledProps) =>
    isMenuVisible ? 'visible' : 'hidden'};

  ${(props: IStyledProps) => props.css}
`

const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`

const menuStyles = css`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 99999;
  background: black;
`

interface IStyledProps {
  css?: FlattenSimpleInterpolation
  isMenuVisible?: boolean
  theme: ITheme
}

export default NavBar
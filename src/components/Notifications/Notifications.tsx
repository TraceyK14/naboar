import React, { Component, ReactNode } from 'react'
import styled from 'styled-components'
import Fade from '../../effects/Fade'

const PERMISSION = {
  DEFAULT: 'default',
  DENIED: 'denied',
  GRANTED: 'granted',
}

/**
 * Notifications Component
 *
 * Ask for push notifications permission,
 * if it's granted use native notificationss,
 * if not use a custom in browser solution ones.
 *
 * @since v1.0.0
 * @author [Anthony Freda](https://github.com/Afreda323)
 */
class Notifications extends Component<IProps, IState> {
  state = {
    permission: PERMISSION.DEFAULT,
  }

  /** Call requestPermissions */
  componentDidMount() {
    this.requestPermissions()
  }
  /** Ask the user for permission to send push notifications */
  requestPermissions() {
    if (!Notification) {
      return
    }
    if (Notification.permission === PERMISSION.GRANTED) {
      return this.setState({ permission: PERMISSION.GRANTED })
    }
    if (Notification.permission === PERMISSION.DENIED) {
      return this.setState({ permission: PERMISSION.DENIED })
    }

    Notification.requestPermission().then(permission => {
      if (permission === PERMISSION.GRANTED) {
        this.setState({ permission: PERMISSION.GRANTED })
      }
    })
  }

  componentDidUpdate(prevProps: IProps) {
    const prev = prevProps.notifications
    const next = this.props.notifications

    const newNotifs = next.filter(val => prev.indexOf(val) === -1)

    newNotifs.forEach(this.notify)
  }

  notify = (notif: INotification) => {
    if (!Notification || this.state.permission !== PERMISSION.GRANTED) {
      // custom notif
    } else {
      const options = notif as NotificationOptions
      const n = new Notification(notif.title, { ...options })
      n.onclick = e => {
        e.preventDefault()
        if (this.props.onClick) {
          this.props.onClick(e)
        }
      }

      n.onclose = e => {
        e.preventDefault()
        if (this.props.onClose) {
          this.props.onClose(e)
        }
      }

      n.onerror = e => {
        e.preventDefault()
        if (this.props.onError) {
          this.props.onError(e)
        }
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <Fade shouldShow={true} from="right" distance={30}>
          <div>Hello</div>
        </Fade>
      </Wrapper>
    )
  }
}

// Types -----

/** Notification interface */
interface INotification {
  title: string
  body: string
  icon?: string
  image?: string
  badge?: string
  dir?: string
  lang?: string
  tag?: string
  timeout?: string
  data?: ReactNode
  vibrate?: ReactNode
  renotify?: boolean
  requireInteraction?: boolean
}

/** Notifications props interface */
interface IProps {
  notifications: INotification[]
  onClose?: (e?: Event) => void
  onClick?: (e?: Event) => void
  onError?: (e?: Event) => void
}

interface IState {
  permission: string
}

// Styled Components -----

const Wrapper = styled.div`
  display: inline-block;
  position: fixed;
  z-index: 10;
  width: 400px;
  max-width: calc(100vw - 32px);
  right: 0;
  top: 0;
  bottom: auto;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const StyledNotification = styled.div`
  padding: 16px 24px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #444;
  color: white;
  line-height: 1.5;
  position: relative;
  overflow: hidden;
  margin: 0 24px 16px 8px;
  max-width: 380px;
`

const Title = styled.h2`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 8px;
  line-height: 24px;
  display: inline-block;
`

const Body = styled.p`
  color: rgba(255, 255, 255, 0.65);
  font-size: 16px;
`

export default Notifications

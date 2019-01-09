import styled from 'styled-components'
import { ITheme } from '../../theme'

/**
 * Icon Component
 * @since v1.0.0
 * @author Tracey King
 */

const Icon = styled.i`
  color: ${({ theme, color }: IProps) => color || theme.black};
  font-size: ${({ size }: IProps) => size || 19}px;

  ${({ css }: IProps) => css && css}
`

interface IProps {
  /** Color of icon */
  color?: string
  /** CSS properties using css helper from styled-components */
  css?: string[]
  /** Size of font in px */
  size?: number
  /** Theme */
  theme: ITheme
}

export default Icon
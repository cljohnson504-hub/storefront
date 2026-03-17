import { render, screen } from '@testing-library/react'

jest.mock('framer-motion')

import FadeUp from './FadeUp'

describe('FadeUp', () => {
  it('renders its children', () => {
    render(<FadeUp><span>hello world</span></FadeUp>)
    expect(screen.getByText('hello world')).toBeInTheDocument()
  })

  it('renders with a delay prop without crashing', () => {
    render(<FadeUp delay={0.3}><span>delayed</span></FadeUp>)
    expect(screen.getByText('delayed')).toBeInTheDocument()
  })
})

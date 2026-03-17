import { render, screen, fireEvent } from '@testing-library/react'
import BeforeAfter from './BeforeAfter'

describe('BeforeAfter', () => {
  it('renders section heading with label prop', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" primaryColor="#1d4ed8" />)
    expect(screen.getByText('See Our Work')).toBeInTheDocument()
  })

  it('renders section heading with left-border inline style', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" primaryColor="#1d4ed8" />)
    const heading = screen.getByText('See Our Work')
    expect(heading).toHaveStyle({ borderLeft: '3px solid #1d4ed8', paddingLeft: '12px' })
  })

  it('shows BEFORE overlay when rendered', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" afterImageUrl="/after.jpg" primaryColor="#1d4ed8" />)
    expect(screen.getByText('BEFORE')).toBeInTheDocument()
  })

  it('shows hint text before first tap', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" afterImageUrl="/after.jpg" primaryColor="#1d4ed8" />)
    expect(screen.getByText('Tap to reveal after')).toBeInTheDocument()
  })

  it('toggles to AFTER on tap and hides hint', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" afterImageUrl="/after.jpg" primaryColor="#1d4ed8" />)
    const container = screen.getByTestId('before-after-container')
    fireEvent.click(container)
    expect(screen.getByText('AFTER')).toBeInTheDocument()
    expect(screen.queryByText('Tap to reveal after')).not.toBeInTheDocument()
  })

  it('renders static image when afterImageUrl is missing', () => {
    render(<BeforeAfter label="See Our Work" beforeImageUrl="/before.jpg" primaryColor="#1d4ed8" />)
    const img = screen.getByRole('img') as HTMLImageElement
    expect(img.src).toContain('/before.jpg')
    expect(screen.queryByText('Tap to reveal after')).not.toBeInTheDocument()
  })
})

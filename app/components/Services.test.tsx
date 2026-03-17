import { render, screen } from '@testing-library/react'

jest.mock('./FadeUp', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

import Services from './Services'

describe('Services', () => {
  it('renders all service items', () => {
    render(<Services services={['Drain Cleaning', 'Pipe Repair']} primaryColor="#1d4ed8" />)
    expect(screen.getByText('Drain Cleaning')).toBeInTheDocument()
    expect(screen.getByText('Pipe Repair')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Services services={['Test']} primaryColor="#1d4ed8" />)
    expect(screen.getByText('Our Services')).toBeInTheDocument()
  })

  it('renders service chips with border class (not border-2)', () => {
    render(<Services services={['Drain Cleaning']} primaryColor="#1d4ed8" />)
    const chip = screen.getByText('Drain Cleaning')
    expect(chip).toHaveClass('border')
    expect(chip).not.toHaveClass('border-2')
  })

  it('renders h2 with left-border inline style', () => {
    render(<Services services={['Test']} primaryColor="#1d4ed8" />)
    const heading = screen.getByText('Our Services')
    expect(heading).toHaveStyle({ borderLeft: '3px solid #1d4ed8', paddingLeft: '12px' })
  })
})

import { render, screen } from '@testing-library/react'
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
})

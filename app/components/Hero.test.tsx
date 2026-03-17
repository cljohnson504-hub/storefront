import { render, screen } from '@testing-library/react'
import Hero from './Hero'

const props = {
  businessName: 'Test Plumbing',
  tagline: 'We fix leaks',
  phone: '555-1234',
  primaryColor: '#1d4ed8',
  logoUrl: '',
}

describe('Hero', () => {
  it('renders business name', () => {
    render(<Hero {...props} />)
    expect(screen.getByText('Test Plumbing')).toBeInTheDocument()
  })

  it('renders tagline', () => {
    render(<Hero {...props} />)
    expect(screen.getByText('We fix leaks')).toBeInTheDocument()
  })

  it('renders a call link with correct href', () => {
    render(<Hero {...props} />)
    const link = screen.getByRole('link', { name: /call/i })
    expect(link).toHaveAttribute('href', 'tel:555-1234')
  })
})

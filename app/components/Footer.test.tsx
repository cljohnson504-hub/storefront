import { render, screen } from '@testing-library/react'
import Footer from './Footer'

const props = {
  businessName: 'Test Plumbing',
  phone: '555-1234',
  address: '123 Main St, Springfield, IL',
  googleMapsUrl: 'https://maps.google.com',
  socialLinks: { facebook: 'https://facebook.com/test' },
}

describe('Footer', () => {
  it('renders business name', () => {
    render(<Footer {...props} />)
    expect(screen.getByText('Test Plumbing')).toBeInTheDocument()
  })

  it('renders phone link', () => {
    render(<Footer {...props} />)
    const link = screen.getByRole('link', { name: '555-1234' })
    expect(link).toHaveAttribute('href', 'tel:555-1234')
  })

  it('renders address with Google Maps link', () => {
    render(<Footer {...props} />)
    const link = screen.getByRole('link', { name: /main st/i })
    expect(link).toHaveAttribute('href', 'https://maps.google.com')
  })

  it('renders Facebook link when provided', () => {
    render(<Footer {...props} />)
    const link = screen.getByRole('link', { name: /facebook/i })
    expect(link).toHaveAttribute('href', 'https://facebook.com/test')
  })

  it('does not render Facebook link when not provided', () => {
    render(<Footer {...props} socialLinks={undefined} />)
    expect(screen.queryByRole('link', { name: /facebook/i })).not.toBeInTheDocument()
  })
})

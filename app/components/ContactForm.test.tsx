import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}))
import * as emailjs from '@emailjs/browser'

const props = {
  contactEmail: 'owner@example.com',
  businessName: 'Test Co',
  emailjsServiceId: 'svc',
  emailjsTemplateId: 'tmpl',
  emailjsPublicKey: 'key',
  primaryColor: '#1d4ed8',
}

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields', () => {
    render(<ContactForm {...props} />)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/your phone/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/message/i)).toBeInTheDocument()
  })

  it('shows success message after successful submit', async () => {
    ;(emailjs.send as jest.Mock).mockResolvedValueOnce({ status: 200 })
    render(<ContactForm {...props} />)

    await userEvent.type(screen.getByPlaceholderText(/your name/i), 'John')
    await userEvent.type(screen.getByPlaceholderText(/your phone/i), '555-1234')
    await userEvent.type(screen.getByPlaceholderText(/message/i), 'Hello')
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })

  it('shows error message on failed submit', async () => {
    ;(emailjs.send as jest.Mock).mockRejectedValueOnce(new Error('fail'))
    render(<ContactForm {...props} />)

    await userEvent.type(screen.getByPlaceholderText(/your name/i), 'John')
    await userEvent.type(screen.getByPlaceholderText(/your phone/i), '555-1234')
    await userEvent.type(screen.getByPlaceholderText(/message/i), 'Hello')
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('renders h2 with left-border inline style', () => {
    render(<ContactForm businessName="Test" primaryColor="#1d4ed8" contactEmail="" emailjsServiceId="" emailjsTemplateId="" emailjsPublicKey="" />)
    const heading = screen.getByText('Contact Us')
    expect(heading).toHaveStyle({ borderLeft: '3px solid #1d4ed8', paddingLeft: '12px' })
  })
})

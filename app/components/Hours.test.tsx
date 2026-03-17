import { render, screen } from '@testing-library/react'
import Hours from './Hours'

const hours = [
  { days: 'Mon–Fri', time: '7am–6pm' },
  { days: 'Sat', time: '8am–2pm' },
]

describe('Hours', () => {
  it('renders all hours rows', () => {
    render(<Hours hours={hours} primaryColor="#1d4ed8" />)
    expect(screen.getByText('Mon–Fri')).toBeInTheDocument()
    expect(screen.getByText('7am–6pm')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Hours hours={hours} primaryColor="#1d4ed8" />)
    expect(screen.getByText('Business Hours')).toBeInTheDocument()
  })

  it('renders h2 with left-border inline style', () => {
    render(<Hours hours={[]} primaryColor="#1d4ed8" />)
    const heading = screen.getByText('Business Hours')
    expect(heading).toHaveStyle({ borderLeft: '3px solid #1d4ed8', paddingLeft: '12px' })
  })
})

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Gallery from './Gallery'

jest.mock('./FadeUp', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const images = ['/photo1.jpg', '/photo2.jpg', '/photo3.jpg']

describe('Gallery', () => {
  it('renders section heading with label prop', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    expect(screen.getByText('Our Work')).toBeInTheDocument()
  })

  it('renders heading with left-border inline style', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    const heading = screen.getByText('Our Work')
    expect(heading).toHaveStyle({ borderLeft: '3px solid #1d4ed8', paddingLeft: '12px' })
  })

  it('renders the correct number of images', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    expect(screen.getAllByTestId('gallery-item')).toHaveLength(3)
  })

  it('opens lightbox when a photo is clicked', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    fireEvent.click(screen.getAllByTestId('gallery-item')[0])
    expect(screen.getByTestId('lightbox-image')).toBeInTheDocument()
  })

  it('clicking image inside lightbox does NOT close it', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    fireEvent.click(screen.getAllByTestId('gallery-item')[0])
    const lightboxImg = screen.getByTestId('lightbox-image')
    fireEvent.click(lightboxImg)
    expect(screen.getByTestId('lightbox-image')).toBeInTheDocument()
  })

  it('clicking overlay closes lightbox', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    fireEvent.click(screen.getAllByTestId('gallery-item')[0])
    fireEvent.click(screen.getByTestId('lightbox-overlay'))
    expect(screen.queryByTestId('lightbox-image')).not.toBeInTheDocument()
  })

  it('close button closes lightbox', () => {
    render(<Gallery label="Our Work" images={images} primaryColor="#1d4ed8" />)
    fireEvent.click(screen.getAllByTestId('gallery-item')[0])
    fireEvent.click(screen.getByText('✕'))
    expect(screen.queryByTestId('lightbox-image')).not.toBeInTheDocument()
  })
})

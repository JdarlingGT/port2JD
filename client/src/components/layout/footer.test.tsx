import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './footer';

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/© 2024 Jacob Darling. All rights reserved./i);
    expect(copyrightElement).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const linkedinLink = screen.getByTestId('footer-linkedin');
    const githubLink = screen.getByTestId('footer-github');
    const emailLink = screen.getByTestId('footer-email');

    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();
  });
});

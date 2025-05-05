import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('should render the heading "Openverse Media Search"', () => {
    try {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      const heading = screen.getByText(/Openverse Media Search/i);
      expect(heading).toBeInTheDocument();
    } catch (error) {
      console.error('Render failed:', error);
      throw error; // rethrow to fail the test properly in CI
    }
  });

  // Future tests can be added here
});

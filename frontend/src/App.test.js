import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Important: Import BrowserRouter
import App from '../App'; // Correct path to App

test('renders Openverse Media Search heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const heading = screen.getByText(/Openverse Media Search/i);
  expect(heading).toBeInTheDocument();
});

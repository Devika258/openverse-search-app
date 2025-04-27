import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // IMPORTANT
import App from './App'; // Correct import from same folder

test('renders Openverse Media Search heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Openverse Media Search/i);
  expect(heading).toBeInTheDocument();
});

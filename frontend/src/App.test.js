import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // ✅ Correct Import
import App from '../App'; // ✅ Correct path to App.js

test('renders Openverse Media Search heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Openverse Media Search/i);
  expect(heading).toBeInTheDocument();
});

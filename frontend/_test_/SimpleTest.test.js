import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Openverse Media Search heading', () => {
  render(<App />);
  const heading = screen.getByText(/Openverse Media Search/i);
  expect(heading).toBeInTheDocument();
});

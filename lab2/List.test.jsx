import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import List from '../components/List/List';


test('renders the component', () => {
  const { getByPlaceholderText, getByText } = render(<List />);

  expect(getByPlaceholderText('Add Item')).toBeInTheDocument();
  expect(getByText('Add')).toBeInTheDocument();
  expect(getByText('Item 1')).toBeInTheDocument();
  expect(getByText('Item 2')).toBeInTheDocument();
  expect(getByText('Item 3')).toBeInTheDocument();
});

test('adds an item to the list', async () => {
  const { getByPlaceholderText, getByText } = render(<List />);

  fireEvent.change(getByPlaceholderText('Add Item'), { target: { value: 'New Item' } });
  fireEvent.click(getByText('Add'));

  await waitFor(() => {
    expect(getByText('New Item')).toBeInTheDocument();
  });
});

test('removes the first item from the list', async () => {
    const { getByText, queryByText } = render(<List />);
  
    
    const removeButton = getByText('Remove', { exact: false, selector: 'li:first-child button' });
  
    fireEvent.click(removeButton);
  
    await waitFor(() => {
      expect(queryByText('Item 1')).toBeNull();
    });
  });
  
  

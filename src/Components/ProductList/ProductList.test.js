import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from '../ProductList/ProductList.jsx';
import productListReducer from '../../store/slices/productListSlice';

const mockProducts = [
  { id: 1, name: 'Product 1', price: '$10', image: 'image1.jpg' },
  { id: 2, name: 'Product 2', price: '$20', image: 'image2.jpg' },
  { id: 3, name: 'Product 3', price: '$30', image: 'image3.jpg' },
];


const initialState = {
  productList: {
    searchQuery: '',
  },
};

const store = configureStore({
  reducer: {
    productList: productListReducer, // Only include productList reducer
  },
  preloadedState: initialState,
});

describe('ProductList Component', () => {
  test('renders ProductList and displays products', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    // Check if the "All Products Available" text is displayed
    expect(screen.getByText(/All Products Available/i)).toBeInTheDocument();
    // Check if product names are displayed
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  test('filters products based on search query', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    // Enter search term in the search input
    fireEvent.change(screen.getByPlaceholderText(/Search for products/i), {
      target: { value: 'Product 1' },
    });

    // Check if only Product 1 is displayed
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
  });

  test('search input updates the searchQuery in the Redux store', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductList />
        </Router>
      </Provider>
    );

    // Enter search term in the search input
    fireEvent.change(screen.getByPlaceholderText(/Search for products/i), {
      target: { value: 'Product 2' },
    });

    // Check if the search query in the Redux store has been updated
    expect(screen.getByPlaceholderText(/Search for products/i).value).toBe('Product 2');
  });
});

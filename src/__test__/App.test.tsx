import { render } from '@testing-library/react'
import App from '../App'
import { Provider } from 'react-redux';
import AuthStores from '@stores/AuthStores'
import { configureStore } from '@reduxjs/toolkit'


describe('Render Initialized App', () => {
  const store = configureStore({ reducer: { auth: AuthStores } })

  it('Shows Login Page', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // expect button element with text "Sign In"
    expect(getByRole('button', { name: 'Sign In' }));
  });
})
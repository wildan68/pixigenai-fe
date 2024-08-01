import { render } from '@testing-library/react';
import Navbar from '@layouts/components/Navbar';
import { Provider } from 'react-redux';
import UserStores from '@stores/UserStores'
import { configureStore } from '@reduxjs/toolkit'

describe('Navbar', () => {
  const store = configureStore({ reducer: { user: UserStores } })

  it('Get Avatar', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Navbar />
      </Provider>
    );

    expect(getByRole('img', { name: 'avatar' }));
  });
});
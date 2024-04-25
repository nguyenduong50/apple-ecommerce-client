import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import DetailsPage from './pages/DetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistory';
import OrderDetailsPage from './pages/OrderDetails';

import {loader as loadProducts} from './pages/HomePage';
import {loader as loadProduct} from './pages/DetailsPage';
import {action as registerAction} from './pages/RegisterPage';
import {action as loginAction} from './pages/LoginPage';
import {action as logoutAction} from './pages/Logout';
import {loader as loaderProductList} from './pages/ShopPage';
import {tokenLoader, checkAuthLoader} from './Util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loadProducts
      },
      {
        path: 'shop',
        element: <ShopPage />,
        loader: loaderProductList
      },
      {
        path: 'details/:slug',
        element: <DetailsPage />,
        loader: loadProduct
      },
      {
        path: 'cart',
        element: <CartPage />,
        loader: checkAuthLoader
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
        loader: checkAuthLoader
      },
      {
        path: 'order-history',
        element: <OrderHistoryPage />
      },
      {
        path: 'order-details/:id',
        element: <OrderDetailsPage />
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'register',
        element: <RegisterPage />,
        action: registerAction
      },
      {
        path: 'logout',
        action: logoutAction
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

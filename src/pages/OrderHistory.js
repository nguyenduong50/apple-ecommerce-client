
import Banner from '../components/Banner/Banner';
import OrderHistoryList from '../components/OrderHistory/OrderHistoryList';

const OrderHistory = () => {
  return (
    <>
      <Banner page="HISTORY" pageMap="HISTORY"/>
      <OrderHistoryList />
    </>
  );
};

export default OrderHistory;
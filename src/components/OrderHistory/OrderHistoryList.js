import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { API_ROOT } from "../../Util/const";

const OrderHistoryList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const orderDetails = (orderId) => {
        navigate('/order-details/' + orderId);
    }

    useEffect(() => {
        const fetchOrder = async() => {
          const response = await fetch(
            `${API_ROOT}/v2/order`,
            {
              credentials: 'include'
            }
          );
          const data = await response.json();
    
          setOrders(data);
        }
    
        fetchOrder();
      }, [])
  return (
    <>
      <table className="table mt-5">
        <thead>
          <tr className="">
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              ID ORDER
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              ID USER
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              NAME
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              PHONE
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              ADDRESS
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              TOTAL
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              DELIVERY
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              STATUS
            </td>
            <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
              DETAILS
            </td>
          </tr>
        </thead>
        <tbody>
          {
            orders.length > 0 &&
            orders.map(
            (order, index) => (
                <tr key={index} className="">
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">{order._id}</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">{order.userId}</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">{order.name}</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">{order.phone}</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">{order.address}</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                        {order.totalOrder.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">Waiting for progresing</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">Waiting for pay</td>
                    <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                        <button className="btn btn-outline-dark" onClick={() => orderDetails(order._id)}>View</button>
                    </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
};

export default OrderHistoryList;

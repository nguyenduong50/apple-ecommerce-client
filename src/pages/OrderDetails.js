import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner/Banner";

const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async (id) => {
      const response = await fetch(`http://localhost:5000/v2/order/${id}`, {
        credentials: "include",
      });

      const data = await response.json();
      setOrder(data);
    };

    fetchOrderDetails(params.id);
  }, [params.id]);
  return (
    <>
      <Banner page="HISTORY" pageMap="HISTORY" />
      <div className="mt-3">
      <p className="fs-3 fw-bold text-uppercase">Information order</p>
        <p>Id User: {order?.userId}</p>
        <p>Full Name: {order?.name}</p>
        <p>Phone: {order?.phone}</p>
        <p>Address: {order?.address}</p>
        <p>Total: {order?.totalOrder.toLocaleString("it-IT", {style: "currency", currency: "VND"})}</p>
      </div>
      <div className="mt-2">       
        <table className="table mt-5">
          <thead>
            <tr className="">
              <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
                ID PRODUCT
              </td>
              <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
                IMAGE
              </td>
              <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
                NAME
              </td>
              <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
                PRICE
              </td>
              <td className="bg-secondary-subtle fst-italic fw-medium text-uppercase text-center">
                COUNT
              </td>
            </tr>
          </thead>
          <tbody>
            {order?.productOrder.length > 0 &&
              order?.productOrder.map((product, index) => (
                <tr key={index} className="">
                  <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                    {product.id}
                  </td>
                  <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                    <img src={`http://localhost:5000/${product.image}`} alt="product" width="70px" />
                  </td>
                  <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                    {order.name}
                  </td>
                  <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                    {product.price.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="text-center align-middle text-wrap fst-italic text-body-tertiary fs-6">
                    {product.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;

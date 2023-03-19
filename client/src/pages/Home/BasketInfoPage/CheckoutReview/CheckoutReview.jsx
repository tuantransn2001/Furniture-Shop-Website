import React from "react";
import { useNavigate } from "react-router-dom";
import CheckoutOrderReview from "~/components/CheckoutOrderReview/CheckoutOrderReview";

const CheckoutReview = (props) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home/checkout");
  };
  return (
    <CheckoutOrderReview
      action="PROCEED TO CHECKOUT"
      actionHandler={handleNavigate}
      title="BASKET TOTAL"
      customStyle={{
        borderWidth: ".1rem",
        borderStyle: "solid",
        backgroundColor: "#f5f5f5",
      }}
    />
  );
};

export default CheckoutReview;

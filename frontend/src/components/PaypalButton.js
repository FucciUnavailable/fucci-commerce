import { useEffect } from 'react';

const PayPalButton = ({ totalPrice }) => {
  useEffect(() => {
    // Load PayPal script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AdSn4zJ5IhpdPLGUIexG3k8J5pHQJAyyMSb2Qa4wZUtCMCikPq51X1JHnuoPz6L-NGOedtCTyFXDxo59&components=buttons`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // PayPal Buttons API
      window.paypal.Buttons({
        createOrder(data, actions) {
          // Create the payment order
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice,  // The total amount from your cart
                },
              },
            ],
          });
        },
        onApprove(data, actions) {
          // Execute payment after approval
          return actions.order.capture().then((details) => {
            alert('Payment Successful');
            console.log(details); // Handle order details here
            // Optionally, redirect the user to a confirmation page
          });
        },
        onError(err) {
          console.log("PayPal Error: ", err);
          alert('Payment failed');
        },
      }).render('#paypal-button-container');
    };
  }, [totalPrice]);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;

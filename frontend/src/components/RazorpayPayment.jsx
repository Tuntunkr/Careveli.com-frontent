import React, { useState, useEffect } from "react";
import axios from "axios";

function RazorpayPayment({ inrAmount }) {
  const [conversionRate, setConversionRate] = useState(null);
  const [usdAmount, setUsdAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");

  // Fetch INR to USD conversion rate
  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
        const data = await response.json();
        const rate = data.rates.USD;
        setConversionRate(rate);
        setUsdAmount((inrAmount * rate).toFixed(2));
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
      }
    };
    fetchConversionRate();
  }, [inrAmount]);

  // Detect user location to set currency
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setCurrency(data.country === "IN" ? "INR" : "USD");
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };
    fetchUserLocation();
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const pay = async () => {
   setIsLoading(true);
   const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
   if (!res) {
     alert("Razorpay SDK failed to load. Are you online?");
     setIsLoading(false);
     return;
   }

   const amountToPay = currency === "INR" ? Math.round(inrAmount * 1) : Math.round(usdAmount * 100);
   
   try {
     console.log("Attempting to create order with:", {
       amount: amountToPay,
       currency,
       receipt: `receipt_${Date.now()}`
     });

     const response = await axios.post(
       "https://api.careveli .in/payments/create-order",
       {
         amount: amountToPay,
         currency: currency,
         receipt: `receipt_${Date.now()}`
       },
       {
         headers: {
           'Content-Type': 'application/json',
         }
       }
     );

     console.log("Full backend response:", response);

     if (!response.data || !response.data.order) {
       throw new Error("Invalid response structure from backend");
     }

     const orderData = response.data.order;

     const options = {
      //  key: "rzp_live_tyDv45xwh7sLjV", // Using the key provided in the snippet
       amount: orderData.amount,
       currency: orderData.currency,
       name: "careveli",
       description: `Payment of ${currency} ${currency === "INR" ? inrAmount : usdAmount}`,
       image: "careveli",
       order_id: orderData.id || orderData.razorpay_order_id, // Try both common field names
       handler: function (response) {
         console.log("Payment Success:", response);
         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
         setIsLoading(false);
       },
       prefill: {
         name: "careveli ",
         email: "careveli@careveli .in",
         contact: "9811701747",
       },
       theme: {
         color: "#158993",
       },
       modal: {
          ondismiss: function() {
              setIsLoading(false);
          }
       }
     };

     const paymentObject = new window.Razorpay(options);
     paymentObject.on('payment.failed', function (response) {
       console.error("Payment Failed:", response);
       alert(`Payment failed: ${response.error.description}`);
       setIsLoading(false);
     });
     paymentObject.open();

   } catch (error) {
     console.error("Payment Error:", error);
     setIsLoading(false);
     if (error.response) {
       console.error("Backend Error Response:", error.response.data);
       alert(`Backend Error: ${error.response.data.message || error.response.statusText}`);
     } else {
       alert(`Payment Error: ${error.message}`);
     }
   }
 };

  return (
    <div className="App">
      {conversionRate ? (
        <button 
          disabled={isLoading}
          className={`choose-plan text-white border rounded-md p-2 px-8 py-3 text-sm transition-all ${
            isLoading 
              ? "bg-gray-400 border-gray-400 cursor-not-allowed" 
              : "bg-[#890C25] border-[#890C25] hover:bg-[#6d0a1d]"
          }`}
          onClick={pay}
        >
          {isLoading ? "Processing..." : "Pay via Razorpay"}
        </button>
      ) : (
        <p>Loading conversion rate...</p>
      )}
    </div>
  );  
}

export default RazorpayPayment;

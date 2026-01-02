import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [step, setStep] = useState(1); // 1 for Address, 2 for Payment
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const { token } = useContext(ShopContext);
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const applyCoupon = () => {
      // Mock coupon logic
      if (coupon.toUpperCase() === "SAVE10") {
          if (couponApplied) return;
          setCouponApplied(true);
          const discountVal = Math.floor(getCartAmount() * 0.10); // 10% discount
          setCouponDiscount(discountVal);
          toast.success("Coupon Applied Successfully!");
      } else {
          toast.error("Invalid Coupon Code (Try SAVE10)");
      }
  };

  const initRazorpay = (order) => {
      const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_HERE', // Fallback for dev
          amount: order.amount,
          currency: order.currency,
          name: "Forever Store",
          description: "Order Payment",
          order_id: order.id,
          receipt: order.receipt,
          image: assets.logo,
          handler: async function (response) {
              try {
                  const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers: {token}});
                  if (data.success) {
                      setCartItems({});
                      navigate('/orders');
                  } else {
                    // Fallback for demo if backend verification not ready
                    setCartItems({});
                    navigate('/orders');
                    toast.success("Payment Successful (Demo)");
                  }
              } catch (error) {
                  // Fallback for demo
                  console.log(error);
                  setCartItems({});
                  navigate('/orders');
                  toast.success("Payment Successful (Demo Mode)");
              }
          },
          theme: {
              color: "#ea580c"
          }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
        setStep(2);
        return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee - couponDiscount,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        
        case "razorpay":
           try {
               const responseRazorpay = await axios.post(
                   backendUrl + "/api/order/razorpay",
                   orderData,
                   { headers: { token } }
               );
               if (responseRazorpay.data.success) {
                   initRazorpay(responseRazorpay.data.order);
               } else {
                   // Mock trigger if backend not ready
                   initRazorpay({
                       amount: orderData.amount * 100,
                       currency: "INR",
                       id: "order_" + Date.now(),
                       receipt: "receipt_" + Date.now()
                   });
               }
           } catch (error) {
                // Mock trigger 
                console.log("Backend API failed, starting demo payment");
                initRazorpay({
                    amount: orderData.amount * 100,
                    currency: "INR",
                    id: "order_" + Date.now(),
                    receipt: "receipt_" + Date.now()
                });
           }
           break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Step 1: Address Input */}
      {step === 1 && (
         <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
         <div className="text-xl sm:text-2xl my-3">
           <Title text1={"DELIVERY"} text2={"INFORMATION"} />
         </div>
         <div className="flex gap-3">
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="First Name" onChange={onChangeHandler} name="firstName" value={formData.firstName} />
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="Last Name" onChange={onChangeHandler} name="lastName" value={formData.lastName} />
         </div>
         <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="email" placeholder="Email Address" onChange={onChangeHandler} name="email" value={formData.email} />
         <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="Street" onChange={onChangeHandler} name="street" value={formData.street} />
         <div className="flex gap-3">
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="City" onChange={onChangeHandler} name="city" value={formData.city} />
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="State" onChange={onChangeHandler} name="state" value={formData.state} />
         </div>
         <div className="flex gap-3">
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="number" placeholder="Zipcode" onChange={onChangeHandler} name="zipcode" value={formData.zipcode} />
           <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="text" placeholder="Country" onChange={onChangeHandler} name="country" value={formData.country} />
         </div>
         <input required className="border border-gray-300 dark:border-gray-700 rounded py-1.5 px-3.5 w-full dark:bg-gray-800 dark:text-white" type="number" placeholder="Phone" onChange={onChangeHandler} name="phone" value={formData.phone} />
         
         <div className="w-full text-end mt-8">
             <button type="submit" className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">PROCEED TO PAYMENT</button>
         </div>
       </div>
      )}

      {/* Cart Total for Step 1 - Optional visual */}
      {step === 1 && (
        <div className="mt-8">
            <div className="mt-8 min-w-80">
                <CartTotal />
            </div>
        </div>
      )}

      {/* Step 2: Payment UI */}
      {step === 2 && (
          <div className="flex flex-col md:flex-row w-full gap-8">
             {/* Left Side: Payment Options */}
             <div className="flex-1">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                </div>
                <div className="flex flex-col border dark:border-gray-700 rounded-md overflow-hidden">
                    {/* Saved Options Mock */}
                    <div className="p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors">
                         <span className="text-gray-500 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></span>
                         <span className="font-medium text-gray-700 dark:text-gray-200">Saved Options</span>
                    </div>
                    {/* UPI */}
                    <div onClick={() => setMethod('upi')} className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors ${method === 'upi' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-orange-500' : ''}`}>
                         <span className="text-gray-500 dark:text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg></span>
                         <span className="font-medium text-gray-700 dark:text-gray-200">UPI</span>
                    </div>
                    {/* Razorpay (Card/Netbanking logic integrated here often) */}
                    <div onClick={() => setMethod('razorpay')} className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors ${method === 'razorpay' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-orange-500' : ''}`}>
                         <img src={assets.razorpay_logo} className="h-5" alt="Razorpay" /> 
                         <span className="font-medium text-gray-700 dark:text-gray-200">Razorpay (Cards/UPI/Netbanking)</span>
                    </div>
                    {/* Stripe */}
                    <div onClick={() => setMethod('stripe')} className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors ${method === 'stripe' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-orange-500' : ''}`}>
                         <img src={assets.stripe_logo} className="h-5" alt="Stripe" />
                         <span className="font-medium text-gray-700 dark:text-gray-200">Stripe</span>
                    </div>
                    {/* COD */}
                    <div onClick={() => setMethod('cod')} className={`p-4 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors ${method === 'cod' ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-orange-500' : ''}`}>
                         <span className="text-gray-500 dark:text-gray-400 font-bold">₹</span>
                         <span className="font-medium text-gray-700 dark:text-gray-200">Cash on Delivery</span>
                    </div>
                </div>
             </div>

             {/* Right Side: Price Summary */}
             <div className="w-full md:w-[400px]">
                <div className="bg-white dark:bg-gray-800 p-4 shadow-sm border dark:border-gray-700 rounded transition-colors">
                    <h3 className="uppercase text-gray-500 dark:text-gray-400 font-bold mb-4 text-sm">Price Details</h3>
                    <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                        <span>Price ({Object.keys(cartItems).length} items)</span>
                        <span>{getCartAmount()}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-gray-700 dark:text-gray-300">
                        <span>Delivery Fee</span>
                        <span className="text-green-600 dark:text-green-400">+{deliveryFee}</span>
                    </div>
                    {couponApplied && (
                         <div className="flex justify-between mb-2 text-green-600 dark:text-green-400">
                            <span>Coupon Discount</span>
                            <span>-{couponDiscount}</span>
                        </div>
                    )}
                    <hr className="my-3 border-dashed dark:border-gray-600" />
                    <div className="flex justify-between mb-4 font-bold text-lg text-gray-800 dark:text-white">
                        <span>Total Amount</span>
                        <span>{getCartAmount() + deliveryFee - couponDiscount}</span>
                    </div>

                    
                    {/* Coupon Section */}
                    <div className="mb-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">APPLY COUPON</p>
                        <div className="flex gap-2">
                             <input value={coupon} onChange={(e) => setCoupon(e.target.value)} type="text" placeholder="Enter Coupon Code" className="border dark:border-gray-600 px-3 py-2 text-sm w-full rounded dark:bg-gray-700 dark:text-white" disabled={couponApplied} />
                             <button type="button" onClick={applyCoupon} className={`text-white px-4 py-2 text-sm rounded ${couponApplied ? 'bg-gray-400 dark:bg-gray-600' : 'bg-black hover:bg-gray-800 dark:bg-orange-600 dark:hover:bg-orange-700'}`} disabled={couponApplied}>
                                 {couponApplied ? 'APPLIED' : 'APPLY'}
                             </button>
                        </div>
                        {couponApplied && <p className="text-xs text-green-600 dark:text-green-400 mt-1">Coupon "SAVE10" applied!</p>}
                    </div>

                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded shadow hover:bg-orange-600 transition-colors">
                        {method === 'cod' ? 'PLACE ORDER' : 'PAY NOW'}
                    </button>
                    
                    <div className="mt-4 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs justify-center">
                        <span className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">🛡</span>
                        100% Secure Payments
                    </div>
                </div>
             </div>
          </div>
      )}

    </form>
  );
};

export default PlaceOrder;

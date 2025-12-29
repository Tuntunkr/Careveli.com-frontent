
import React from 'react'
import Title from '../components/Title'

const ShippingPolicy = () => {
  return (
    <div className='pt-10 border-t min-h-screen dark:bg-gray-900'>
      <div className='text-2xl text-center mb-10'>
        <Title text1={'SHIPPING'} text2={'POLICY'} />
      </div>
      
      <div className='flex flex-col gap-8 text-gray-600 dark:text-gray-300 px-4 md:px-20 text-sm md:text-base leading-7'>
        <div>
           <p className='mb-4'>Last updated on Dec 24 2025</p>
           <p className='mb-4'>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.</p>
           <p className='mb-4'>OLPIS TECHNOLOGIES LLP is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days rom the date of the order and payment or as per the delivery date agreed at the time of order confirmation.</p>
           <p className='mb-4'>Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>
           <p className='mb-4'>For any issues in utilizing our services you may contact our helpdesk on 8959600600 or care@careveli.com</p>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicy

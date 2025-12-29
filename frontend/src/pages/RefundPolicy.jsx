
import React from 'react'
import Title from '../components/Title'

const RefundPolicy = () => {
  return (
    <div className='pt-10 border-t min-h-screen dark:bg-gray-900'>
      <div className='text-2xl text-center mb-10'>
        <Title text1={'REFUND'} text2={'POLICY'} />
      </div>
      
      <div className='flex flex-col gap-8 text-gray-600 dark:text-gray-300 px-4 md:px-20 text-sm md:text-base leading-7'>
        <div>
           <p className='mb-4'>Last updated on Dec 24 2025</p>
           <p className='mb-4'>OLPIS TECHNOLOGIES LLP believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:</p>
           
           <ul className='list-disc pl-5 mb-4'>
             <li className='mb-2'>Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
             <li className='mb-2'>OLPIS TECHNOLOGIES LLP does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.</li>
             <li className='mb-2'>In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.</li>
             <li className='mb-2'>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
             <li className='mb-2'>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
             <li className='mb-2'>In case of any Refunds approved by the OLPIS TECHNOLOGIES LLP, it'll take 3-5 days for the refund to be processed to the end customer.</li>
           </ul>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicy


import React from 'react'
import Title from '../components/Title'

const Terms = () => {
  return (
    <div className='pt-10 border-t min-h-screen dark:bg-gray-900'>
      <div className='text-2xl text-center mb-10'>
        <Title text1={'TERMS'} text2={'& CONDITIONS'} />
      </div>
      
      <div className='flex flex-col gap-8 text-gray-600 dark:text-gray-300 px-4 md:px-20 text-sm md:text-base leading-7'>
        <div>
           <p className='mb-4'>Last updated on Dec 24 2025</p>
           <p className='mb-4'>For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean OLPIS TECHNOLOGIES LLP, whose registered/operational office is E-237 BM, AMAR COLONY Amar Colony South Delhi New Delhi Delhi 110024 Lajpat Nagar South Delhi SO DELHI 110024 . "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.</p>
           
           <h3 className='text-xl font-medium mb-4 text-black dark:text-white mt-8'>Your use of the website and/or purchase from us are governed by following Terms and Conditions:</h3>
           <ul className='list-disc pl-5 mb-4'>
             <li className='mb-2'>The content of the pages of this website is subject to change without notice.</li>
             <li className='mb-2'>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
             <li className='mb-2'>Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.</li>
             <li className='mb-2'>Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
             <li className='mb-2'>All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
             <li className='mb-2'>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
             <li className='mb-2'>From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
             <li className='mb-2'>You may not create a link to our website from another website or document without OLPIS TECHNOLOGIES LLP's prior written consent.</li>
             <li className='mb-2'>Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.</li>
             <li className='mb-2'>We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</li>
           </ul>
        </div>
      </div>
    </div>
  )
}

export default Terms

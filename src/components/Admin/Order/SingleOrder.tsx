
import Order from '../../../modals/Order'
import OrderItemProductRow from './OrderItemProductRow'


const SingleOrder: React.FC<{ order: Order }> = ({ order }) => {

  return (
    <>
      <div className='border-b border-gray-200 flex items-center justify-between mb-10 mt-5 py-4'>
        <div>
          <p className='text-xs font-medium'>Order Number : {order.serialNo}</p>
        </div>
        <div>
          <p className='text-xs font-medium'>Order Date : {order.date}</p>
        </div>
        <div>
          <p className='text-xs font-medium'> Payment: Cash</p>
        </div>
      </div>
      <div className='grid lg:grid-cols-2'>
        <div className='order-2 lg:order-1 mr-3 o p-5 rounded-md shadow'>
          <div className='border-b border-gray-400 mb-5 pb-2'>

            <h2 className='font-bold text-lg mb-5'>Customer Info</h2>
            <p className='text-xs mb-4'>
              Customer : {order.order_info.billing_details.first_name} {order.order_info.billing_details.last_name}
            </p>
            <p className='text-xs mb-4'>
              Customer Number: {order.order_info.billing_details.phone}
            </p>
          </div>
          <div className='mb-5'>

            <h2 className='font-bold text-lg mb-5'>Shipping Information</h2>
            <p className='text-xs mb-4 capitalize'>
              Area :  {order.order_info.shipping_details.area.name}
            </p>
            <p className='text-xs mb-4'>
              Street : {order.order_info.shipping_details.street}
            </p>
            <p className='text-xs mb-4'>
              Apartment No: {order.order_info.shipping_details.apartment}
            </p>
            <p className='text-xs mb-4'>
              Floor : {order.order_info.shipping_details.floor}
            </p>
          </div>

          <div className="border-t border-gray-400  py-6 ">
            <div className="border-b-2 mb-5">
              <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalPrice - order.order_info.shipping_details.price}.00</p>
              </div>
              <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                <p>Shipping</p>
                <p>${order.order_info.shipping_details.price}</p>
              </div>
              <div className="mb-6 flex justify-between text-base font-medium text-gray-900">
                <p >Taxes</p>
                <p>$00.00</p>
              </div>
            </div>
            <div className="mb-5 flex justify-between text-base font-medium text-gray-900 ">
              <p className='font-bold'>Total</p>
              <p>${order.totalPrice}.00</p>
            </div>

          </div>
        </div>

        <div className='auto-rows-max gap-5 grid lg:order-2 order-1 sm:mb-0 mb-4'>

          {order.items.map(item => <OrderItemProductRow item={item} />)}

        </div>
      </div>
    </>
  )
}

export default SingleOrder
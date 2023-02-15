import Meta from '../../../modals/Meta';

export const PlaceOrderButton: React.FC<{ cartMeta?: Meta; checkoutMeta?: Meta; }> = ({ cartMeta, checkoutMeta }) => {

    return <>
        {!cartMeta?.loading && !checkoutMeta?.loading && !cartMeta?.error && <button
            type="submit"
            className="mt-5 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
            Place Order
        </button>}

        {(cartMeta?.loading || checkoutMeta?.loading || cartMeta?.error) &&
            <button
                type="button"
                className="opacity-50 mt-5 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Place Order
            </button>}
    </>;

};

import React, { FC, useState } from 'react';
import { Image } from '../../data-display'
import { Button } from '../../input-controls'

type Props = {};

const Cart: FC<Props> = () => {
    const [products, setProducts] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)

    function checkout(){}

    function removeItem(){}


    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="text-h1 mb-32"> Shopping cart </h1>
        <div className="flex w-full">
            <div className="w-3/5 h-400px overflow-auto">
                <ul role="list">
                    {products.map((product) => (
                    <li key={product.id} className="flex mb-16">
                        <Image
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            width="40"
                            wrapperClassName="border-default border-solid border-lightGray"
                        />
                        <div className="mx-24 flex-1 flex flex-col pb-12">
                            <div className="flex justify-between text-xl font-medium text-gray-900">
                                <h3>{product.name}</h3>
                                <p className="ml-4">{product.price}</p>
                            </div>
                        <div className="flex-1 flex items-end justify-between text-md">
                            <p className="text-gray-500">Qty: {product.quantity}</p>
                            <button onClick={removeItem} type="button" className="text-primary font-medium hover:underline">
                                Remove
                            </button>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="ml-16 w-2/5">
                <h2 className="text-h3 font-medium text-center mb-24">Order Summary</h2>
                <div className="flex justify-between text-md font-medium text-gray-500 mb-24">
                    <p>Order Total</p>
                    <p>${orderTotal}</p>
                </div>
                <Button buttonColor="primary" size="md" textColor="whitesmoke" onClick={checkout} title="Checkout" block={true} />
            </div>
        </div>
    </div>

};

export default Cart;

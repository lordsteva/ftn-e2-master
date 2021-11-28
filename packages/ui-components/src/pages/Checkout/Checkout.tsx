import React, { FC, useState } from 'react';
import { Image } from '../../data-display'
import { Button, Input } from '../../input-controls'

type Props = {};

const Checkout: FC<Props> = () => {
    const [products, setProducts] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)

    function continueToPayment(){}

    return <div className="w-10/12 p-24 mx-auto">
            <h1 className="text-h1 mb-32"> Checkout </h1>
            <div className="flex justify-between">
                <div className="flex flex-col w-2/5 px-40">
                    <h2 className="text-h3 font-medium text-left mb-24">Contact information</h2>
                    <form>
                        <Input id="firstName" type="text" labelText="First Name" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="lastName" type="text" labelText="Last Name" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="country" type="text" labelText="Country" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="city" type="text" labelText="City" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="address" type="text" labelText="Address" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="postalCode" type="text" labelText="Postal Code" wrapperClassName="mb-12" customClass="rounded-xs"/>
                        <Input id="phone" type="text" labelText="Phone" wrapperClassName="mb-12" customClass="rounded-xs"/>
                    </form>
                </div>
                <div className="flex flex-col w-3/5 px-40">
                    <h2 className="text-h3 font-medium text-left mb-24">Order Summary</h2>
                    <div className="h-400px overflow-auto">
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
                                </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div>             
                        <div className="flex justify-between text-md font-medium text-gray-500 mb-24">
                            <p>Order Total</p>
                            <p>${orderTotal}</p>
                        </div>
                        <Button buttonColor="primary" size="md" textColor="whitesmoke" onClick={continueToPayment} title="Continue to Payment" block={true} />
                    </div>
                </div>
            </div>
        </div>

};

export default Checkout;

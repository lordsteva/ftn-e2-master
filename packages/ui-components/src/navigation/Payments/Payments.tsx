import React, { FC } from 'react';
import { Image } from '../../data-display/Image'
import './index.css'
import paypal from '../../assets/paypal.jpg'
import bitcoin from '../../assets/bitcoin.jpg'
import qrcode from '../../assets/qrcode.jpg'
import bank from '../../assets/bank.jpg'

type Props = {
    supportedMethods: string[];
};


const Payments: FC<Props> = ({supportedMethods}) => {
    function choosePaymentMethod(paymentType){
        console.log(paymentType)
    }

    return <div className="w-10/12 p-24 mx-auto">
        <h1 className="text-h2 text-center mb-32"> Choose payment method </h1>       
        <div className="flex justify-center items-center">
            {
                supportedMethods.includes('bank') && <div className="payment-card" onClick={()=>choosePaymentMethod('bank')}>
                    <Image width={'120px'} src={bank} />
                    <span className="payment-text">Bank</span>
                </div>
            }
            {
                supportedMethods.includes('qrcode') && <div className="payment-card" onClick={()=>choosePaymentMethod('qrcode')}>
                    <Image width={'120px'} src={qrcode} />
                    <span className="payment-text">QR Code</span>
                </div>
            }
            {
                supportedMethods.includes('paypal') && <div className="payment-card" onClick={()=>choosePaymentMethod('paypal')}>
                    <Image width={'120px'} src={paypal} />
                    <span className="payment-text">Paypal</span>
                </div>
            }
            {
                supportedMethods.includes('bitcoin') && <div className="payment-card" onClick={()=>choosePaymentMethod('bitcoin')}>
                    <Image width={'120px'} src={bitcoin} />
                    <span className="payment-text">Bitcoin</span>
                </div>
            }
        </div>
    </div>
};

export default Payments;

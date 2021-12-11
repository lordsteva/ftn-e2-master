import React, { FC } from 'react';
import { Image, Button } from "@team21/ui-components" 
import success from "@team21/ui-components/src/assets/success.jpg"
import failed from "@team21/ui-components/src/assets/failed.jpg"

type Props = {
    title: string;
    type: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PaymentMessage: FC<Props> = ({title, type, onClick}) => {  

    return <div className='w-1/3 mx-auto border-default border-solid border-lightGray m-40'>
        <div className='flex flex-col justify-center items-center'> 
            <Image
                src={type ? success : failed}
            />
            
            <div className="p-4 mt-8 text-center">
                <h5 className="text-xxl font-semibold mb-32">{title}</h5>

                <Button buttonColor={type ? 'success' : 'red'} size='xl' textColor="whitesmoke" title={"Proceed"} onClick={onClick} customClass="mb-24"/>
            </div>
        </div>
    </div>
};

export default PaymentMessage;

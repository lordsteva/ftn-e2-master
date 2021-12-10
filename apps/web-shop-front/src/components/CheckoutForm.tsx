import React, { FC } from 'react';
import { Button, Input } from '@team21/ui-components'
import { useForm } from 'react-hook-form';
import { CheckoutDataForm } from '@team21/types';

type Props = {
  continueToPayment: (data: CheckoutDataForm) => void
}

const CheckoutForm: FC<Props> = ({continueToPayment}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return <React.Fragment>
     <form onSubmit={handleSubmit(continueToPayment)}>
        <Input 
            id="first_name" 
            type="text" 
            labelText="First Name" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs" 
            innerRef={register('first_name', {
                required: 'First Name required!',
            })}
            errorText={errors.first_name?.message}
        />
        <Input 
            id="last_name" 
            type="text" labelText="Last Name" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('last_name', {
                required: 'Last Name required!',
            })}
            errorText={errors.last_name?.message}
        />
        <Input 
            id="country" 
            type="text" 
            labelText="Country" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('country', {
                required: 'Country required!',
            })}
            errorText={errors.country?.message}
        />
        <Input 
            id="city" 
            type="text" 
            labelText="City" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('city', {
                required: 'City required!',
            })}
            errorText={errors.city?.message}
        />
        <Input 
            id="address" 
            type="text" 
            labelText="Address" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('address', {
                required: 'Address required!',
            })}
            errorText={errors.address?.message}
        />
        <Input 
            id="zip_code" 
            type="text" 
            labelText="Zip Code" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('zip_code', {
                required: 'Zip code required!',
            })}
            errorText={errors.zip_code?.message}
        />
        <Input 
            id="phone" 
            type="text" 
            labelText="Phone" 
            wrapperClassName="mb-12" 
            customClass="rounded-xs"
            innerRef={register('phone', {
                required: 'Phone required!',
            })}
            errorText={errors.phone?.message}
        />
        <Button buttonColor="primary" size="md" textColor="whitesmoke" title="Continue to Payment" customClass='mt-16' block={true} />
    </form>
  </React.Fragment>
                      
};

export default CheckoutForm;

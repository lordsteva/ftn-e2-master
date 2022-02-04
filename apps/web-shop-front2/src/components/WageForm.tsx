import React, { FC } from 'react';
import { Button, Input } from '@team21/ui-components'
import { useForm } from 'react-hook-form';
import { WageDataForm } from '@team21/types';

type Props = {
    continueToPayment: (data: WageDataForm) => void
  }

const WageForm: FC<Props> = ({continueToPayment}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return <React.Fragment>
     <form onSubmit={handleSubmit(continueToPayment)}>
        <Input 
            id="first_name" 
            type="text" 
            labelText="First Name"
            labelClass="text-whitesmoke text-lg"
            wrapperClassName="mb-12" 
            customClass='mb-8 rounded-xs'
            innerRef={register('first_name', {
                required: 'First Name required!',
            })}
            errorText={errors.first_name?.message}
        />
        <Input 
            id="last_name" 
            type="text" 
            labelText="Last Name" 
            labelClass="text-whitesmoke text-lg"
            wrapperClassName="mb-12" 
            customClass='mb-8 rounded-xs'
            innerRef={register('last_name', {
                required: 'Last Name required!',
            })}
            errorText={errors.last_name?.message}
        />
        <Input 
            id="recipient_first_name" 
            type="text" 
            labelText="Recipient First Name" 
            labelClass="text-whitesmoke text-lg"
            wrapperClassName="mb-12" 
            customClass='mb-8 rounded-xs'
            innerRef={register('recipient_first_name', {
                required: 'Recipient First Name required!',
            })}
            errorText={errors.recipient_firstname?.message}
        />
        <Input 
            id="recipient_last_name" 
            type="text" 
            labelText="Recipient Last Name" 
            labelClass="text-whitesmoke text-lg"
            wrapperClassName="mb-12" 
            customClass='mb-8 rounded-xs'
            innerRef={register('recipient_last_name', {
                required: 'Recipient Last Name required!',
            })}
            errorText={errors.recipient_lastname?.message}
        />
        <Input 
            id="amount" 
            type="number" 
            labelText="Amount" 
            labelClass="text-whitesmoke text-lg"
            wrapperClassName="mb-12" 
            customClass='mb-8 rounded-xs'
            innerRef={register('amount', {
                required: 'Amount required!',
                min: { value: 1, message:"Amount must be positive number!" }
            })}
            errorText={errors.amount?.message}
        />
        <Button buttonColor="primary" size="md" textColor="whitesmoke" title="Continue to Payment" customClass='mt-16' block />
    </form>
  </React.Fragment>
                      
};

export default WageForm;

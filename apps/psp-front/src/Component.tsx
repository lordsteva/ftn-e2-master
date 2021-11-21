import React, { FC, useState } from 'react';
import useGetUsers from './graphql/useGetUsers';
import { Button, Input, Select, Checkbox, TextArea, Search, Image } from '@team21/ui-components'

const Component: FC<Record<string, never>> = () => {
  return <div>
    <Button disabled={false} buttonColor="primary" textColor="whitesmoke" onClick={()=>{console.log('AAA')}} title="button" />
    <Input errorText="This is a error text ajajjajajaajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" id="input" type="text" labelText="FirstName"/>
    <Select options={[{text:'1', value:'1'}, {text:'2', value:'2'}]} id="select" labelText="Select Something" />
    <Checkbox id='checkbox' labelText="You agree?" />
    <TextArea id="textarea" />
    <Search id="search" />
    <Image  width='1/12' src="a" />
  </div>;
};

export default Component;

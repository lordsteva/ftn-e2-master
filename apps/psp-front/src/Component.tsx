import React, { FC, useState } from 'react';
import useGetUsers from './graphql/useGetUsers';
import { Button, Input, Select, Checkbox, TextArea, Search, Image, Loader, Card, Dropdown, Navbar, ProductTile, CategoryTile, CLP, PLP, Table, PDP, Cart, Checkout, Payments} from '@team21/ui-components/'

const Component: FC<Record<string, never>> = () => {
  return <div>
    <Navbar links={[{'path':'/', 'name':'Home'}, {'path':'about', 'name':'About'}]} />
    <Dropdown dropdownLabel="Dropdown" links={[{'onClick':undefined, 'name':'Link1'}, {'onClick':undefined, 'name':'Link2'}]} />
    <Loader />
    <Card customClass="w-72" title="Laptopovi" body={<p>Laptop računari, poznati i kao notebook računari, postali su nezamenjiv deo svakodnevice modernog čoveka, jer njihova mobilnost omogućava obavljanje bilo kog posla na bilo kom mestu i u bilo koje vreme. </p>} buttonTitle="Submit" imageSrc="https://mdbootstrap.com/img/new/standard/city/031.jpg"/>

    <br/>
    <ProductTile product={
      {
        'name':'Dell Inspiron 3358', 
        'image':'https://www.notebooks-center.com/img/laptop/large/laptop_dell_inspiron_5758.jpg',
        'description':'Intel Core i3-5005U, Intel HD Graphics 5500, 1000GB HDD, 6GB DDR3, 1600 MHz, 2.22 kg (4.9 lbs), 15.6”, HD (1366 x 768), TN ',
        'price': 550,
        'onClick': undefined,
        'buttonTitle': 'Details',
        'qty': 5
      }
    }/>
    <br/>
    <CategoryTile category={
      {
        'name':'Laptops', 
        'image':'https://www.notebooks-center.com/img/laptop/large/laptop_dell_inspiron_5758.jpg',
        'onClick': undefined,
        'buttonTitle': 'Details',
        'count':42
      }
    }/>
    <Button disabled={true} buttonColor="primary" textColor="whitesmoke" onClick={()=>{console.log('AAA')}} title="button" />
    <Button disabled={true} buttonColor="secondary" textColor="whitesmoke" onClick={()=>{console.log('AAA')}} title="button" />

    <Input errorText="This is a error text ajajjajajaajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" id="input" type="text" labelText="FirstName"/>
    <Select options={[{text:'1', value:'1'}, {text:'2', value:'2'}]} id="select" labelText="Select Something" />
    <Checkbox id='checkbox' labelText="You agree?" />
    <TextArea id="textarea" />
    <Search id="search" />
    <Image  width='1/12' src="a" />

    <CLP />
    <PLP categoryName="Laptops" />
    <Table headerData={["Name", "Email", "Date", "Action"]} bodyData = {[
        {
            items: ["John", "john@email.com", "01/01/2021"],
            actions: [{onClick: () => {console.log('a')} , action:'Edit'}, {onClick: () => {console.log('a')} , action:'Delete'}]

        },
        {
            items: ["Sally", "sally@email.com", "12/24/2020"],
            actions: [{onClick: () => {console.log('a')} , action:'Edit'}, {onClick: () => {console.log('a')} , action:'Delete'}]

        },
        {
            items: ["Maria", "maria@email.com", "12/01/2020"],
            actions: [{onClick: () => {console.log('a')} , action:'Edit'}, {onClick: () => {console.log('a')} , action:'Delete'}]

        },
        {
           items: ["Maria", "maria@email.com", "12/01/2020"],
           actions: [{onClick: () => {console.log('a')} , action:'Edit'}, {onClick: () => {console.log('a')} , action:'Delete'}]
        },
    ]} 
    />
    <PDP productId={'1a'} />
    <Cart />
    <Checkout />
    <Payments supportedMethods={['bank', 'qrcode', 'paypal', 'bitcoin']} />

  </div>;
};

export default Component;

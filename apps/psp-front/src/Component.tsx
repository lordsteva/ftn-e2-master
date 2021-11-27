import {
  Button,
  Card,
  Checkbox,
  Image,
  Loader,
  Search,
  Select,
  TextArea,
} from '@team21/ui-components/';
import React, { FC } from 'react';

const Component: FC<Record<string, never>> = () => {
  return (
    <div>
      <Loader />
      <Card
        title="Card Title"
        body={
          <li>
            {' '}
            <b> AA </b>{' '}
          </li>
        }
        buttonTitle="Submit"
        imageSrc="https://mdbootstrap.com/img/new/standard/city/031.jpg"
      />
      <br />
      <Button
        disabled={true}
        buttonColor="primary"
        textColor="whitesmoke"
        onClick={() => {
          console.log('AAA');
        }}
        title="button"
      />
      <Button
        disabled={true}
        buttonColor="secondary"
        textColor="whitesmoke"
        onClick={() => {
          console.log('AAA');
        }}
        title="button"
      />

      <Select
        options={[
          { text: '1', value: '1' },
          { text: '2', value: '2' },
        ]}
        id="select"
        labelText="Select Something"
      />
      <Checkbox id="checkbox" labelText="You agree?" />
      <TextArea id="textarea" />
      <Search id="search" />
      <Image width="1/12" src="a" />
    </div>
  );
};

export default Component;

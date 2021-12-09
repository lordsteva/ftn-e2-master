import { Breadcrumb, Card, Dropdown, Loader, Navbar } from '@team21/ui-components/';
import React, { FC } from 'react';

const Component: FC<Record<string, never>> = () => {
  return (
    <div>
      <Breadcrumb
        path={[
          { label: 'Labela1', url: '/login' },
          { label: 'Labela2', url: '/' },
        ]}
      />
      <Navbar
        links={[
          { path: '/', name: 'Home' },
          { path: 'about', name: 'About' },
        ]}
      />
      <Dropdown
        dropdownLabel="Dropdown"
        links={[
          { onClick: undefined, name: 'Link1' },
          { onClick: undefined, name: 'Link2' },
        ]}
      />
      <Loader />
      <Card
        customClass="w-72"
        title="Laptopovi"
        body={
          <p>
            Laptop računari, poznati i kao notebook računari, postali su nezamenjiv deo svakodnevice
            modernog čoveka, jer njihova mobilnost omogućava obavljanje bilo kog posla na bilo kom
            mestu i u bilo koje vreme.{' '}
          </p>
        }
        buttonTitle="Submit"
        imageSrc="https://mdbootstrap.com/img/new/standard/city/031.jpg"
      />

      <br />
    </div>
  );
};

export default Component;

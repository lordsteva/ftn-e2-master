import { Button } from '@team21/ui-components';
import QRCode from 'qrcode';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  amount: string;
  errorUrl: string;
  failedUrl: string;
  paymentId: string;
  successUrl: string;
  merchantOrderId: string;
  merchantId: string;
  onClick?: () => void;
};

const QR: FC<Props> = (props) => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    QRCode.toDataURL(
      JSON.stringify({ ...props, bankUrl: window.location.host, onClick: undefined }),
    ).then((data) => {
      console.log(data);
      setSrc(data);
    });
  }, []);

  return (
    <div>
      <img src={src} />
      <div className="m-12">
        <Button title="Card form" onClick={props.onClick} />
      </div>
    </div>
  );
};

export default QR;

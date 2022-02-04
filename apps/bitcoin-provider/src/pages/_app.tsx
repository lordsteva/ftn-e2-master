import { AppProps } from 'next/app';
import React, { FC } from 'react';
import 'styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    //HERE GOES GLOBAL STATE, HAVBAR etc
    <div>
      <Component {...pageProps} />
    </div>
  );
};
export default App;

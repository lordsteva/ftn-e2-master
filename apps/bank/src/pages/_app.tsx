import { AppProps } from 'next/app';
import React, { FC } from 'react';
import '../index.css';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};
export default App;

import { Button } from '@team21/ui-components';
import React from 'react';

function App() {
  return (
    <div className="p-5 App">
      hello
      <Button
        title="btn"
        onClick={() => {
          console.log('clicked');
        }}
      />{' '}
    </div>
  );
}

export default App;

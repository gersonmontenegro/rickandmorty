import React from 'react';
import {connectToDevTools} from 'react-devtools-core';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Home} from '@screens/home';

const queryClient = new QueryClient();

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  connectToDevTools({
    host: 'localhost',
    port: 8097,
  });

  if (__DEV__) {
    void import('react-query-native-devtools').then(({addPlugin}) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      addPlugin({queryClient});
    });
  }
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
      <Toast position="bottom" bottomOffset={20} />
    </SafeAreaProvider>
  );
}

export default App;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Home} from '@screens/home';

const queryClient = new QueryClient();

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

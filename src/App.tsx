import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

import {Home} from '@screens/home';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Home />
      <Toast position="bottom" bottomOffset={20} />
    </SafeAreaProvider>
  );
}

export default App;

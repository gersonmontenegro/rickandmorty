import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home} from './screens/home';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

export default App;

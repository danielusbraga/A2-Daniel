import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './src/routes/AppNavigator';


const Stack = createStackNavigator();

const App = () => {
  return (
    <AppNavigator/>
    
  );
};

export default App;


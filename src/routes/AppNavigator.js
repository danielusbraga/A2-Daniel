import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import CadastroAce from '../screens/acessorio/CadastroAce'; 
import AceHome from '../screens/acessorio/AceHome'; 
import Home from '../screens/home/Home';
import Cadastro from '../screens/home/Cadastro';
import Adicional from '../screens/adicional/Adicional';
import CadastroAdi from '../screens/adicional/CadastroAdi';
import DogHome from '../screens/dogs/DogHome';
import CadastroDog from '../screens/dogs/CadastroDog';
import RacaoHome from '../screens/racao/RacaoHome';
import CadastroRacao from '../screens/racao/CadastroRacao';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Lista de Registros' }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  );
};

const AdicionalStack = () => {
  return (
    <Stack.Navigator initialRouteName="Adicional">
      <Stack.Screen name="Adicional" component={Adicional} options={{ title: 'Lista de Adicionais' }} />
      <Stack.Screen name="CadastroAdi" component={CadastroAdi} options={{ title: 'Cadastro de Adicionais' }} />
    </Stack.Navigator>
  );
};

const DogStack = () => {
  return (
    <Stack.Navigator initialRouteName="DogHome">
      <Stack.Screen name="DogHome" component={DogHome} options={{ title: 'Lista de Formulários de Cachorro' }} />
      <Stack.Screen name="CadastroDog" component={CadastroDog} options={{ title: 'Cadastro de Cachorro' }} />
    </Stack.Navigator>
  );
};

const AceStack = () => {
  return (
    <Stack.Navigator initialRouteName="AceHome">
      <Stack.Screen name="AceHome" component={AceHome} options={{ title: 'Lista de Formulários Ace' }} />
      <Stack.Screen name="CadastroAce" component={CadastroAce} options={{ title: 'Cadastro Ace' }} />
    </Stack.Navigator>
  );
};

const RacaoStack = () => {
  return (
    <Stack.Navigator initialRouteName="RacaoHome">
      <Stack.Screen name="RacaoHome" component={RacaoHome} options={{ title: 'Lista de Rações' }} />
      <Stack.Screen name="CadastroRacao" component={CadastroRacao} options={{ title: 'Cadastro de Ração' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
          <Tab.Screen name="AdicionalStack" component={AdicionalStack} options={{ title: 'Adicional' }} />
          <Tab.Screen name="DogStack" component={DogStack} options={{ title: 'Cachorro' }} />
          <Tab.Screen name="AceStack" component={AceStack} options={{ title: 'Ace' }} />
          <Tab.Screen name="RacaoStack" component={RacaoStack} options={{ title: 'Ração' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default AppNavigator;





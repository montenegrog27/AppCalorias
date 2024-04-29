import React from 'react';
import Home from '../views/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddFood} from '../views/AddFood/AddFood';
import {color} from '@rneui/base';

const Stack = createNativeStackNavigator();

const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTitleStyle: {
    color: 'black',
  },
};

const Routes = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...routeScreenDefaultOptions,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddFood"
        component={AddFood}
        options={{
          ...routeScreenDefaultOptions,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;

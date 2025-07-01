import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen';
import AddTodoScreen from './screens/AddTodoScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '📝 My Todo List' }} />
        <Stack.Screen name="AddTodo" component={AddTodoScreen} options={{ title: '➕ Add New Todo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

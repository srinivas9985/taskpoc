import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import ShoppingHomeScreen from '../screens/ShoppingHomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ServicesHomeScreen from '../screens/ServicesHomeScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
// import ServicesScreen from '../screens/ServicesScreen';
import BottomNavBar from '../components/BottomNavBar';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ShoppingStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function ServicesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ServicesHome" component={ServicesHomeScreen} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
        </Stack.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <Tab.Navigator
            tabBar={props => <BottomNavBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={ShoppingStack} />
            <Tab.Screen name="Services" component={ServicesStack} />
        </Tab.Navigator>
    );
}

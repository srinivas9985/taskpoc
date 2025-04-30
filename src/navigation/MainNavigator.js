import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingHomeScreen from '../screens/ShoppingHomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import ServicesHomeScreen from '../screens/ServicesHomeScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ShoppingStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ShoppingHome" component={ShoppingHomeScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
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
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home'  // MaterialIcons alternatives
                    } else if (route.name === 'Services') {
                        iconName = 'build'
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: '#ff6347',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={ShoppingStack} />
            <Tab.Screen name="Services" component={ServicesStack} />
        </Tab.Navigator>
    );
}

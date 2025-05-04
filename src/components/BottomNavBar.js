import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const tabs = [
    { key: 'Home', icon: 'home', label: 'Home' },
    // { key: 'Services', icon: 'tool', label: 'Services' },
    // { key: 'home', icon: 'home' },
    { key: 'Services', icon: 'shopping-bag' },
    { key: 'heart', icon: 'heart' },
    { key: 'star', icon: 'user' },

];

export default function BottomNavBar({ state, descriptors, navigation }) {
    // Defensive: Check if state and routes exist
    if (!state || !state.routes || typeof state.index !== 'number') {
        return null; // Or return a placeholder if you want
    }

    const currentTab = state.routes[state.index];

    // Defensive: Check for nested state and routes
    const nestedState = currentTab?.state;
    const nestedRoutes = nestedState?.routes;
    const nestedIndex = nestedState?.index;

    // Get the nested route name if available
    const nestedRouteName =
        nestedRoutes && typeof nestedIndex === 'number'
            ? nestedRoutes[nestedIndex]?.name
            : null;

    // Debug: log the nested route name
    // console.log('Tab:', currentTab.name, 'Nested:', nestedRouteName);

    // Hide tab bar ONLY on ProductDetails, show everywhere else
    if (currentTab?.name === 'Home' && (nestedRouteName === 'ProductDetails' || nestedRouteName === 'CartScreen')) {
        return null;
    }

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isFocused = state?.index === index;
                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={[styles.tab, isFocused && styles.activeTab]}
                        onPress={() => navigation.navigate(tab.key)}
                    >
                        <Icon
                            name={tab.icon}
                            size={wp('7%')}
                            color={isFocused ? '#fff' : '#fafafa'}
                        />
                        {/* <Text style={[styles.label, isFocused && styles.activeLabel]}>
                            {tab.label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 30,
        paddingHorizontal: wp('8%'),
        paddingVertical: hp('1.5%'),
        marginHorizontal: wp('5%'),
        marginBottom: hp('2%'),
        elevation: 10,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.8,
        shadowRadius: 26,
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(255,255,255,0.18)',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#444',
    },
    label: {
        color: '#fff',
        fontSize: wp('3%'),
        marginTop: 2,
    },
    activeLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
}); 
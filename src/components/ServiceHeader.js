import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ServiceHeader() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.headerContainer, { backgroundColor: '#7B3FE4' }]}>
            <View style={styles.headerContent}>
                <TouchableOpacity style={styles.locationButton}>
                    <Icon name="location-on" size={wp('6%')} color="#FFFFFF" />
                    <Text style={styles.locationText}>New York, NY</Text>
                    <Icon name="keyboard-arrow-down" size={wp('6%')} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <Icon name="search" size={wp('6%')} color="rgba(255,255,255,0.6)" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search services..."
                        placeholderTextColor="rgba(255,255,255,0.6)"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    headerContent: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        gap: hp('2%'),
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: hp('3%'),
        color: '#FFFFFF',
        fontWeight: '600',
        marginHorizontal: wp('2%'),
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        borderRadius: wp('3%'),
        marginTop: hp('1%'),
    },
    searchInput: {
        flex: 1,
        fontSize: wp('4%'),
        color: '#FFFFFF',
        marginLeft: wp('2%'),
        padding: 0,
    },
}); 
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ServiceDetail({ service, onBackPress, onBookPress }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{service.name}</Text>
            </View>
            <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceValue}>${service.price}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{service.description}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>Details</Text>
                    <View style={styles.detailsList}>
                        {service.details.map((detail, index) => (
                            <View key={index} style={styles.detailItem}>
                                <Text style={styles.detailBullet}>•</Text>
                                <Text style={styles.detailText}>{detail}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingTop: hp('4%'),
        paddingBottom: hp('2%'),
    },
    backButton: {
        marginRight: wp('4%'),
    },
    backButtonText: {
        fontSize: wp('4%'),
        color: '#FFFFFF',
    },
    headerTitle: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('4%') : wp('6%'),
        fontWeight: '600',
        color: '#FFFFFF',
    },
    serviceImage: {
        width: '100%',
        height: hp('40%'),
    },
    content: {
        padding: wp('4%'),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('4%'),
    },
    priceLabel: {
        fontSize: wp('4%'),
        color: 'rgba(255, 255, 255, 0.7)',
        marginRight: wp('2%'),
    },
    priceValue: {
        fontSize: wp('6%'),
        fontWeight: '600',
        color: '#FFFFFF',
    },
    descriptionContainer: {
        marginBottom: hp('4%'),
    },
    descriptionTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    descriptionText: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: wp('5%'),
    },
    detailsContainer: {
        marginBottom: hp('4%'),
    },
    detailsTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    detailsList: {
        marginLeft: wp('2%'),
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
    },
    detailBullet: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
        marginRight: wp('2%'),
    },
    detailText: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
        flex: 1,
    },
    bookButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: wp('2%'),
        paddingVertical: hp('2%'),
        alignItems: 'center',
        marginTop: hp('4%'),
    },
    bookButtonText: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#121212',
    },
}); 
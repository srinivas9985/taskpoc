import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ServiceDetails({ service, onBookNow, onBack }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{service.name}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: service.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.content}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${service.price}</Text>
                    <Text style={styles.duration}>{service.duration} minutes</Text>
                </View>

                <Text style={styles.description}>{service.description}</Text>

                <View style={styles.featuresContainer}>
                    <Text style={styles.featuresTitle}>What's Included</Text>
                    {service.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Text style={styles.featureBullet}>•</Text>
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Important Information</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Duration:</Text>
                        <Text style={styles.infoValue}>{service.duration} minutes</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Price:</Text>
                        <Text style={styles.infoValue}>${service.price}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Availability:</Text>
                        <Text style={styles.infoValue}>{service.availability}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.bookButton} onPress={onBookNow}>
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
        padding: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: wp('4%'),
    },
    backButtonText: {
        fontSize: wp('3.5%'),
        color: '#FFFFFF',
    },
    headerTitle: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('4%') : wp('6%'),
        fontWeight: '600',
        color: '#FFFFFF',
    },
    imageContainer: {
        width: '100%',
        height: hp('30%'),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: wp('4%'),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('3%'),
    },
    price: {
        fontSize: wp('6%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginRight: wp('2%'),
    },
    duration: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.7)',
    },
    description: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: wp('5%'),
        marginBottom: hp('4%'),
    },
    featuresContainer: {
        marginBottom: hp('4%'),
    },
    featuresTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    featureItem: {
        flexDirection: 'row',
        marginBottom: hp('1.5%'),
    },
    featureBullet: {
        fontSize: wp('3.5%'),
        color: '#FFFFFF',
        marginRight: wp('2%'),
    },
    featureText: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: wp('2%'),
        padding: wp('4%'),
        marginBottom: hp('4%'),
    },
    infoTitle: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: hp('1.5%'),
    },
    infoLabel: {
        width: wp('20%'),
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.7)',
    },
    infoValue: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#FFFFFF',
    },
    bookButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: wp('2%'),
        paddingVertical: hp('2%'),
        alignItems: 'center',
    },
    bookButtonText: {
        fontSize: wp('3.5%'),
        fontWeight: '600',
        color: '#121212',
    },
}); 
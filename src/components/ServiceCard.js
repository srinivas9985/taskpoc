import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function ServiceCard({ service, style }) {
    return (
        <TouchableOpacity style={[styles.card, style]} activeOpacity={0.95}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: service.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(0,0,0,0.2)',
                        'rgba(0,0,0,0.6)',
                        'rgba(0,0,0,0.8)'
                    ]}
                    locations={[0, 0.4, 0.75, 1]}
                    style={styles.gradient}
                />
            </View>
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={wp('3%')} color="#FFD700" />
                        <Text style={styles.rating}>{service.rating}</Text>
                    </View>
                    <Text style={styles.price}>
                        ${service.price}<Text style={styles.perHour}>/hr</Text>
                    </Text>
                </View>

                <View style={styles.bottomContent}>
                    <Text style={styles.title} numberOfLines={1}>{service.title}</Text>
                    <View style={styles.providerInfo}>
                        <Image
                            source={{ uri: service.providerImage }}
                            style={styles.providerImage}
                        />
                        <Text style={styles.providerName} numberOfLines={1}>{service.providerName}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        height: hp('25%'),
        borderRadius: wp('4%'),
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2,
        padding: wp('4%'),
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('0.5%'),
        borderRadius: wp('4%'),
    },
    rating: {
        fontSize: wp('2%'),
        color: '#FFFFFF',
        marginLeft: wp('1%'),
        fontWeight: '600',
    },
    price: {
        fontSize: wp('3%'),
        color: '#FFFFFF',
        fontWeight: '700',
    },
    perHour: {
        fontSize: wp('2%'),
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '400',
    },
    bottomContent: {
        gap: hp('1%'),
    },
    title: {
        fontSize: wp('3%'),
        fontWeight: '700',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    providerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.8%'),
        borderRadius: wp('5%'),
        alignSelf: 'flex-start',
    },
    providerImage: {
        width: wp('5%'),
        height: wp('5%'),
        borderRadius: wp('4%'),
        marginRight: wp('2%'),
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    providerName: {
        fontSize: wp('3%'),
        color: '#FFFFFF',
        fontWeight: '500',
    },
});

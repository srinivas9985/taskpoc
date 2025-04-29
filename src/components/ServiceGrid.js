import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const getGridColumns = () => {
    const { width } = Dimensions.get('window');
    return width >= 768 ? 3 : 2; // More columns on larger screens
};

const getServiceWidth = () => {
    const { width } = Dimensions.get('window');
    const columns = getGridColumns();
    const padding = wp('4%') * 2; // Total horizontal padding
    const gap = wp('2%') * (columns - 1); // Total gap space
    return (width - padding - gap) / columns;
};

export default function ServiceGrid({ services, onServicePress }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <View style={styles.servicesGrid}>
                {services.map((service) => (
                    <TouchableOpacity
                        key={service.id}
                        style={styles.serviceCardWrapper}
                        onPress={() => onServicePress?.(service)}
                    >
                        <View style={styles.serviceCard}>
                            <Image
                                source={{ uri: service.image }}
                                style={styles.serviceImage}
                                resizeMode="cover"
                            />
                            <View style={styles.serviceContent}>
                                <Text style={styles.serviceName}>{service.name}</Text>
                                <Text style={styles.servicePrice}>${service.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: hp('4%'),
        paddingHorizontal: wp('4%'),
    },
    sectionTitle: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('3.5%') : wp('5%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: wp('2%'),
    },
    serviceCardWrapper: {
        width: getServiceWidth(),
        aspectRatio: 1,
        marginBottom: hp('2%'),
    },
    serviceCard: {
        width: '100%',
        height: '100%',
        borderRadius: wp('4%'),
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    serviceImage: {
        width: '100%',
        height: '100%',
        borderRadius: wp('4%'),
    },
    serviceContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: wp('3%'),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    serviceName: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2.5%') : wp('3.5%'),
        fontWeight: '500',
        color: '#FFFFFF',
        marginBottom: hp('0.5%'),
    },
    servicePrice: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2%') : wp('3%'),
        fontWeight: '600',
        color: '#FFFFFF',
    },
}); 
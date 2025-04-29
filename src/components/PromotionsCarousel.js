import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function PromotionsCarousel({ promotions, onPromotionPress }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.offersScrollContent}
            >
                {promotions.map((promotion) => (
                    <TouchableOpacity
                        key={promotion.id}
                        style={styles.offerCardWrapper}
                        onPress={() => onPromotionPress?.(promotion)}
                    >
                        <View style={styles.offerCard}>
                            <Image
                                source={{ uri: promotion.image }}
                                style={styles.offerImage}
                                resizeMode="cover"
                            />
                            <View style={styles.offerContent}>
                                <Text style={styles.offerTitle}>{promotion.title}</Text>
                                <Text style={styles.offerDescription}>{promotion.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    offersScrollContent: {
        paddingHorizontal: wp('2%'),
    },
    offerCardWrapper: {
        width: wp('80%'), // Fixed width for each offer card
        marginRight: wp('4%'), // Space between cards
    },
    offerCard: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: wp('4%'),
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    offerImage: {
        width: '100%',
        height: '100%',
        borderRadius: wp('4%'),
    },
    offerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: wp('4%'),
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Overlay for better text visibility
    },
    offerTitle: {
        fontSize: wp('6%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('1%'),
    },
    offerDescription: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
    },
}); 
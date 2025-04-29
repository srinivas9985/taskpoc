import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

export default function TestimonialCarousel({ testimonials, onTestimonialPress }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Testimonials</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.testimonialsScrollContent}
            >
                {testimonials.map((testimonial) => (
                    <TouchableOpacity
                        key={testimonial.id}
                        style={styles.testimonialCardWrapper}
                        onPress={() => onTestimonialPress?.(testimonial)}
                    >
                        <View style={styles.testimonialCard}>
                            <View style={styles.testimonialHeader}>
                                <Image
                                    source={{ uri: testimonial.avatar }}
                                    style={styles.avatar}
                                    resizeMode="cover"
                                />
                                <View style={styles.testimonialInfo}>
                                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                                    <Text style={styles.testimonialDate}>{testimonial.date}</Text>
                                </View>
                            </View>
                            <Text style={styles.testimonialText} numberOfLines={3}>{testimonial.text}</Text>
                            <View style={styles.ratingContainer}>
                                {[...Array(5)].map((_, index) => (
                                    <Text
                                        key={index}
                                        style={[
                                            styles.ratingStar,
                                            index < testimonial.rating ? styles.ratingStarFilled : styles.ratingStarEmpty,
                                        ]}
                                    >
                                        ★
                                    </Text>
                                ))}
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
        fontSize: SCREEN_WIDTH >= 768 ? wp('3.5%') : wp('5%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    testimonialsScrollContent: {
        paddingHorizontal: wp('2%'),
    },
    testimonialCardWrapper: {
        minWidth: CARD_WIDTH,
        marginRight: wp('4%'),
        flex: 1,
    },
    testimonialCard: {
        flex: 1,
        padding: wp('4%'),
        borderRadius: wp('4%'),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    testimonialHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    avatar: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        marginRight: wp('3%'),
    },
    testimonialInfo: {
        flex: 1,
    },
    testimonialName: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('0.5%'),
    },
    testimonialDate: {
        fontSize: wp('3%'),
        color: 'rgba(255, 255, 255, 0.7)',
    },
    testimonialText: {
        fontSize: wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: wp('5%'),
        marginBottom: hp('2%'),
    },
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    ratingStar: {
        fontSize: wp('4%'),
        marginRight: wp('1%'),
    },
    ratingStarFilled: {
        color: '#FFD700',
    },
    ratingStarEmpty: {
        color: 'rgba(255, 255, 255, 0.3)',
    },
}); 
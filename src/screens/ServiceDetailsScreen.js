import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const serviceProvider = {
    id: '1',
    name: 'Best Food Delivery',
    image: 'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
    rating: 4.5,
    price: '$10 - $50',
    description: 'Fast and reliable food delivery from top restaurants.',
    testimonials: [
        { id: '1', user: 'Alex', comment: 'Great service, fast delivery!' },
        { id: '2', user: 'Sam', comment: 'Good food, timely delivery.' },
    ],
};

export default function ServiceDetailsScreen({ route, navigation }) {
    const { service } = route.params;
    const [selectedTime, setSelectedTime] = useState(null);
    const insets = useSafeAreaInsets();

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    const renderHeader = () => (
        <View style={[styles.header]}>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={wp('6%')} color="#000" />
                </TouchableOpacity>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name="share" size={wp('6%')} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name="favorite-border" size={wp('6%')} color="#000" />
                    </TouchableOpacity>
                   
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
            {renderHeader()}

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Service Image */}
                <Image
                    source={{ uri: service.image }}
                    style={styles.serviceImage}
                    resizeMode="cover"
                />

                {/* Service Info */}
                <View style={styles.infoSection}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <View style={styles.ratingRow}>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{service.rating} ★</Text>
                        </View>
                        <Text style={styles.ratingCount}>(200+ Ratings)</Text>
                    </View>
                    <Text style={styles.timing}>{service.time} • 2.4 km away</Text>
                </View>

                {/* Price Section */}
                <View style={styles.priceSection}>
                    <Text style={styles.sectionTitle}>Service Options</Text>
                    {['Basic', 'Standard', 'Premium'].map((option, index) => (
                        <View key={index} style={styles.priceRow}>
                            <View style={styles.priceInfo}>
                                <Text style={styles.optionName}>{option}</Text>
                                <Text style={styles.priceText}>
                                    ₹{(index + 1) * 499}
                                    <Text style={styles.originalPrice}> ₹{((index + 1) * 499 * 1.2).toFixed(0)}</Text>
                                    <Text style={styles.discount}> 20% off</Text>
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={styles.selectButtonText}>SELECT</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Time Slots */}
                <View style={styles.timeSection}>
                    <Text style={styles.sectionTitle}>Available Time Slots</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.timeSlotsContainer}
                    >
                        {timeSlots.map((time, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.timeSlot,
                                    selectedTime === time && styles.selectedTimeSlot
                                ]}
                                onPress={() => setSelectedTime(time)}
                            >
                                <Text style={[
                                    styles.timeText,
                                    selectedTime === time && styles.selectedTimeText
                                ]}>
                                    {time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Reviews Section */}
                <View style={styles.reviewsSection}>
                    <Text style={styles.sectionTitle}>Customer Reviews</Text>
                    <View style={styles.overallRating}>
                        <Text style={styles.ratingBig}>4.8★</Text>
                        <Text style={styles.ratingSubtext}>based on 200+ ratings</Text>
                    </View>
                    {service.testimonials?.map((review, index) => (
                        <View key={index} style={styles.reviewCard}>
                            <View style={styles.reviewHeader}>
                                <View style={styles.reviewerInfo}>
                                    <Text style={styles.reviewerName}>{review.user}</Text>
                                    <View style={styles.reviewRatingBadge}>
                                        <Text style={styles.reviewRatingText}>5.0 ★</Text>
                                    </View>
                                </View>
                                <Text style={styles.reviewDate}>2 days ago</Text>
                            </View>
                            <Text style={styles.reviewText}>{review.comment}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={[styles.bottomButtons, { paddingBottom: insets.bottom }]}>
                <TouchableOpacity style={styles.cartButton}>
                    <Text style={styles.cartButtonText}>Book Now</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>S</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        zIndex: 1000,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        height: hp('7%'),
    },
    backButton: {
        padding: wp('2%'),
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        padding: wp('2%'),
        marginLeft: wp('3%'),
    },
    scrollView: {
        flex: 1,
    },
    serviceImage: {
        width: width,
        height: width * 0.75,
        backgroundColor: '#F5F5F5',
    },
    infoSection: {
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    serviceName: {
        fontSize: wp('5%'),
        fontWeight: '600',
        color: '#212121',
        marginBottom: hp('1%'),
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    ratingBadge: {
        backgroundColor: '#388E3C',
        paddingHorizontal: wp('2%'),
        paddingVertical: wp('1%'),
        borderRadius: wp('1%'),
        marginRight: wp('2%'),
    },
    ratingText: {
        color: '#FFFFFF',
        fontSize: wp('3.5%'),
        fontWeight: '500',
    },
    ratingCount: {
        color: '#757575',
        fontSize: wp('3.5%'),
    },
    timing: {
        color: '#757575',
        fontSize: wp('3.5%'),
    },
    priceSection: {
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: '#212121',
        marginBottom: hp('2%'),
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    priceInfo: {
        flex: 1,
    },
    optionName: {
        fontSize: wp('4%'),
        color: '#212121',
        marginBottom: hp('0.5%'),
    },
    priceText: {
        fontSize: wp('3.8%'),
        color: '#212121',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#757575',
        marginLeft: wp('2%'),
    },
    discount: {
        color: '#388E3C',
    },
    selectButton: {
        backgroundColor: '#2874F0',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1%'),
        borderRadius: wp('1%'),
    },
    selectButtonText: {
        color: '#FFFFFF',
        fontSize: wp('3.5%'),
        fontWeight: '500',
    },
    timeSection: {
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    timeSlotsContainer: {
        paddingVertical: hp('1%'),
    },
    timeSlot: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        borderRadius: wp('1%'),
        backgroundColor: '#F5F5F5',
        marginRight: wp('2%'),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedTimeSlot: {
        backgroundColor: '#2874F0',
        borderColor: '#2874F0',
    },
    timeText: {
        fontSize: wp('3.5%'),
        color: '#212121',
    },
    selectedTimeText: {
        color: '#FFFFFF',
    },
    reviewsSection: {
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
    },
    overallRating: {
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    ratingBig: {
        fontSize: wp('8%'),
        fontWeight: '600',
        color: '#212121',
    },
    ratingSubtext: {
        color: '#757575',
        fontSize: wp('3.5%'),
    },
    reviewCard: {
        marginBottom: hp('2%'),
        paddingVertical: hp('2%'),
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('1%'),
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewerName: {
        fontSize: wp('3.8%'),
        fontWeight: '500',
        color: '#212121',
        marginRight: wp('2%'),
    },
    reviewRatingBadge: {
        backgroundColor: '#388E3C',
        paddingHorizontal: wp('2%'),
        paddingVertical: wp('0.5%'),
        borderRadius: wp('1%'),
    },
    reviewRatingText: {
        color: '#FFFFFF',
        fontSize: wp('3.2%'),
    },
    reviewDate: {
        color: '#757575',
        fontSize: wp('3.2%'),
    },
    reviewText: {
        fontSize: wp('3.5%'),
        color: '#424242',
        lineHeight: wp('5%'),
    },
    bottomButtons: {
        flexDirection: 'row',
        padding: wp('4%'),
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    cartButton: {
        flex: 1,
        backgroundColor: '#FF9F00',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('1%'),
        marginRight: wp('2%'),
        alignItems: 'center',
    },
    cartButtonText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: '600',
    },
    bookButton: {
        flex: 1,
        backgroundColor: '#FB641B',
        paddingVertical: hp('1.5%'),
        borderRadius: wp('1%'),
        marginLeft: wp('2%'),
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: '600',
    },
});

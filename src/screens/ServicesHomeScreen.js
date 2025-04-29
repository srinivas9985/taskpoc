import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ServiceHeader from '../components/ServiceHeader';
import ServiceCard from '../components/ServiceCard';
import { fonts } from '../theme/typography';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallDevice = SCREEN_HEIGHT < 700;
const isTablet = SCREEN_WIDTH > 768;

// Categories data
const categories = [
    { id: '1', name: 'Cleaning', icon: 'cleaning-services' },
    { id: '2', name: 'Plumbing', icon: 'plumbing' },
    { id: '3', name: 'Electrical', icon: 'electrical-services' },
    { id: '4', name: 'Gardening', icon: 'grass' },
    { id: '5', name: 'Painting', icon: 'format-paint' },
    { id: '6', name: 'Moving', icon: 'local-shipping' },
];

// Offers data
const offers = [
    {
        id: '1',
        title: '20% OFF',
        description: 'On your first cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        title: 'Special Deal',
        description: '$50 off on plumbing',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        title: 'Weekend Offer',
        description: 'Free inspection',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
];

// Featured services data
const featuredServices = [
    {
        id: '1',
        title: 'Deep House Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        price: 25,
        providerName: 'Sarah Johnson',
        providerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '2',
        title: 'Emergency Plumbing',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        price: 45,
        providerName: 'Mike Thompson',
        providerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '3',
        title: 'Electrical Repair',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        price: 35,
        providerName: 'David Wilson',
        providerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
];

// Regular services data
const allServices = [
    {
        id: '1',
        title: 'House Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        price: 25,
        providerName: 'Sarah Johnson',
        providerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '2',
        title: 'Plumbing Service',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        price: 45,
        providerName: 'Mike Thompson',
        providerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
];

export default function ServicesHomeScreen({ navigation }) {
    const renderCategory = (category) => (
        <TouchableOpacity
            key={category.id}
            style={styles.categoryItem}
            onPress={() => navigation.navigate('ServiceDetails', {
                service: {
                    ...category,
                    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    time: '30-45 min',
                    testimonials: [
                        { id: '1', user: 'John D.', comment: 'Excellent service!' },
                        { id: '2', user: 'Sarah M.', comment: 'Very professional.' }
                    ]
                }
            })}
        >
            <View style={styles.categoryIcon}>
                <Icon name={category.icon} size={isTablet ? wp('4%') : wp('6%')} color="#7B3FE4" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
    );

    const renderOffer = (offer) => (
        <TouchableOpacity
            key={offer.id}
            style={styles.offerCard}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('ServiceDetails', { service: offer })}
        >
            <View style={styles.offerImageContainer}>
                <Image
                    source={{ uri: offer.image }}
                    style={styles.offerImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={[
                        'transparent',
                        'rgba(0,0,0,0.2)',
                        'rgba(0,0,0,0.6)',
                        'rgba(0,0,0,0.8)'
                    ]}
                    locations={[0, 0.3, 0.7, 1]}
                    style={styles.offerGradient}
                />
            </View>
            <View style={styles.offerContent}>
                <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>Limited Time</Text>
                </View>
                <View>
                    <Text style={styles.offerTitle}>{offer.title}</Text>
                    <Text style={styles.offerDescription}>{offer.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#7B3FE4" />
            <LinearGradient
                colors={['#7B3FE4', '#6A3AE4']}
                style={styles.gradient}
            >
                <ServiceHeader navigation={navigation} />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={[
                        styles.contentContainer,
                        isTablet && styles.contentContainerTablet
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Categories */}
                    <View style={[styles.section, styles.categoriesSection]}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.categoriesContainer,
                                isTablet && styles.categoriesContainerTablet
                            ]}
                        >
                            {categories.map(renderCategory)}
                        </ScrollView>
                    </View>

                    {/* Offers Zone */}
                    <View style={[styles.section, styles.offersSection]}>
                        <Text style={styles.sectionTitle}>Special Offers</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.offersContainer,
                                isTablet && styles.offersContainerTablet
                            ]}
                        >
                            {offers.map(renderOffer)}
                        </ScrollView>
                    </View>

                    {/* Featured Services */}
                    <View style={[styles.section, styles.featuredSection]}>
                        <Text style={styles.sectionTitle}>Featured Services</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[
                                styles.featuredContainer,
                                isTablet && styles.featuredContainerTablet
                            ]}
                        >
                            {featuredServices.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onPress={() => navigation.navigate('ServiceDetails', { service })}
                                    style={[
                                        styles.featuredCard,
                                        isTablet && styles.featuredCardTablet
                                    ]}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    {/* All Services */}
                    <View style={[styles.section, styles.allServicesSection]}>
                        <Text style={styles.sectionTitle}>All Services</Text>
                        <View style={[
                            styles.servicesContainer,
                            isTablet && styles.servicesContainerTablet
                        ]}>
                            {allServices.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    onPress={() => navigation.navigate('ServiceDetails', { service })}
                                    style={[
                                        styles.regularCard,
                                        isTablet && styles.regularCardTablet
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B3FE4',
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingTop: isTablet ? hp('18%') : hp('14%'),
    },
    contentContainer: {
        paddingBottom: hp('5%'),
    },
    contentContainerTablet: {
        alignItems: 'center',
    },
    section: {
        marginBottom: isSmallDevice ? hp('2%') : hp('3%'),
        width: '100%',
    },
    categoriesSection: {
        marginTop: hp('2%'),
    },
    offersSection: {
        marginTop: hp('1%'),
    },
    featuredSection: {
        marginTop: hp('1%'),
    },
    allServicesSection: {
        marginTop: hp('1%'),
    },
    sectionTitle: {
        fontSize: isTablet ? wp('3.5%') : wp('5%'),
        fontFamily: fonts.openSansBold,
        color: '#FFFFFF',
        marginBottom: isSmallDevice ? hp('1.5%') : hp('2%'),
        paddingHorizontal: wp('4%'),
    },

    // Categories styles
    categoriesContainer: {
        paddingHorizontal: wp('4%'),
        paddingRight: wp('8%'),
        flexDirection: 'row',
        gap: isSmallDevice ? wp('3%') : wp('4%'),
    },
    categoriesContainerTablet: {
        gap: wp('3%'),
        justifyContent: 'center',
        paddingHorizontal: wp('2%'),
    },
    categoryItem: {
        alignItems: 'center',
        minWidth: isTablet ? wp('12%') : wp('18%'),
        flexDirection: 'column',
    },
    categoryIcon: {
        width: isTablet ? wp('10%') : wp('14%'),
        height: isTablet ? wp('10%') : wp('14%'),
        borderRadius: isTablet ? wp('5%') : wp('7%'),
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: isSmallDevice ? hp('0.5%') : hp('1%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryName: {
        fontSize: isTablet ? wp('2%') : wp('3%'),
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: fonts.openSansMedium,
    },

    // Offers styles
    offersContainer: {
        paddingHorizontal: wp('4%'),
        paddingRight: wp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: isSmallDevice ? hp('20%') : hp('25%'),
    },
    offersContainerTablet: {
        justifyContent: 'center',
        minHeight: hp('22%'),
        paddingHorizontal: wp('2%'),
    },
    offerCard: {
        minWidth: isTablet ? wp('45%') : (isSmallDevice ? wp('75%') : wp('65%')),
        height: isSmallDevice ? hp('20%') : hp('22%'),
        borderRadius: wp('4%'),
        overflow: 'hidden',
        marginRight: isTablet ? wp('2%') : wp('3%'),
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    offerImageContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f0f0f0',
    },
    offerImage: {
        width: '100%',
        height: '100%',
    },
    offerGradient: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    offerContent: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 2,
        padding: isSmallDevice ? wp('4%') : wp('5%'),
        justifyContent: 'space-between',
    },
    offerBadge: {
        backgroundColor: '#FF4757',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.6%'),
        borderRadius: wp('4%'),
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    offerBadgeText: {
        color: '#FFFFFF',
        fontSize: isTablet ? wp('2%') : (isSmallDevice ? wp('2.8%') : wp('3%')),
        fontFamily: fonts.openSansSemiBold,
    },
    offerTitle: {
        fontSize: isTablet ? wp('3%') : (isSmallDevice ? wp('5%') : wp('4%')),
        fontFamily: fonts.openSansBold,
        color: '#FFFFFF',
        marginBottom: hp('0.5%'),
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    offerDescription: {
        fontSize: isTablet ? wp('2.5%') : (isSmallDevice ? wp('3%') : wp('3.5%')),
        color: '#FFFFFF',
        opacity: 0.95,
        fontFamily: fonts.openSansRegular,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    // Featured services styles
    featuredContainer: {
        paddingHorizontal: wp('4%'),
        paddingRight: wp('8%'),
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: isSmallDevice ? hp('25%') : hp('28%'),
    },
    featuredContainerTablet: {
        justifyContent: 'center',
        minHeight: hp('25%'),
        paddingHorizontal: wp('2%'),
    },
    featuredCard: {
        minWidth: isTablet ? wp('45%') : (isSmallDevice ? wp('75%') : wp('70%')),
        height: isSmallDevice ? hp('22%') : hp('25%'),
        marginRight: isTablet ? wp('2%') : wp('3%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    featuredCardTablet: {
        minWidth: wp('50%'),
        height: hp('25%'),
        marginRight: wp('2%'),
    },

    // All services styles
    servicesContainer: {
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('2%'),
        flexDirection: 'column',
    },
    servicesContainerTablet: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: wp('3%'),
        alignSelf: 'center',
        flex: 1,
    },
    regularCard: {
        flex: 1,
        height: isSmallDevice ? hp('22%') : hp('25%'),
        marginBottom: hp('2%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    regularCardTablet: {
        flex: 0.485, // This is equivalent to 48.5% width
        height: hp('25%'),
        marginBottom: hp('2%'),
        marginHorizontal: wp('0.75%'),
    },
});


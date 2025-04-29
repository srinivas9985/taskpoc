import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Animated, Platform, Modal, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';



const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallDevice = SCREEN_HEIGHT < 700;
const isTablet = SCREEN_WIDTH > 768;


const CategoryButton = ({ icon, label, isYellow }) => (
    <TouchableOpacity
        style={[
            styles.categoryButton,
            isYellow && { backgroundColor: '#FFE11B' }
        ]}
    >
        <Image
            source={{ uri: icon }}
            style={styles.categoryIcon}
            resizeMode="contain"
        />
        <Text style={[
            styles.categoryLabel,
            isYellow && { color: '#000' }
        ]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const searchPlaceholders = [
    { text: "Search for Mobiles", icon: "phone-android" },
    { text: "Fashion Trends", icon: "style" },
    { text: "Electronics Deals", icon: "devices" },
    { text: "Home Appliances", icon: "home" },
];

const recentSearches = [
    "iPhone 13",
    "Samsung TV",
    "Nike Shoes",
    "Laptop Deals"
];

export default function Header({
    style,
    hideCategories = false,
    hideSearchBar = false,
    onCartPress,
    cartItemCount = 0
}) {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const searchInputRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSearchFocused) {
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    })
                ]).start();

                setPlaceholderIndex((prevIndex) =>
                    prevIndex === searchPlaceholders.length - 1 ? 0 : prevIndex + 1
                );
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isSearchFocused]);

    const renderSearchSuggestion = ({ item }) => (
        <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => {
                setSearchText(item);
                setIsSearchFocused(false);
                searchInputRef.current?.blur();
            }}
        >
            <Icon name="history" size={wp('4%')} color="#757575" />
            <Text style={styles.suggestionText}>{item}</Text>
        </TouchableOpacity>
    );

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

    return (
        <LinearGradient
            colors={['#7B3FE4', '#6A3AE4']}
            style={[styles.container, style]}
        >
            <View style={styles.headerMain}>
                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg' }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Search Bar */}
                {!hideSearchBar && (
                    <View style={styles.searchContainer}>
                        <Icon
                            name="search"
                            size={wp('5%')}
                            color={isSearchFocused ? "#2874f0" : "#9E9E9E"}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            ref={searchInputRef}
                            placeholder={searchPlaceholders[placeholderIndex]?.text}
                            style={styles.searchInput}
                            placeholderTextColor="#9E9E9E"
                            value={searchText}
                            onChangeText={setSearchText}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                        {searchText ? (
                            <TouchableOpacity
                                onPress={() => setSearchText('')}
                                style={styles.iconButton}
                            >
                                <Icon name="close" size={wp('5%')} color="#757575" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.rightIcons}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Icon name="mic" size={wp('5%')} color="#2874f0" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Icon name="camera-alt" size={wp('5%')} color="#2874f0" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}

                {/* Cart Icon */}
                <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
                    <Icon name="shopping-cart" size={wp('6%')} color="#FFFFFF" />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            {/* Categories section - only show if not hidden */}
            {!hideCategories && (
                <View style={styles.categoriesWrapper}>
                    <View style={styles.categoriesRow}>
                        <CategoryButton
                            icon="https://your-flipkart-icon.png"
                            label="Flipkart"
                            isYellow={true}
                        />
                        <CategoryButton
                            icon="https://your-grocery-icon.png"
                            label="Grocery"
                        />
                        <CategoryButton
                            icon="https://your-travel-icon.png"
                            label="Travel"
                        />
                        <CategoryButton
                            icon="https://your-pay-icon.png"
                            label="Pay"
                        />
                    </View>
                    <TouchableOpacity style={styles.locationContainer}>
                        <Icon name="location-on" size={wp('5%')} color="#000" />
                        <Text style={styles.pincode}>500072</Text>
                        <Text style={styles.locationText}>Select delivery location</Text>
                        <Icon name="chevron-right" size={wp('5%')} color="#2874F0" />
                    </TouchableOpacity>
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // paddingTop: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
        paddingBottom: hp('1%'),
        zIndex: 1000,
    },
    headerMain: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        height: hp('14%'),
        paddingTop: isTablet ? hp('1%') : hp('4%'),
    },
    logoContainer: {
        width: wp('10%'),
        height: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: wp('5%'),
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: wp('5%'),
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        height: hp('5%'),
        marginHorizontal: wp('3%'),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    searchIcon: {
        marginRight: wp('2%'),
    },
    searchInput: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#000000',
        padding: 0,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: wp('1%'),
        marginLeft: wp('1%'),
    },
    cartButton: {
        padding: wp('2%'),
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FF4757',
        borderRadius: wp('2%'),
        minWidth: wp('4%'),
        height: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    cartBadgeText: {
        color: '#FFFFFF',
        fontSize: wp('2.5%'),
        fontWeight: '600',
    },
    categoriesWrapper: {
        marginTop: hp('1%'),
    },
    categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    categoryButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: wp('3%'),
        padding: wp('2%'),
        width: wp('20%'),
        alignItems: 'center',
    },
    categoryIcon: {
        width: wp('8%'),
        height: wp('8%'),
        marginBottom: hp('0.5%'),
    },
    categoryLabel: {
        fontSize: wp('3.2%'),
        color: '#000000',
        fontWeight: '500',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    pincode: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: '600',
        marginRight: wp('2%'),
    },
    locationText: {
        color: '#2874F0',
        fontSize: wp('4%'),
        flex: 1,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('4%'),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    suggestionText: {
        marginLeft: wp('3%'),
        fontSize: wp('3.8%'),
        color: '#212121',
    },
});

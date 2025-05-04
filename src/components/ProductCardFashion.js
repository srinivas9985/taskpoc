import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../theme/typography';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const cardWidth = isTablet ? wp('40%') : wp('44%');
const contentHeight = isTablet ? hp('10%') : hp('9%'); // fixed content area for text/price/rating

// Map image names to local require
const localImages = {
    l1: require('../assets/l1.png'),
    l2: require('../assets/l2.png'),
    l3: require('../assets/l3.png'),
    l4: require('../assets/l4.png'),
};

// Hardcoded image sizes for demo (replace with actual sizes if known)
const imageSizes = {
    l1: { width: 338, height: 500 },
    l2: { width: 252, height: 400 },
    l3: { width: 239, height: 350 },
    l4: { width: 287, height: 430 },
};

const ProductCardFashion = ({ product, onPress }) => {
    const [fav, setFav] = useState(false);
    const scale = new Animated.Value(1);

    // Use the first image (URL or local) for each product
    const imageKey = product.images && product.images.length > 0 ? product.images[0] : 'l1';
    const imageSource = imageKey.startsWith('http') ? { uri: imageKey } : localImages[imageKey];
    const size = imageSizes[imageKey] || { width: 300, height: 400 };
    const imageAspectRatio = size.height / size.width;
    const imageHeight = cardWidth * imageAspectRatio;
    const cardHeight = imageHeight + contentHeight;

    const handleFav = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true })
        ]).start();
        setFav(!fav);
    };

    return (
        <TouchableOpacity style={[styles.card, { width: cardWidth, height: cardHeight }]} onPress={onPress} activeOpacity={0.85}>
            <View style={[styles.imageContainer, { height: imageHeight }]}> {/* dynamic height */}
                <Image source={imageSource} style={styles.image} resizeMode="cover" />
                <Animated.View style={[styles.heartBtn, { transform: [{ scale }] }]}>
                    <TouchableOpacity onPress={handleFav} activeOpacity={0.7}>
                        <View style={styles.heartCircle}>
                            <Image style={{ height: 18, width: 18 }} source={fav ? require('../assets/fillheart.png') : require('../assets/heart.png')} />
                            {/* <Icon
                                name={fav ? 'heart' : 'heart-o'}
                                size={18}
                                color={fav ? '#E9446A' : '#222'}
                            /> */}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <View style={[styles.content, { height: contentHeight }]}> {/* fixed content height */}
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <Text style={styles.category}>{product.category}</Text>
                <View style={styles.row}>
                    <Text style={styles.price}>${product.price}</Text>
                    <View style={styles.ratingBox}>
                        <Icon name="star" size={14} color="#FFD700" />
                        <Text style={styles.rating}>{product.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        marginBottom: hp('4%'),
        marginHorizontal: wp('2%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: 'transparent',
    },
    imageContainer: {
        width: '100%',
        borderRadius: 18,
        // borderTopRightRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#f2f2f2',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heartBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    heartCircle: {
        backgroundColor: '#292526',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#eee',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 4,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    title: {
        fontFamily: fonts.openSansBold,
        fontWeight: 'bold',
        fontSize: wp('3.2%'),
        color: '#222',
        marginBottom: 2,
    },
    category: {
        fontFamily: fonts.openSansRegular,
        color: '#888',
        fontSize: wp('3.2%'),
        marginBottom: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    price: {
        fontFamily: fonts.openSansBold,
        fontWeight: 'bold',
        fontSize: wp('3%'),
        color: '#222',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    rating: {
        fontFamily: fonts.openSansBold,
        marginLeft: 3,
        color: '#222',
        fontWeight: '600',
        fontSize: wp('2.5%'),
    },
});

export default ProductCardFashion; 
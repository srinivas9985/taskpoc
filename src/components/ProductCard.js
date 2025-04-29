// src/components/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const cardWidth = isTablet ? wp('30%') : wp('45%');

const ProductCard = ({ product, onPress }) => {
    const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.thumbnail || product.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {product.discountPercentage > 0 && (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{Math.round(product.discountPercentage)}% OFF</Text>
                    </View>
                )}
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{discountedPrice.toFixed(2)}</Text>
                    {product.discountPercentage > 0 && (
                        <Text style={styles.originalPrice}>₹{product.price.toFixed(2)}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: wp('2%'),
        marginVertical: hp('1%'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        width: '100%',
        height: isTablet ? hp('20%') : hp('15%'),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    discountBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF3B30',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
    },
    discountText: {
        color: 'white',
        fontSize: isTablet ? wp('1.5%') : wp('2.5%'),
        fontWeight: '600',
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        fontSize: isTablet ? wp('1.8%') : wp('3%'),
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: isTablet ? wp('2%') : wp('3.5%'),
        fontWeight: '700',
        color: '#2C3E50',
    },
    originalPrice: {
        fontSize: isTablet ? wp('1.5%') : wp('2.8%'),
        color: '#95A5A6',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
});

export default ProductCard;

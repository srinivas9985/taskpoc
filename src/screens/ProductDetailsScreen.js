import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const product = {
    id: '1',
    name: 'Smartphone X',
    price: '$999',
    discount: '10%',
    rating: 4.5,
    images: [
        'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
        'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
        'https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg',
    ],
    description: 'This is a top-of-the-line smartphone with advanced features.',
    specs: '128GB Storage, 6GB RAM, 12MP Camera, 4000mAh Battery',
    reviews: [
        { id: '1', user: 'John Doe', rating: 5, comment: 'Great phone!' },
        { id: '2', user: 'Jane Smith', rating: 4, comment: 'Good value for money.' },
    ],
};

// Add placeholder image
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400';

export default function ProductDetailsScreen({ route, navigation }) {
    const { product } = route.params || {};
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);

    const renderImageCarousel = () => (
        <View style={styles.carouselContainer}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setSelectedImageIndex(newIndex);
                }}
            >
                {product.images.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            source={{ uri: PLACEHOLDER_IMAGE }}
                            style={[styles.productImage, styles.placeholderImage]}
                        />
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={[styles.productImage, { position: 'absolute' }]}
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                        />
                        {imageLoading && (
                            <View style={styles.loaderContainer}>
                                <ActivityIndicator size="large" color="#7B3FE4" />
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {product.images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === selectedImageIndex && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderImageCarousel()}

                <View style={styles.detailsContainer}>
                    {/* Product Title and Rating */}
                    <Text style={styles.productName}>{product.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.rating}>★ {product.rating}</Text>
                        <Text style={styles.reviews}>
                            ({product.reviews?.length} Reviews)
                        </Text>
                    </View>

                    {/* Price Section */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.discountBadge}>
                            {Math.round(product.discountPercentage)}% OFF
                        </Text>
                        <Text style={styles.price}>${product.price}</Text>
                        <Text style={styles.originalPrice}>
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </Text>
                    </View>

                    {/* Product Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this item</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>

                    {/* Specifications */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Specifications</Text>
                        <View style={styles.specsList}>
                            <View style={styles.specItem}>
                                <Text style={styles.specLabel}>Brand</Text>
                                <Text style={styles.specValue}>{product.brand}</Text>
                            </View>
                            <View style={styles.specItem}>
                                <Text style={styles.specLabel}>Category</Text>
                                <Text style={styles.specValue}>{product.category}</Text>
                            </View>
                            <View style={styles.specItem}>
                                <Text style={styles.specLabel}>Stock</Text>
                                <Text style={styles.specValue}>{product.stock} units</Text>
                            </View>
                        </View>
                    </View>

                    {/* Reviews Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Customer Reviews</Text>
                        {product.reviews?.map((review, index) => (
                            <View key={index} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <Text style={styles.reviewerName}>
                                        {review.reviewerName}
                                    </Text>
                                    <Text style={styles.reviewRating}>
                                        {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)}
                                    </Text>
                                </View>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity
                    style={styles.cartButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buyButton}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    carouselContainer: {
        height: hp('45%'), // Responsive height
        backgroundColor: '#fff',
    },
    productImage: {
        width: width,
        height: hp('45%'), // Match container height
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: hp('2%'),
        alignSelf: 'center',
    },
    paginationDot: {
        width: wp('2%'),
        height: wp('2%'),
        borderRadius: wp('1%'),
        backgroundColor: '#ccc',
        marginHorizontal: wp('1%'),
    },
    paginationDotActive: {
        backgroundColor: '#000',
    },
    detailsContainer: {
        padding: wp('4%'),
    },
    productName: {
        fontSize: wp('5%'),
        fontWeight: '600',
        color: '#000',
        marginBottom: hp('1%'),
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('1.5%'),
    },
    rating: {
        color: '#FFA41C',
        marginRight: wp('2%'),
        fontSize: wp('4%'),
    },
    reviews: {
        color: '#007185',
        fontSize: wp('3.5%'),
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('2%'),
        flexWrap: 'wrap',
    },
    discountBadge: {
        backgroundColor: '#CC0C39',
        color: '#fff',
        padding: wp('1%'),
        borderRadius: wp('1%'),
        fontSize: wp('3%'),
        marginRight: wp('2%'),
    },
    price: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: '#0F1111',
        marginRight: wp('2%'),
    },
    originalPrice: {
        fontSize: wp('3.5%'),
        color: '#565959',
        textDecorationLine: 'line-through',
    },
    section: {
        marginVertical: hp('2%'),
        borderTopWidth: 1,
        borderTopColor: '#E7E7E7',
        paddingTop: hp('2%'),
    },
    sectionTitle: {
        fontSize: wp('4.5%'),
        fontWeight: '600',
        color: '#0F1111',
        marginBottom: hp('1.5%'),
    },
    description: {
        fontSize: wp('3.5%'),
        color: '#333',
        lineHeight: wp('5%'),
    },
    specsList: {
        backgroundColor: '#F8F8F8',
        borderRadius: wp('2%'),
        padding: wp('3%'),
    },
    specItem: {
        flexDirection: 'row',
        paddingVertical: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
    },
    specLabel: {
        flex: 1,
        fontSize: wp('3.5%'),
        color: '#666',
    },
    specValue: {
        flex: 2,
        fontSize: wp('3.5%'),
        color: '#333',
    },
    reviewCard: {
        marginBottom: hp('2%'),
        padding: wp('3%'),
        backgroundColor: '#F8F8F8',
        borderRadius: wp('2%'),
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('1%'),
    },
    reviewerName: {
        fontSize: wp('3.5%'),
        fontWeight: '600',
        color: '#0F1111',
    },
    reviewRating: {
        color: '#FFA41C',
        fontSize: wp('3.5%'),
    },
    reviewComment: {
        fontSize: wp('3.5%'),
        color: '#333',
        lineHeight: wp('5%'),
    },
    bottomButtons: {
        flexDirection: 'row',
        padding: wp('4%'),
        borderTopWidth: 1,
        borderTopColor: '#E7E7E7',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                paddingBottom: hp('4%'), // Extra padding for iOS
            },
            android: {
                paddingBottom: hp('2%'),
            },
        }),
    },
    cartButton: {
        flex: 1,
        backgroundColor: '#FFD814',
        borderRadius: wp('2%'),
        padding: hp('1.8%'),
        marginRight: wp('2%'),
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buyButton: {
        flex: 1,
        backgroundColor: '#FFA41C',
        borderRadius: wp('2%'),
        padding: hp('1.8%'),
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontSize: wp('4%'),
        fontWeight: '600',
        color: '#0F1111',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? hp('2%') : hp('1%'),
        left: wp('4%'),
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        width: wp('9%'),
        height: wp('9%'),
        borderRadius: wp('4.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 3,
    },
    backButtonText: {
        fontSize: wp('5%'),
        color: '#333',
        fontWeight: '600',
        marginTop: -2,
    },
    imageWrapper: {
        width: width,
        height: hp('45%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderImage: {
        opacity: 0.3,
    },
    loaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});

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
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../theme/typography';

const { width } = Dimensions.get('window');
const imageSize = width - wp('8%');

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS = ['#A9A9A9', '#888', '#444', '#111'];

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
    const [fav, setFav] = useState(true);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('L');
    const [color, setColor] = useState(COLORS[2]);
    const [readMore, setReadMore] = useState(false);

    // Get the image source robustly
    const imageSource =
        product.image
            ? (typeof product.image === 'string'
                ? { uri: product.image }
                : product.image)
            : (product.images && product.images.length > 0
                ? (typeof product.images[0] === 'string'
                    ? { uri: product.images[0] }
                    : product.images[0])
                : { uri: PLACEHOLDER_IMAGE });

    const renderImageCarousel = () => (
        <View style={styles.carouselContainer}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="chevron-left" size={10} color="#292526" />
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
                            source={
                                typeof image === 'string'
                                    ? { uri: image }
                                    : image
                            }
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
    const localImages = {
        l1: require('../assets/l1.png'),
        l2: require('../assets/l2.png'),
        l3: require('../assets/l3.png'),
        l4: require('../assets/l4.png'),
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp('4%') }}>
                <View style={styles.imageWrap}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={wp('4%')} color="#292526" />
                    </TouchableOpacity>
                    <View style={styles.imageShadow}>
                        {/* Robust image source logic, like ProductCardFashion.js */}
                        {(() => {
                            let imageKey = product.image;
                            if (!imageKey && product.images && product.images.length > 0) {
                                imageKey = product.images[0];
                            }
                            let imageSource;
                            if (typeof imageKey === 'string' && imageKey.startsWith('http')) {
                                imageSource = { uri: imageKey };
                            } else if (typeof imageKey === 'string' && localImages && localImages[imageKey]) {
                                imageSource = localImages[imageKey];
                            } else if (typeof imageKey === 'number') {
                                imageSource = imageKey;
                            } else {
                                imageSource = { uri: PLACEHOLDER_IMAGE };
                            }
                            return (
                                <Image
                                    source={imageSource}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            );
                        })()}
                    </View>
                    <TouchableOpacity style={styles.favBtn} onPress={() => setFav(f => !f)}>
                        <View style={styles.heartCircle}>
                            <Image style={{ height: wp('6%'), width: wp('6%'), tintColor: fav ? '#292526' : '#292526' }} source={fav ? require('../assets/fillheart.png') : require('../assets/heart.png')} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsWrap}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <View style={styles.qtyWrap}>
                            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => Math.max(1, q - 1))}>
                                <Text style={styles.qtyBtnText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{qty}</Text>
                            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(q => q + 1)}>
                                <Text style={styles.qtyBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ratingRow}>
                        <Icon name="star" size={wp('4.5%')} color="#FFD700" style={{ marginRight: 4 }} />
                        <Text style={styles.rating}>{product.rating}</Text>
                        <Text style={styles.reviews}> (<Text style={styles.reviewsLink}>{product.reviews?.length || 0} reviews</Text>)</Text>
                    </View>
                    <Text style={styles.desc} numberOfLines={readMore ? 10 : 2}>
                        {product.description}
                    </Text>
                    <TouchableOpacity onPress={() => setReadMore(r => !r)}>
                        <Text style={styles.readMore}>{readMore ? 'Show Less' : 'Read More...'}</Text>
                    </TouchableOpacity>
                    <View style={styles.optionsRow}>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.optionsLabel}>Choose Size</Text>
                            <View style={styles.sizesRow}>
                                {SIZES.map(s => (
                                    <TouchableOpacity
                                        key={s}
                                        style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
                                        onPress={() => setSize(s)}
                                    >
                                        <Text style={[styles.sizeBtnText, size === s && styles.sizeBtnTextActive]}>{s}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.optionsLabel}>Color</Text>
                            <View style={styles.colorsRow}>
                                {COLORS.map(c => (
                                    <TouchableOpacity
                                        key={c}
                                        style={[styles.colorCircle, { backgroundColor: c, borderWidth: color === c ? 2 : 0, borderColor: '#292526' }]}
                                        onPress={() => setColor(c)}
                                    />
                                ))}
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('CartScreen', { cartItems: [{ ...product, qty, size, color }] })}>
                        <Icon name="shopping-cart" size={wp('5%')} color="#fff" style={{ marginRight: 10 }} />
                        <Text style={styles.cartBtnText}>Add to Cart | ${product.price}</Text>
                        {product.oldPrice && <Text style={styles.oldPrice}>${product.oldPrice}</Text>}
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    imageWrap: {
        marginTop: hp('2%'),
        alignItems: 'center',
        position: 'relative',
    },
    imageShadow: {
        width: '92%',
        aspectRatio: 1,
        borderRadius: wp('8%'),
        backgroundColor: '#eee',
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.12,
        // shadowRadius: 12,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('2%'),
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: wp('8%'),
        backgroundColor: '#eee',

    },
    backBtn: {
        position: 'absolute',
        top: hp('1%'),
        left: wp('6%'),
        zIndex: 2,
        backgroundColor: '#fff',
        borderRadius: wp('6%'),
        width: wp('12%'),
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,

    },
    favBtn: {
        position: 'absolute',
        top: hp('1%'),
        right: wp('4%'),
        zIndex: 2,
        marginRight: wp('2%'),
    },
    heartCircle: {
        backgroundColor: '#fff',
        borderRadius: wp('6%'),
        width: wp('12%'),
        height: wp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    detailsWrap: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: wp('8%'),
        borderBottomRightRadius: wp('8%'),
        marginTop: -hp('2%'),
        paddingHorizontal: wp('6%'),
        paddingTop: hp('3%'),
        paddingBottom: hp('4%'),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('5.2%'),
        color: '#222',
        marginBottom: 4,
        flex: 1,
        flexWrap: 'wrap',
    },
    qtyWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        width: wp('9%'),
        height: wp('9%'),
        borderRadius: wp('4.5%'),
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    qtyBtnText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('6%'),
        color: '#222',
        paddingBottom: 2,
    },
    qtyText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4.5%'),
        color: '#222',
        marginHorizontal: wp('3%'),
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
    },
    reviewsLink: {
        color: '#2874f0',
        textDecorationLine: 'underline',
    },
    desc: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('3.5%'),
        color: '#888',
        marginBottom: 4,
    },
    readMore: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('3.2%'),
        color: '#222',
        marginBottom: 12,
    },
    optionsRow: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    optionsLabel: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('3.5%'),
        color: '#222',
        marginBottom: 6,
    },
    sizesRow: {
        flexDirection: 'row',
        marginTop: 2,
    },
    sizeBtn: {
        width: wp('7%'),
        height: wp('7%'),
        borderRadius: wp('4.5%'),
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        backgroundColor: '#fff',
    },
    sizeBtnActive: {
        backgroundColor: '#222',
        borderColor: '#222',
    },
    sizeBtnText: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('2.5%'),
        color: '#222',
    },
    sizeBtnTextActive: {
        color: '#fff',
        fontFamily: fonts.openSansBold,
    },
    colorsRow: {
        flexDirection: 'row',
        marginTop: 2,
    },
    colorCircle: {
        width: wp('6%'),
        height: wp('6%'),
        borderRadius: wp('4%'),
        marginRight: 8,
    },
    cartBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: wp('8%'),
        paddingVertical: hp('2%'),
        justifyContent: 'center',
        marginTop: wp('10%'),
    },
    cartBtnText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4.2%'),
        color: '#fff',
        marginRight: 8,
    },
    oldPrice: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('3.2%'),
        color: '#fff',
        textDecorationLine: 'line-through',
        opacity: 0.7,
    },
});

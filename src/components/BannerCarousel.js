import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    Platform,
    Animated
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.99; // Slightly smaller than screen width
const ITEM_HEIGHT = ITEM_WIDTH * 0.5; // Maintain Flipkart's aspect ratio
const SPACING = width * 0.0; // Spacing between items
const DOT_SIZE = 8;

// Create Animated FlatList
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const banners = [
    {
        id: '1',
        image: 'https://img.freepik.com/free-vector/flat-design-minimal-technology-youtube-thumbnail_23-2149146024.jpg',
    },
    {
        id: '2',
        image: 'https://cbx-prod.b-cdn.net/COLOURBOX54467231.jpg?width=800&height=800&quality=70',
    },
    {
        id: '3',
        image: 'https://cdn4.vectorstock.com/i/1000x1000/93/03/order-a-taxi-in-mobile-app-banner-design-vector-27449303.jpg',
    },
    {
        id: '4',
        image: 'https://static.vecteezy.com/system/resources/previews/002/179/541/non_2x/sale-offer-banner-with-hand-holding-phone-vector.jpg',
    },
    {
        id: '5',
        image: 'https://img.freepik.com/free-vector/hand-drawn-electronics-store-facebook-template_23-2151138109.jpg?semt=ais_hybrid&w=740',
    },
    // Add more banners as needed
];

export default function BannerCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    useEffect(() => {
        let scrollTimer;
        if (isAutoScrolling) {
            scrollTimer = setInterval(() => {
                if (flatListRef.current) {
                    const nextIndex = (activeIndex + 1) % banners.length;
                    flatListRef.current.scrollToIndex({
                        index: nextIndex,
                        animated: true,
                    });
                }
            }, 3000);
        }
        return () => {
            if (scrollTimer) {
                clearInterval(scrollTimer);
            }
        };
    }, [activeIndex, isAutoScrolling]);

    const handleScrollBegin = () => {
        setIsAutoScrolling(false);
    };

    const handleScrollEnd = (event) => {
        const position = event.nativeEvent.contentOffset.x;
        const index = Math.round(position / width);
        setActiveIndex(index);
        setIsAutoScrolling(true);
    };

    const renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0.95],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                style={[
                    styles.bannerWrapper,
                    { transform: [{ scale }] }
                ]}
            >
                <Image
                    source={{ uri: item.image }}
                    style={styles.banner}
                    resizeMode="cover"
                // defaultSource={require('../assets/placeholder.png')} // Add a placeholder image
                />
            </Animated.View>
        );
    };

    // Render pagination dots
    const renderPaginationDots = () => (
        <View style={styles.paginationContainer}>
            {banners.map((_, index) => {
                const inputRange = [
                    (index - 1) * width,
                    index * width,
                    (index + 1) * width,
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [1, 1.5, 1],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                opacity,
                                transform: [{ scale }]
                            },
                            index === activeIndex && styles.activeDot
                        ]}
                    />
                );
            })}
        </View>
    );

    const onScrollFailed = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: 0,
                animated: true,
            });
        }
    };

    return (
        <View style={styles.container}>
            <AnimatedFlatList
                ref={flatListRef}
                data={banners}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={width}
                decelerationRate={Platform.OS === 'ios' ? 0.5 : 0.9}
                bounces={false}
                onScrollBeginDrag={handleScrollBegin}
                onMomentumScrollEnd={handleScrollEnd}
                onScrollToIndexFailed={onScrollFailed}
                renderItem={renderItem}
                contentContainerStyle={styles.flatListContent}
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                removeClippedSubviews={true}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                windowSize={3}
            />
            {renderPaginationDots()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: ITEM_HEIGHT + hp('4%'),
        ...Platform.select({
            ios: {
                marginVertical: hp('1%'),
            },
            android: {
                marginVertical: hp('0.5%'),
            },
        }),
    },
    flatListContent: {
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    bannerWrapper: {
        width: width,
        height: ITEM_HEIGHT,
        paddingHorizontal: SPACING / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp('1%'),
        left: 0,
        right: 0,
    },
    dot: {
        height: DOT_SIZE,
        width: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#fff',
        marginHorizontal: 4,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    activeDot: {
        backgroundColor: '#2874f0',
    },
});

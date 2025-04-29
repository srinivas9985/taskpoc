import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DealOfDay = ({ data, navigation }) => {
    const [timeLeft, setTimeLeft] = useState({
        hours: '00',
        minutes: '00',
        seconds: '00'
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = data.endTime - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0')
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [data.endTime]);

    return (
        <View style={styles.container}>
            {/* Timer Section */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerTitle}>Deal ends in:</Text>
                <View style={styles.timerWrapper}>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeText}>{timeLeft.hours}</Text>
                        <Text style={styles.timeLabel}>HRS</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeText}>{timeLeft.minutes}</Text>
                        <Text style={styles.timeLabel}>MIN</Text>
                    </View>
                    <Text style={styles.timeSeparator}>:</Text>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeText}>{timeLeft.seconds}</Text>
                        <Text style={styles.timeLabel}>SEC</Text>
                    </View>
                </View>
            </View>

            {/* Product Section */}
            {data.product && (
                <TouchableOpacity
                    style={styles.productContainer}
                    onPress={() => navigation.navigate('ProductDetails', { product: data.product })}
                >
                    <Image
                        source={{ uri: data.product.image }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{data.product.name}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.discountedPrice}>
                                ${data.product.discountedPrice}
                            </Text>
                            <Text style={styles.originalPrice}>
                                ${data.product.originalPrice}
                            </Text>
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>
                                    {data.product.discountPercentage}% OFF
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#9747FF60',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    timerContainer: {
        alignItems: 'center',
        marginBottom: 15,
    },
    timerTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    timerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeBox: {
        backgroundColor: '#000',
        padding: 8,
        borderRadius: 6,
        minWidth: 45,
        alignItems: 'center',
    },
    timeText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    timeLabel: {
        color: '#fff',
        fontSize: 10,
        marginTop: 2,
    },
    timeSeparator: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
    },
    productImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 15,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    discountedPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e41e31',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#666',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    discountBadge: {
        backgroundColor: '#e41e31',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default DealOfDay;
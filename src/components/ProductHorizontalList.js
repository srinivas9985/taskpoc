// src/components/ProductHorizontalList.js
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import ProductCard from './ProductCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const isTablet = width >= 768; // iPad detection
const isSmallDevice = width < 375; // iPhone SE, etc.

// Responsive card width based on device size
const CARD_WIDTH = isTablet ? width * 0.4 : (isSmallDevice ? width * 0.7 : width * 0.6);

export default function ProductHorizontalList({ data, navigation, title }) {
    return (
        <View style={styles.sectionContainer}>
            {title && <View style={styles.titleContainer}><Text style={styles.title}>{title}</Text></View>}
            <FlatList
                horizontal
                data={data}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={{ width: wp('3%') }} />}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        cardWidth={CARD_WIDTH}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginVertical: hp('1%'),
    },
    titleContainer: {
        paddingHorizontal: wp('4%'),
        marginBottom: hp('1%'),
    },
    title: {
        fontSize: isTablet ? wp('3%') : (isSmallDevice ? wp('4%') : wp('3.5%')),
        fontWeight: 'bold',
        color: '#212121',
    },
    container: {
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
    },
});
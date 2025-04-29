import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import ProductCard from './ProductCard';

const { width } = Dimensions.get('window');
const numColumns = 2;
const CARD_WIDTH = (width - 30) / numColumns;

export default function ProductGrid({ data, navigation }) {
    console.log("data", data);
    return (
        <FlatList
            data={data}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}
            renderItem={({ item }) => (
                <ProductCard
                    product={item}
                    cardWidth={CARD_WIDTH}
                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
});
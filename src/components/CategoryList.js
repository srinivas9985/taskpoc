import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CategoryList({ data = [] }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryCard}
            activeOpacity={0.7}
            accessible
            accessibilityLabel={item.name}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.categoryImage}
                resizeMode="cover"
            />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(2),
    },
    listContainer: {
        paddingLeft: wp(4),
    },
    categoryCard: {
        alignItems: 'center',
        marginRight: wp(4),
        minWidth: wp(22), // Ensures touchable area is big enough
    },
    categoryImage: {
        width: wp(20),
        height: hp(10),
        borderRadius: wp(2),
        backgroundColor: '#eee',
    },
    categoryText: {
        marginTop: hp(1),
        fontSize: hp(1.6),
        color: '#000',
    },
});

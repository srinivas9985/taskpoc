import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const getGridColumns = () => {
    const { width } = Dimensions.get('window');
    return width >= 768 ? 4 : 3; // More columns on larger screens
};

const getCategoryWidth = () => {
    const { width } = Dimensions.get('window');
    const columns = getGridColumns();
    const padding = wp('4%') * 2; // Total horizontal padding
    const gap = wp('2%') * (columns - 1); // Total gap space
    return (width - padding - gap) / columns;
};

export default function CategoryGrid({ categories, onCategoryPress }) {
    return (
        <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryCardWrapper}
                        onPress={() => onCategoryPress?.(category)}
                    >
                        <View style={styles.categoryCard}>
                            <Image
                                source={{ uri: category.image }}
                                style={styles.categoryImage}
                                resizeMode="cover"
                            />
                            <View style={styles.categoryOverlay}>
                                <Text style={styles.categoryName}>{category.name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categoriesSection: {
        marginTop: hp('3%'),
        paddingHorizontal: wp('4%'),
    },
    sectionTitle: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('3.5%') : wp('5%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: wp('2%'),
    },
    categoryCardWrapper: {
        width: getCategoryWidth(),
        aspectRatio: 1.2,
        marginBottom: hp('2%'),
    },
    categoryCard: {
        width: '100%',
        height: '100%',
        borderRadius: wp('4%'),
        overflow: 'hidden',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    categoryOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: wp('3%'),
        paddingBottom: wp('2%'),
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    categoryName: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2.5%') : wp('3.5%'),
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
    },
}); 
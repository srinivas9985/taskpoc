// src/components/SectionRenderer.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SECTION_TYPES } from '../constants/contentTypes';
import BannerCarousel from '../components/BannerCarousel';
import CategoryList from '../components/CategoryList';
import ProductGrid from '../components/ProductGrid';
import ProductHorizontalList from '../components/ProductHorizontalList';
import DealOfDay from '../constants/DealOfDay';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const numColumns = isTablet ? 3 : 2;

const SectionRenderer = ({ section, navigation }) => {
    const { type, title, data } = section;

    const renderTitle = () => {
        if (!title) return null;
        return <Text style={styles.sectionTitle}>{title}</Text>;
    };

    const renderProductItem = ({ item }) => (
        <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
        />
    );

    const renderContent = () => {
        switch (type) {
            case SECTION_TYPES.BANNER:
                return <BannerCarousel data={data} />;

            case SECTION_TYPES.CATEGORY_LIST:
                return <CategoryList data={data} />;

            case SECTION_TYPES.PRODUCT_GRID:
                return (
                    <FlatList
                        data={data}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={false}
                        numColumns={numColumns}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.gridList}
                    />
                );

            case SECTION_TYPES.PRODUCT_HORIZONTAL:
                return (
                    <FlatList
                        data={data}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalList}
                    />
                );

            case SECTION_TYPES.DEAL_OF_DAY:
                return <DealOfDay data={data} navigation={navigation} />;

            default:
                return null;
        }
    };

    return (
        <View style={styles.section}>
            {renderTitle()}
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginVertical: hp('1%'),
    },
    sectionTitle: {
        fontSize: isTablet ? wp('2.5%') : wp('4%'),
        fontWeight: '600',
        marginHorizontal: wp('4%'),
        marginBottom: hp('1%'),
        color: '#2C3E50',
    },
    horizontalList: {
        paddingHorizontal: wp('2%'),
    },
    gridList: {
        paddingHorizontal: wp('2%'),
        alignItems: 'center',
    },
});

export default SectionRenderer;
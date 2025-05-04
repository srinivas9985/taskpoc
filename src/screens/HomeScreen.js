import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, StatusBar, Dimensions, Text, Image } from 'react-native';
import UserHeader from '../components/UserHeader';
import CategoryFilterBar from '../components/CategoryFilterBar';
import ProductCardFashion from '../components/ProductCardFashion';
import BottomNavBar from '../components/BottomNavBar';
import { products } from '../constants/dummyData';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// Import allServices from ServicesHomeScreen.js
const allServices = [
    {
        id: '1',
        title: 'House Cleaning',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        price: 25,
        providerName: 'Sarah Johnson',
        providerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
        id: '2',
        title: 'Plumbing Service',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        price: 45,
        providerName: 'Mike Thompson',
        providerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
];

const user = {
    name: 'Albert Stevano',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const filterMap = {
    all: () => true,
    dress: p => p.category.toLowerCase().includes('dress'),
    tshirt: p => p.category.toLowerCase().includes('t-shirt') || p.title.toLowerCase().includes('t-shirt'),
    other: p => !p.category.toLowerCase().includes('dress') && !p.category.toLowerCase().includes('t-shirt'),
};

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

function ServiceCard({ service }) {
    return (
        <View style={serviceCardStyles.card}>
            <Image source={{ uri: service.image }} style={serviceCardStyles.image} />
            <View style={serviceCardStyles.info}>
                <Text style={serviceCardStyles.title}>{service.title}</Text>
                <View style={serviceCardStyles.row}>
                    <Image source={{ uri: service.providerImage }} style={serviceCardStyles.avatar} />
                    <Text style={serviceCardStyles.provider}>{service.providerName}</Text>
                </View>
                <View style={serviceCardStyles.row}>
                    <Text style={serviceCardStyles.price}>${service.price}</Text>
                    <Text style={serviceCardStyles.rating}>⭐ {service.rating}</Text>
                </View>
            </View>
        </View>
    );
}

const serviceCardStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 14,
        marginBottom: hp('2%'),
        marginHorizontal: wp('4%'),
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },
    image: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        color: '#222',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 6,
    },
    provider: {
        color: '#888',
        fontSize: wp('3.2%'),
    },
    price: {
        fontWeight: 'bold',
        fontSize: wp('3.5%'),
        color: '#222',
        marginRight: 10,
    },
    rating: {
        color: '#FFD700',
        fontWeight: '600',
        fontSize: wp('3.2%'),
    },
});

export default function HomeScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('home');
    const [search, setSearch] = useState('');

    const filteredProducts = products
        .filter(p => p.category && (filterMap[selectedCategory] ? filterMap[selectedCategory](p) : true))
        .filter(p =>
            !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
        )
        .slice(0, 12)
        .map(p => ({
            ...p,
            image: p.thumbnail || (p.images && p.images[0]) || '',
            rating: p.rating || 5.0,
            price: p.price || 0,
        }));

    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <UserHeader user={user} onSearch={setSearch} onFilterPress={() => { }} />

            {activeTab === 'home' ? (
                <FlatList
                    ListHeaderComponent={
                        <>
                            <CategoryFilterBar selected={selectedCategory} onSelect={setSelectedCategory} />
                        </>
                    }
                    data={filteredProducts}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.row}
                    renderItem={({ item }) => (
                        <ProductCardFashion product={item} onPress={() => navigation.navigate('ProductDetails', { product: item })} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <FlatList
                    data={allServices}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.serviceListContent}
                    renderItem={({ item }) => <ServiceCard service={item} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listContent: {
        paddingBottom: 90,
        paddingTop: 0,
        paddingHorizontal: 0,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    serviceListContent: {
        paddingTop: hp('2%'),
        paddingBottom: 90,
    },
});

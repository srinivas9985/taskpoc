// src/screens/ShoppingHomeScreen.js
import React, { useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Dimensions,
    View,
    StatusBar,
    FlatList,
    SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SectionRenderer from '../constants/SectionRenderer';
import { homePageSections } from '../constants/contentTypes';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

// Create animated FlatList component
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function ShoppingHomeScreen({ navigation }) {
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
        }
    );

    const renderItem = ({ item }) => (
        <SectionRenderer
            section={item}
            navigation={navigation}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#7B3FE4" barStyle="light-content" />

            {/* Header */}
            <Header
                style={styles.header}
                onCartPress={() => navigation.navigate('Cart')}
                cartItemCount={2}
                hideCategories={true}
            />

            {/* Main Content */}
            <AnimatedFlatList
                data={homePageSections}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.contentContainer,
                    isTablet && styles.contentContainerTablet
                ]}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B3FE4',
    },
    header: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#F1F3F6',
    },
    contentContainer: {
        padding: 16,
    },
    contentContainerTablet: {
        padding: 24,
    },
});


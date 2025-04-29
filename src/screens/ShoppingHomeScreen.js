// src/screens/ShoppingHomeScreen.js
import React, { useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Dimensions,
    View,
    StatusBar,
} from 'react-native';
import Header from '../components/Header';
import BannerCarousel from '../components/BannerCarousel';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SectionRenderer from '../constants/SectionRenderer';
import { homePageSections } from '../constants/contentTypes';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;
const isSmallDevice = width < 375;

export default function ShoppingHomeScreen({ navigation }) {
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: true,
        }
    );

    return (
        <SafeAreaProvider style={styles.container}>
            <StatusBar backgroundColor="#7B3FE4" barStyle="light-content" />

            {/* Header */}
            <Header
                style={styles.header}
                onCartPress={() => navigation.navigate('Cart')}
                cartItemCount={2}
                hideCategories={true}
            />

            {/* Main Content */}
            <Animated.ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={handleScroll}
            >
                {/* <BannerCarousel /> */}

                {homePageSections.map((section, index) => (
                    <SectionRenderer
                        key={index}
                        section={section}
                        navigation={navigation}
                    />
                ))}

                <View style={{ height: hp('2%') }} />
            </Animated.ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F3F6',
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
});


import React, { useState } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../theme/typography';

const localImages = {
    l1: require('../assets/l1.png'),
    l2: require('../assets/l2.png'),
    l3: require('../assets/l3.png'),
    l4: require('../assets/l4.png'),
};

const paymentCard = {
    brand: 'visa',
    last4: '2143',
    icon: require('../assets/card.png'), // Add your card icon
};

export default function CartScreen({ navigation, route }) {
    // For demo, get cart items from params or use dummy
    const cartItems = route.params?.cartItems || [
        {
            id: '1',
            title: 'Smartphone X',
            subtitle: '128GB, Black',
            price: 999,
            image: 'l1',
            qty: 1,
        },
        {
            id: '2',
            title: 'Headphones Pro',
            subtitle: 'Wireless, White',
            price: 199,
            image: 'l2',
            qty: 2,
        },
    ];

    const [items, setItems] = useState(cartItems);

    // Quantity handlers
    const updateQty = (id, delta) => {
        setItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, qty: Math.max(1, item.qty + delta) }
                    : item
            )
        );
    };

    // Totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = 20;
    const total = subtotal + shipping;

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={wp('5%')} color="#222" />
                </TouchableOpacity>
                <View style={styles.headerHandle}>
                    <Text style={styles.headerText}>Cart</Text>
                </View>
                <TouchableOpacity style={styles.headerBtn}>
                    <Image style={styles.headerBtnImg} source={require('../assets/ma.png')} />
                    {/* <Icon name="bars" size={wp('5%')} color="#222" /> */}
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp('4%') }}
            >
                {/* Cart Items */}
                {items.map(item => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image
                            source={localImages[item.image]}
                            style={styles.cartItemImg}
                            resizeMode="cover"
                        />
                        <View style={{ flex: 1, marginLeft: wp('3%') }}>
                            <Text style={styles.cartItemTitle}>{item.title}</Text>
                            <Text style={styles.cartItemSubtitle}>{item.subtitle}</Text>
                            <Text style={styles.cartItemPrice}>${item.price}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.cartItemMenu}>
                                <Icon name="ellipsis-h" size={wp('5%')} color="#222" />
                            </TouchableOpacity>
                            <View style={styles.qtyCol}>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQty(item.id, -1)}
                                >
                                    <Text style={styles.qtyBtnText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.qtyNum}>{item.qty}</Text>
                                <TouchableOpacity
                                    style={styles.qtyBtn}
                                    onPress={() => updateQty(item.id, 1)}
                                >
                                    <Text style={styles.qtyBtnText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                ))}

                {/* Payment Method */}
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity style={styles.paymentCard}>
                    <Image source={paymentCard.icon} style={styles.paymentIcon} />
                    <Text style={styles.paymentText}>**** **** **** {paymentCard.last4}</Text>
                    <Icon name="chevron-down" size={wp('4%')} color="#222" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>

                {/* Summary */}
                <View style={styles.summaryRow}>
                    <View>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryLabelBold}>Total</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                        <Text style={styles.summaryValueBold}>${total.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>
            {/* Checkout Button */}
            <View style={styles.checkoutBar}>
                <TouchableOpacity style={styles.checkoutBtn}>
                    {/* <View style={styles.checkoutBtnHandle} />
                     */}
                    <Text style={styles.checkoutBtnText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    headerBtn: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    headerText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
    },
    headerBtnImg: {
        width: wp('5%'),
        height: wp('5%'),
        // borderRadius: wp('6%'),
        // backgroundColor: '#fff',
    },
    headerHandle: {
        width: wp('20%'),
        // height: 7,
        borderRadius: 4,
        // backgroundColor: '#222',
        opacity: 0.9,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: wp('4%'),
        marginHorizontal: wp('5%'),
        marginBottom: hp('2%'),
        padding: wp('3%'),
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    },
    cartItemImg: {
        width: wp('16%'),
        height: wp('16%'),
        borderRadius: wp('4%'),
        backgroundColor: '#e0e0e0',
    },
    cartItemTitle: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
        marginBottom: 2,
    },
    cartItemSubtitle: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('3.2%'),
        color: '#888',
        marginBottom: 2,
    },
    cartItemPrice: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('3.5%'),
        color: '#222',
    },
    qtyCol: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: wp('2%'),
        marginTop: hp('4%'),
    },
    qtyBtn: {
        width: wp('8%'),
        height: wp('8%'),
        borderRadius: wp('4%'),
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    qtyBtnText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('5%'),
        color: '#222',
    },
    qtyNum: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
        marginHorizontal: wp('2%'),
    },
    cartItemMenu: {
        marginLeft: wp('2%'),
    },
    sectionTitle: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4.2%'),
        color: '#222',
        marginLeft: wp('5%'),
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        borderRadius: wp('4%'),
        marginHorizontal: wp('5%'),
        padding: wp('3%'),
        marginBottom: hp('2%'),
    },
    paymentIcon: {
        width: wp('10%'),
        height: wp('7%'),
        borderRadius: 6,
        backgroundColor: '#e0e0e0',
        marginRight: wp('3%'),
    },
    paymentText: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('4%'),
        color: '#222',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    summaryLabel: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('3.7%'),
        color: '#222',
        marginBottom: 6,
    },
    summaryLabelBold: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
        marginTop: 4,
    },
    summaryValue: {
        fontFamily: fonts.openSansRegular,
        fontSize: wp('3.7%'),
        color: '#222',
        marginBottom: 6,
    },
    summaryValueBold: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#222',
        marginTop: 4,
    },
    checkoutBar: {
        backgroundColor: 'transparent',
        padding: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutBtn: {
        width: '100%',
        backgroundColor: '#222',
        borderRadius: 100,
        paddingVertical: hp('2.5%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutBtnText: {
        fontFamily: fonts.openSansBold,
        fontSize: wp('4%'),
        color: '#fff',
    },
    checkoutBtnHandle: {
        width: wp('10%'),
        height: 7,
        borderRadius: 4,
        backgroundColor: '#fff',
        opacity: 0.9,
    },
});


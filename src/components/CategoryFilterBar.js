import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const categories = [
    { key: 'all', label: 'All Items', icon: require('../assets/all.png') },
    { key: 'dress', label: 'Dress', icon: require('../assets/dress.png') },
    { key: 'tshirt', label: 'T-Shirt', icon: require('../assets/tsirt.png') },
    // { key: 'other', label: '', icon: '../assets/more.png' },
];

const CategoryFilterBar = ({ selected, onSelect }) => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.container}>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat.key}
                    style={[styles.btn, selected === cat.key && styles.activeBtn]}
                    onPress={() => onSelect(cat.key)}
                >
                    <Image style={{ height: 15, width: 15, marginRight: 4, tintColor: selected === cat.key ? '#fff' : '#222' }} source={cat.icon} />
                    {/* <Icon name={cat.icon} size={18} color={selected === cat.key ? '#fff' : '#222'} style={styles.icon} /> */}
                    <Text style={[styles.label, selected === cat.key && styles.activeLabel]}>{cat.label}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll: {
        marginTop: hp('2%'),
        marginBottom: hp('1%'),
    },
    container: {
        paddingHorizontal: wp('5%'),
        alignItems: 'center',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    activeBtn: {
        backgroundColor: '#222',
        borderColor: '#222',
    },
    icon: {
        marginRight: 6,
    },
    label: {
        fontSize: wp('3.5%'),
        color: '#222',
        fontWeight: '500',
    },
    activeLabel: {
        color: '#fff',
    },
});

export default CategoryFilterBar; 
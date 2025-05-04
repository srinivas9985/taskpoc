import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const UserHeader = ({ user, onSearch, onFilterPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View>
                    <Text style={styles.welcome}>Hello, Welcome <Text style={styles.wave}>👋</Text></Text>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
            </View>
            <View style={styles.searchRow}>
                <View style={styles.searchBox}>
                    <Icon name="search" size={20} color="#B0B0B0" style={{ marginLeft: 10 }} />
                    <TextInput
                        placeholder="Search clothes..."
                        placeholderTextColor="#B0B0B0"
                        style={styles.input}
                        onChangeText={onSearch}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
                    <Image style={{ height: 24, width: 24 }} source={require('../assets/filter.png')} />

                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('5%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('1%'),
        backgroundColor: '#fff',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('2%'),
    },
    welcome: {
        color: '#888',
        fontSize: wp('3.5%'),
    },
    wave: {
        fontSize: wp('3.5%'),
    },
    name: {
        fontWeight: 'bold',
        fontSize: wp('5%'),
        color: '#222',
    },
    avatar: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        borderWidth: 2,
        borderColor: '#eee',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        height: hp('6%'),
        borderWidth: 1,
        borderColor: '#CAC9C9',
    },
    input: {
        flex: 1,
        fontSize: wp('4%'),
        paddingHorizontal: 10,
        color: '#222',
    },
    filterBtn: {
        marginLeft: 12,
        backgroundColor: '#222',
        borderRadius: 12,
        width: hp('6%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UserHeader; 
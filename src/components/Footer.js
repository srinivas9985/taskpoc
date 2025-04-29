import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Footer({ contactInfo, socialLinks }) {
    const handleSocialLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.footerContent}>
                <View style={styles.footerSection}>
                    <Text style={styles.footerTitle}>Contact Us</Text>
                    <Text style={styles.footerText}>{contactInfo.address}</Text>
                    <Text style={styles.footerText}>{contactInfo.phone}</Text>
                    <Text style={styles.footerText}>{contactInfo.email}</Text>
                </View>
                <View style={styles.footerSection}>
                    <Text style={styles.footerTitle}>Follow Us</Text>
                    <View style={styles.socialLinks}>
                        {socialLinks.map((link) => (
                            <TouchableOpacity
                                key={link.id}
                                style={styles.socialLink}
                                onPress={() => handleSocialLinkPress(link.url)}
                            >
                                <Text style={styles.socialLinkText}>{link.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.footerBottom}>
                <Text style={styles.footerCopyright}>
                    © {new Date().getFullYear()} {contactInfo.companyName}. All rights reserved.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        marginTop: hp('8%'),
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('4%'),
    },
    footerContent: {
        flexDirection: Dimensions.get('window').width >= 768 ? 'row' : 'column',
        justifyContent: 'space-between',
        marginBottom: hp('4%'),
    },
    footerSection: {
        flex: 1,
        marginBottom: hp('4%'),
    },
    footerTitle: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('3%') : wp('4%'),
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: hp('2%'),
    },
    footerText: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2.5%') : wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: hp('1%'),
    },
    socialLinks: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    socialLink: {
        marginRight: wp('2%'),
        marginBottom: hp('1%'),
    },
    socialLinkText: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2.5%') : wp('3.5%'),
        color: 'rgba(255, 255, 255, 0.7)',
        textDecorationLine: 'underline',
    },
    footerBottom: {
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        paddingTop: hp('2%'),
    },
    footerCopyright: {
        fontSize: Dimensions.get('window').width >= 768 ? wp('2%') : wp('3%'),
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
    },
}); 
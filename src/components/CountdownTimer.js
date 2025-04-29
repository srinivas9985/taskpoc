// src/components/CountdownTimer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CountdownTimer() {
    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>Deal ends in: 00:23:45</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#FFD700', padding: 10, alignItems: 'center', marginVertical: 10 },
    timerText: { fontWeight: 'bold' },
});

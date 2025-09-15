import React from 'react';
import { View, Text } from 'react-native';
import { homeStyles as styles } from '../styles/homeStyles';

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo à tela Home 🎉</Text>
        </View>
    );
};

export default HomeScreen;

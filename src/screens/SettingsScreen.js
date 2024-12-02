import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from '../components/Header';

const SettingsScreen = ({navigation}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View
      style={[
        styles.screen,
        isDarkTheme ? styles.darkScreen : styles.lightScreen,
      ]}>
      <Text
        style={[styles.text, isDarkTheme ? styles.darkText : styles.lightText]}>
        Bu, ayarlar sayfası!
      </Text>
      <Button
        title="Tema Değiştir"
        onPress={toggleTheme} // Tema değiştirme fonksiyonunu tetikliyoruz
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightScreen: {
    backgroundColor: '#f0f8ff',
  },
  darkScreen: {
    backgroundColor: '#333333',
  },
  text: {
    fontSize: 20,
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
});

export default SettingsScreen;

// screens/HomeScreen.js
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title="Başla" onPress={() => navigation.navigate('Start')} />
      <Button
        title="Zikirlerim"
        onPress={() => navigation.navigate('Zikirlerim')}
      />
      <Button
        title="Ayarlar"
        onPress={() => navigation.navigate('Settings')} // Ayarlar ekranına yönlendir
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;

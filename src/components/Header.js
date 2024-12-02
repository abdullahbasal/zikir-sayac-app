import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Header = ({title, onBack, onSettings, onThemeToggle}) => (
  <View style={styles.header}>
    {onBack && (
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <Text style={styles.headerText}>Geri Gel</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.headerActions}>
      <TouchableOpacity onPress={onThemeToggle} style={styles.headerButton}>
        <Text style={styles.headerText}>Light/Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettings} style={styles.headerButton}>
        <Text style={styles.headerText}>Ayarlar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
    backgroundColor: '#4CAF50',
  },
});

export default Header;

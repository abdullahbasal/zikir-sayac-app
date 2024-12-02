import React, {useState} from 'react';
import {View, Text, Button, Alert, StyleSheet} from 'react-native';

const CounterScreen = ({route, navigation}) => {
  const {goal, isGoalSet, title, description} = route.params; // Başlık ve açıklama bilgileri de eklendi
  const [counter, setCounter] = useState(isGoalSet ? goal : 0);

  const handlePress = () => {
    if (isGoalSet) {
      if (counter === 1) {
        Alert.alert('Hedefe Ulaşıldı', 'Tebrikler, hedefinize ulaştınız!', [
          {
            text: 'Tekrarla',
            onPress: () => setCounter(goal),
          },
          {
            text: 'Ana Sayfaya Dön',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
        setCounter(goal);
      } else if (counter > 1) {
        setCounter(counter - 1);
      }
    } else {
      setCounter(counter + 1);
    }
  };

  return (
    <View style={styles.container}>
      {title && description && (
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
      <Text style={styles.text}>
        {isGoalSet ? `Hedef: ${goal}` : 'Hedef Girilmedi'}
      </Text>
      <Text style={styles.counter}>Sayaç: {counter}</Text>
      <Button title="Bastıkça Azalt (Hedef Girildi)" onPress={handlePress} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  counter: {
    fontSize: 40,
    marginBottom: 30,
  },
});

export default CounterScreen;

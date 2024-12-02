import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

const StartScreen = ({navigation}) => {
  const [goal, setGoal] = useState('');
  const [isGoalSet, setIsGoalSet] = useState(false);

  const handleStartWithGoal = () => {
    if (goal) {
      navigation.navigate('Counter', {goal: parseInt(goal), isGoalSet: true});
    } else {
      alert('Lütfen bir hedef girin!');
    }
  };

  const handleStartWithoutGoal = () => {
    navigation.navigate('Counter', {goal: 0, isGoalSet: false});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hedef girin:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Hedef sayıyı girin"
        value={goal}
        onChangeText={setGoal}
      />
      <Button title="Hedef Gir" onPress={handleStartWithGoal} />
      <Button
        title="Hedef Girmeden Devam Et"
        onPress={handleStartWithoutGoal}
      />
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
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default StartScreen;

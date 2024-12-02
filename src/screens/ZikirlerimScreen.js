import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; // Toast'ı import edin

const ZikirlerimScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [zikirler, setZikirler] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Zikirleri AsyncStorage'den al
  const loadZikirler = async () => {
    try {
      const storedZikirler = await AsyncStorage.getItem('zikirler');
      if (storedZikirler) {
        setZikirler(JSON.parse(storedZikirler)); // Veriyi olduğu gibi al
      }
    } catch (error) {
      console.error('Zikirler yüklenemedi:', error);
    }
  };

  // Zikirleri AsyncStorage'e kaydet
  const saveZikirler = async newZikirler => {
    try {
      await AsyncStorage.setItem('zikirler', JSON.stringify(newZikirler));
    } catch (error) {
      console.error('Zikirler kaydedilemedi:', error);
    }
  };

  // Yeni zikir ekleme
  const handleAddZikir = () => {
    if (title && description && goal) {
      // Hedefin boş olmaması kontrolü
      const newZikir = {
        id: Math.random().toString(), // Her zikir için benzersiz bir id
        title,
        description,
        goal: parseInt(goal), // Hedefi bir sayıya dönüştür
      };
      const updatedZikirler = [...zikirler, newZikir];
      setZikirler(updatedZikirler);
      saveZikirler(updatedZikirler);

      // Başarı mesajı
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Zikir Eklendi!',
        text2: 'Yeni zikir başarıyla eklendi.',
      });

      setTitle('');
      setDescription('');
      setGoal('');
    } else {
      Alert.alert(
        'Eksik Bilgi',
        'Başlık, açıklama ve hedef girmeniz gerekmektedir.',
      );
    }
  };

  // Zikir silme
  const handleDeleteZikir = id => {
    const updatedZikirler = zikirler.filter(zikir => zikir.id !== id);
    setZikirler(updatedZikirler);
    saveZikirler(updatedZikirler);

    // Silme sonrası başarı mesajı
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Zikir Silindi!',
      text2: 'Zikir başarıyla silindi.',
    });
  };

  // Zikir düzenleme
  const handleEditZikir = id => {
    const zikir = zikirler.find(z => z.id === id);
    setTitle(zikir.title);
    setDescription(zikir.description);
    setGoal(zikir.goal ? zikir.goal.toString() : '');
    setEditingId(id);
  };

  // Zikir düzenleme
  const handleUpdateZikir = () => {
    if (title && description && goal) {
      const updatedZikirler = zikirler.map(zikir =>
        zikir.id === editingId
          ? {...zikir, title, description, goal: parseInt(goal)}
          : zikir,
      );

      setZikirler(updatedZikirler);
      saveZikirler(updatedZikirler);

      // Başarı mesajı
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Zikir Güncellendi!',
        text2: 'Zikir başarıyla güncellendi.',
      });

      // Formu sıfırlama
      setTitle('');
      setDescription('');
      setGoal('');
      setEditingId(null);
    } else {
      Alert.alert(
        'Eksik Bilgi',
        'Başlık, açıklama ve hedef girmeniz gerekmektedir.',
      );
    }
  };
  // Zikir başlama
  const handleStartZikir = id => {
    const zikir = zikirler.find(z => z.id === id);
    if (zikir) {
      navigation.navigate('Counter', {
        goal: zikir.goal || 0,
        isGoalSet: Boolean(zikir.goal),
        title: zikir.title,
        description: zikir.description,
      });
    }
  };

  useEffect(() => {
    loadZikirler();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Başlık"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Hedef (zorunlu)"
        keyboardType="numeric"
        value={goal}
        onChangeText={setGoal}
      />
      {editingId ? (
        <Button title="Zikiri Güncelle" onPress={handleUpdateZikir} />
      ) : (
        <Button title="Zikir Ekle" onPress={handleAddZikir} />
      )}

      <FlatList
        data={zikirler}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.zikirItem}>
            <Text style={styles.zikirTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            {item.goal && <Text>Hedef: {item.goal}</Text>}
            <View style={styles.buttons}>
              <Button title="Başla" onPress={() => handleStartZikir(item.id)} />
              <Button
                title="Düzenle"
                onPress={() => handleEditZikir(item.id)}
              />
              <Button title="Sil" onPress={() => handleDeleteZikir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  zikirItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  zikirTitle: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ZikirlerimScreen;

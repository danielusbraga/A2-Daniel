import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adicional = ({ navigation }) => {
  const [adds, setAdds] = useState([]);

  useEffect(() => {
    loadAdds();
  }, []);

  const loadAdds = async () => {
    try {
      const storedAdds = await AsyncStorage.getItem('adds');
      if (storedAdds) {
        const addsData = JSON.parse(storedAdds);

      }
    } catch (error) {
      console.error('Erro ao carregar Formulários:', error);
    }
  };

  
  const saveAdd = async (newAdd) => {
    try {
      const updatedAdds = [...adds, newAdd];
      setAdds(updatedAdds);
      await AsyncStorage.setItem('adds', JSON.stringify(updatedAdds));
    } catch (error) {
      console.error('Erro ao salvar addulário:', error);
    }
  };

  const editAdd = (index) => {
    
    const addToEdit = adds[index];
  
    
    navigation.navigate('CadastroAdi', {
      addToEdit,
      onSave: (editedAdd) => handleEditAdd(index, editedAdd),
    });
  };
  
  

const handleEditAdd = async (index, editedAdd) => {
    try {
      const updatedAdds = [...adds];
      updatedAdds[index] = editedAdd; 
  
      setAdds(updatedAdds);
      await AsyncStorage.setItem('adds', JSON.stringify(updatedAdds)); 
    } catch (error) {
      console.error('Erro ao editar formulário:', error);
    }
  };
  
  

  const addNewAdd = () => {   
    navigation.navigate('CadastroAdi', { onSave: saveAdd });
  };

  const deleteAdd = async (index) => {
    try {
      const updatedAdds = adds.filter((_, i) => i !== index);
      setAdds(updatedAdds);
      await AsyncStorage.setItem('adds', JSON.stringify(updatedAdds));
    } catch (error) {
      console.error('Erro ao excluir Formulário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Formulários:</Text>
      <FlatList
        data={adds}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.addContainer}>
            <Text>{item.cpf}</Text>
            <Text>{item.endereco}</Text>
            <Text>{item.telefone}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => editAdd(index)} />
              <Button title="Excluir" onPress={() => deleteAdd(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Novo Formulário" onPress={addNewAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  addContainer: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Adicional;

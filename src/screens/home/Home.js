import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const storedForms = await AsyncStorage.getItem('forms');
      if (storedForms) {
        const formsData = JSON.parse(storedForms);


        const maskedForms = formsData.map((form) => ({
          ...form,
          senha: maskPassword(form.senha),
        }));

        setForms(maskedForms);
      }
    } catch (error) {
      console.error('Erro ao carregar formulários:', error);
    }
  };

  const maskPassword = (password) => (password ? '*'.repeat(password.length) : '');

  const saveForm = async (newForm) => {
    try {
      const updatedForms = [...forms, newForm];
      setForms(updatedForms);
      await AsyncStorage.setItem('forms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
    }
  };

  const editForm = (index) => {
    
    const formToEdit = forms[index];

    
    navigation.navigate('Cadastro', {
      formToEdit,
      onSave: (editedForm) => handleEditForm(index, editedForm),
    });
  };

  const handleEditForm = async (index, editedForm) => {
    try {
      
      const updatedForms = [...forms];

      
      updatedForms[index] = editedForm;

      
      setForms(updatedForms);
      await AsyncStorage.setItem('forms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Erro ao editar formulário:', error);
    }
  };

  const addNewForm = () => {
    navigation.navigate('Cadastro', { onSave: saveForm });
  };

  const deleteForm = async (index) => {
    try {
      const updatedForms = forms.filter((_, i) => i !== index);
      setForms(updatedForms);
      await AsyncStorage.setItem('forms', JSON.stringify(updatedForms));
    } catch (error) {
      console.error('Erro ao excluir formulário:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Formulários:</Text>
      <FlatList
        data={forms}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.formContainer}>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <Text>{item.senha}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => editForm(index)} />
              <Button title="Excluir" onPress={() => deleteForm(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Novo Formulário" onPress={addNewForm} />
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
  formContainer: {
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

export default Home;






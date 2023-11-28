import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RacaoHome = ({ navigation }) => {
  const [racoes, setRacoes] = useState([]);

  useEffect(() => {
    loadRacoes();
  }, []);

  const loadRacoes = async () => {
    try {
      const storedRacoes = await AsyncStorage.getItem('racoes');
      if (storedRacoes) {
        const racoesData = JSON.parse(storedRacoes);
        setRacoes(racoesData);
      }
    } catch (error) {
      console.error('Erro ao carregar rações:', error);
    }
  };

  const saveRacao = async (newRacao) => {
    try {
      const updatedRacoes = [...racoes, newRacao];
      setRacoes(updatedRacoes);
      await AsyncStorage.setItem('racoes', JSON.stringify(updatedRacoes));
    } catch (error) {
      console.error('Erro ao salvar ração:', error);
    }
  };

  const editRacao = (index) => {
    const racaoToEdit = racoes[index];

    navigation.navigate('CadastroRacao', {
      racaoToEdit,
      onSave: (editedRacao) => handleEditRacao(index, editedRacao),
    });
  };

  const handleEditRacao = async (index, editedRacao) => {
    try {
      const updatedRacoes = [...racoes];
      updatedRacoes[index] = editedRacao;
      setRacoes(updatedRacoes);
      await AsyncStorage.setItem('racoes', JSON.stringify(updatedRacoes));
    } catch (error) {
      console.error('Erro ao editar ração:', error);
    }
  };

  const addNewRacao = () => {
    navigation.navigate('CadastroRacao', { onSave: saveRacao });
  };

  const deleteRacao = async (index) => {
    try {
      const updatedRacoes = racoes.filter((_, i) => i !== index);
      setRacoes(updatedRacoes);
      await AsyncStorage.setItem('racoes', JSON.stringify(updatedRacoes));
    } catch (error) {
      console.error('Erro ao excluir ração:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista de Rações:</Text>
      <FlatList
        data={racoes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.racaoContainer}>
            <Text>Tipo: {item.tipo}</Text>
            <Text>Marca: {item.marca}</Text>
            <Text>Peso: {item.peso}</Text>
            
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={() => editRacao(index)} />
              <Button title="Excluir" onPress={() => deleteRacao(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Nova Ração" onPress={addNewRacao} />
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
  racaoContainer: {
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

export default RacaoHome;

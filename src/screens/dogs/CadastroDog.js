import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Api from '../../services/Api';
import { Picker } from '@react-native-picker/picker';

const CadastroDog = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, register, formState: { errors } } = useForm();
  const { onSave, formToEdit } = route.params || {};
  const [racas, setRacas] = useState([]);
  const [racaSelecionada, setRacaSelecionada] = useState('');
  const [idadeSelecionada, setIdadeSelecionada] = useState('');
  const [sexoSelecionada, setSexoSelecionada] = useState('');
  const [origemSelecionada, setOrigemSelecionada] = useState('');

  useEffect(() => {
    Api.get('/breeds')
      .then(response => setRacas(response.data))
      .catch(error => console.error('Erro ao obter raças:', error));

    if (formToEdit) {
      Object.keys(formToEdit).forEach((fieldName) => {
        setValue(fieldName, formToEdit[fieldName]);
      });
    }
  }, [formToEdit, setValue]);

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);
    if (onSave) {
      console.log('Saving Form...');
      onSave(formData);
      console.log('Form Saved');
      onSave(formData);
      if (formToEdit) {
        navigation.setOptions({ title: 'Formulário Editado com Sucesso' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.goBack();
      } else {
        navigation.setOptions({ title: 'Novo Formulário Criado com Sucesso' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.navigate('DogHome');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro de Cachorros</Text>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={racaSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setRacaSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Raça" value="" />
              {racas.map(breed => (
                <Picker.Item key={breed.id} label={breed.name} value={breed.name} />
              ))}
            </Picker>
          )}
          name="raca"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.raca && <Text style={styles.errorText}>{errors.raca.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={idadeSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setIdadeSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Idade" value="" />
              <Picker.Item label="3 meses" value="3 meses" />
              <Picker.Item label="6 meses" value="6 meses" />
              <Picker.Item label="1 ano" value="1 ano" />
            </Picker>
          )}
          name="idade"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.idade && <Text style={styles.errorText}>{errors.idade.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={sexoSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setSexoSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Sexo" value="" />
              <Picker.Item label="masculino" value="masculino" />
              <Picker.Item label="feminino" value="feminino" />
            </Picker>
          )}
          name="sexo"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.sexo && <Text style={styles.errorText}>{errors.sexo.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={origemSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setOrigemSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Origem" value="" />
              <Picker.Item label="resgatado" value="resgatado" />
              <Picker.Item label="doado" value="doado" />
            </Picker>
          )}
          name="origem"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.origem && <Text style={styles.errorText}>{errors.origem.message}</Text>}

        
        
        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CadastroDog;




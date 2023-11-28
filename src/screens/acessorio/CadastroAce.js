import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const CadastroAce = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const { onSave, formToEdit } = route.params || {};
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('');
  const [corSelecionada, setCorSelecionada] = useState('');

  useEffect(() => {
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
        navigation.navigate('AceHome');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CadastroAce</Text>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={tipoSelecionado}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setTipoSelecionado(itemValue);
              }}
            >
              <Picker.Item label="Selecione o Tipo" value="" />
              <Picker.Item label="Coleira" value="coleira" />
              <Picker.Item label="Camisa" value="camisa" />
              <Picker.Item label="Chapeu" value="chapeu" />
            </Picker>
          )}
          name="tipo"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.tipo && <Text style={styles.errorText}>{errors.tipo.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={tamanhoSelecionado}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setTamanhoSelecionado(itemValue);
              }}
            >
              <Picker.Item label="Selecione o Tamanho" value="" />
              <Picker.Item label="Pequeno" value="pequeno" />
              <Picker.Item label="Médio" value="medio" />
              <Picker.Item label="Grande" value="grande" />
            </Picker>
          )}
          name="tamanho"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.tamanho && <Text style={styles.errorText}>{errors.tamanho.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={corSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setCorSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Cor" value="" />
              <Picker.Item label="Vermelho" value="vermelho" />
              <Picker.Item label="Verde" value="verde" />
              <Picker.Item label="Azul" value="azul" />
            </Picker>
          )}
          name="cor"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.cor && <Text style={styles.errorText}>{errors.cor.message}</Text>}

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

export default CadastroAce;



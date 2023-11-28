import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

const CadastroRacao = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const { onSave, racaoToEdit } = route.params || {};
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [pesoSelecionado, setPesoSelecionado] = useState('');

  useEffect(() => {
    if (racaoToEdit) {
      Object.keys(racaoToEdit).forEach((fieldName) => {
        setValue(fieldName, racaoToEdit[fieldName]);
      });
    }
  }, [racaoToEdit, setValue]);

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);
    if (onSave) {
      console.log('Saving Racao...');
      onSave(formData);
      console.log('Racao Saved');
      onSave(formData);
      if (racaoToEdit) {
        navigation.setOptions({ title: 'Ração Editada com Sucesso' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.goBack();
      } else {
        navigation.setOptions({ title: 'Nova Ração Criada com Sucesso' });
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigation.navigate('RacaoHome');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro de Rações</Text>

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
              <Picker.Item label="Ração Seca" value="racao_seca" />
              <Picker.Item label="Ração Úmida" value="racao_umida" />
              <Picker.Item label="Petisco" value="petisco" />
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
              selectedValue={marcaSelecionada}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setMarcaSelecionada(itemValue);
              }}
            >
              <Picker.Item label="Selecione a Marca" value="" />
              <Picker.Item label="Royal Canin" value="royal_canin" />
              <Picker.Item label="Pedigree" value="pedigree" />
              <Picker.Item label="Hills" value="hills" />
            </Picker>
          )}
          name="marca"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.marca && <Text style={styles.errorText}>{errors.marca.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={styles.input}
              selectedValue={pesoSelecionado}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                setPesoSelecionado(itemValue);
              }}
            >
              <Picker.Item label="Selecione o Peso" value="" />
              <Picker.Item label="1kg" value="1kg" />
              <Picker.Item label="2kg" value="2kg" />
              <Picker.Item label="5kg" value="5kg" />
            </Picker>
          )}
          name="peso"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.peso && <Text style={styles.errorText}>{errors.peso.message}</Text>}

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

export default CadastroRacao;


import React, { useEffect } from 'react';
import { TextInput, View, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text'

const CadastroAdi = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const { onSave, formToEdit } = route.params || {};

  const onSubmit = (formData) => {
    if (onSave) {
      onSave(formData);
    }
    navigation.navigate('Adicional');
  };

  useEffect(() => {
    if (formToEdit) {
      Object.keys(formToEdit).forEach((fieldName) => {
        setValue(fieldName, formToEdit[fieldName]);
      });
    }
  }, [formToEdit]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro de Adicionais</Text>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputMask
              style={styles.input}
              placeholder="CPF"
              type={'cpf'}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="cpf"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="endereco"
          rules={{ required: 'Campo obrigatório' }}
        />

        {errors.endereco && <Text style={styles.errorText}>{errors.endereco.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputMask
              style={styles.input}
              placeholder="Telefone"
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="telefone"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.telefone && <Text style={styles.errorText}>{errors.telefone.message}</Text>}

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

export default CadastroAdi;



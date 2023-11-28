import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';

const Cadastro = ({ navigation, route }) => {
  const { control, handleSubmit, setValue, register, formState: { errors } } = useForm();
  const { onSave, formToEdit } = route.params || {};

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
        navigation.navigate('Home');
      }
    }
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
      <Text style={styles.heading}>Cadastro de Alunos</Text>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value} 
            />
          )}
          name="nome"
          rules={{ required: 'Campo obrigatório' }}
        />
        {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
          name="email"
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Endereço de e-mail inválido',
            },
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              secureTextEntry
            />
          )}
          name="senha"
          rules={{
            required: 'Campo obrigatório',
            minLength: {
              value: 6,
              message: 'A senha deve ter pelo menos 6 caracteres',
            },
          }}
        />

        {errors.senha && <Text style={styles.errorText}>{errors.senha.message}</Text>}

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

export default Cadastro;










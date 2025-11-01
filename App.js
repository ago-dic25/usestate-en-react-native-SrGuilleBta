import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {

const [contador, setContador] = useState (0);
const [texto, setTexto] = useState ('');

const limpiarTodo = () => {
  setTexto('');
  setContador(0);
};

const obtenerEmoji = () => {
  const longitud = texto.length;
  if (longitud === 0) return '👋';
  if (longitud < 3) return '😊';
  if (longitud < 6) return '😄';
  if (longitud < 10) return '🎉';
  return '🔥';
};

  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 30, marginBottom: 20}}>
        {texto ? `Hola, ${texto}` : 'Ingresa tu nombre'} {obtenerEmoji()}
      </Text>
      
      <Text style={{color: 'white', fontSize: 20, marginBottom: 20}}>
        Has hecho click: {contador} veces
      </Text>
      
      <Text style={{color: 'white', fontSize: 16, marginBottom: 10}}>
        Caracteres: {texto.length}
      </Text>
      
      <TextInput 
        style={styles.textInput}
        placeholder='Ingresa un nombre'
        placeholderTextColor="#999"
        value={texto}
        onChangeText={setTexto}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Aumentar contador" 
          onPress={() => setContador(contador + 1)} 
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Limpiar" 
          onPress={limpiarTodo}
          color="#ff4444"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    color: 'white', 
    marginBottom: 20, 
    width: 200, 
    textAlign: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  buttonSpacer: {
    width: 10,
  }
});
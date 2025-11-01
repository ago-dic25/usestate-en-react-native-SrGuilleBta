import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [contador, setContador] = useState(0);
  const [texto, setTexto] = useState('');
  const [nombres, setNombres] = useState([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState('');

  const limpiarTodo = () => {
    setTexto('');
    setContador(0);
    setNombreSeleccionado('');
  };

  const agregarNombre = () => {
    if (texto.trim() !== '') {
      setNombres([...nombres, { id: Date.now().toString(), nombre: texto }]);
      setTexto('');
    }
  };

  const eliminarNombre = (id) => {
    setNombres(nombres.filter(nombre => nombre.id !== id));
    if (nombreSeleccionado && nombres.find(n => n.id === id)?.nombre === nombreSeleccionado) {
      setNombreSeleccionado('');
    }
  };

  const eliminarTodosLosNombres = () => {
    setNombres([]);
    setNombreSeleccionado('');
  };

  const seleccionarNombre = (nombre) => {
    setNombreSeleccionado(nombre);
    setTexto(nombre);
  };

  const obtenerEmoji = () => {
    const longitud = texto.length;
    if (longitud === 0) return '👋';
    if (longitud < 3) return '😊';
    if (longitud < 6) return '😄';
    if (longitud < 10) return '🎉';
    return '🔥';
  };

  const renderItem = ({ item }) => (
    <View style={styles.nombreItem}>
      <TouchableOpacity 
        style={[
          styles.nombreTextoContainer,
          nombreSeleccionado === item.nombre && styles.nombreSeleccionado
        ]}
        onPress={() => seleccionarNombre(item.nombre)}
      >
        <Text style={styles.nombreTexto}>{item.nombre}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.eliminarBtn}
        onPress={() => eliminarNombre(item.id)}
      >
        <Text style={styles.eliminarTexto}>×</Text>
      </TouchableOpacity>
    </View>
  );

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

      <Text style={{color: 'white', fontSize: 16, marginBottom: 10}}>
        Nombres guardados: {nombres.length}
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

      <View style={styles.buttonContainer}>
        <Button 
          title="Agregar nombre" 
          onPress={agregarNombre}
          color="#4CAF50"
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Eliminar todos" 
          onPress={eliminarTodosLosNombres}
          color="#FF9800"
        />
      </View>

      {nombres.length > 0 && (
        <View style={styles.listaContainer}>
          <Text style={styles.listaTitulo}>Nombres guardados:</Text>
          <FlatList
            data={nombres}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.lista}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    marginBottom: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  listaContainer: {
    width: '100%',
    maxHeight: 200,
    marginTop: 20,
  },
  listaTitulo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  lista: {
    width: '100%',
  },
  nombreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 2,
    borderRadius: 5,
  },
  nombreTextoContainer: {
    flex: 1,
    padding: 5,
  },
  nombreSeleccionado: {
    backgroundColor: '#555',
    borderRadius: 3,
  },
  nombreTexto: {
    color: 'white',
    fontSize: 16,
  },
  eliminarBtn: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eliminarTexto: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
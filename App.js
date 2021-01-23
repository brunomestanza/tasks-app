import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){
  const [ task, setTask ] = useState([]);  
  const [ insert, setInsert ] = useState(false);
  const [ input, setInput ] = useState('');

  useEffect(() => {
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@task');
      if(taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }
    loadTasks();
  }, []);

  useEffect(() =>{
    async function saveTask(){
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }
    saveTask();
  },[task])

  function handleAdd(){
    if(input === '') return;
    const data={
      key: input,
      task: input,
    }
    setTask([...task, data]);
    setInsert(false);
    setInput('');
  }

  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  });

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171D31' barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
      <FlatList 
      marginHorizontal={10} 
      showsHorizontalScrollIndicator={false}
      data={task} 
      keyExtractor={(item) => String(item.key)}
      renderItem={({item}) => <TaskList data={item} handleDelete={handleDelete} />}
      />
      <Modal animationType="slide" transparent={false} visible={insert}>
            <SafeAreaView style={styles.modal}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setInsert(false)}>
                  <Ionicons style={{marginLeft: 5, marginRight: 5,}} name="md-arrow-back" size={40} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Nova Tarefa</Text>
              </View>
              <Animatable.View animation="fadeInUp" useNativeDriver style={styles.modalBody}>
                <TextInput 
                multiline={true} 
                placeholderTextColor="#747474"                
                placeholder="O que precisa fazer hoje?"
                style={styles.input} 
                value={input} 
                onChangeText={(item) => setInput(item)}
                />
                <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
                  <Text style={styles.handleAddText}>Cadastrar</Text>
                </TouchableOpacity>
              </Animatable.View>            
            </SafeAreaView>
        </Modal>
      <AnimatedButton style={styles.button} useNativeDriver animation="bounceInUp" duration={1500} onPress={() => setInsert(true)} > 
        <Ionicons name="ios-add" size={35} color="#FFFFFF" />
      </AnimatedButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#171D31',
  }, 
  content:{

  },
  title:{
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  button:{
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: "#0094FF",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  },
  modal:{
    flex: 1,
    backgroundColor: '#171D31',
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 23,
    color: '#FFFFFF',
  },
  modalBody:{
    marginTop: 15,    
  },
  input:{
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000000',
    borderRadius: 5,
  },
  handleAdd:{
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  handleAddText:{
    fontSize: 20,
  }
});
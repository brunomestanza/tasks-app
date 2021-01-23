import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import * as Animatable from 'react-native-animatable';

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){
  const [ insert, setInsert ] = useState(false);
  const [ task, setTask ] = useState([{key: 1, task: 'Programar'}, {key: 2, task: 'Estudar'}, {key: 3, task: 'Amar a Clarinha'}]);  

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171D31' barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
      <FlatList marginHorizontal={10} showsHorizontalScrollIndicator={false} data={task} keyExtractor={(item) => String(item.key)} renderItem={({item}) => <TaskList data={item} />}  />
      <Modal animationType="slide" transparent={false} visible={insert}>
            <SafeAreaView>
                <Text>Modal Text</Text>
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
  }  
});
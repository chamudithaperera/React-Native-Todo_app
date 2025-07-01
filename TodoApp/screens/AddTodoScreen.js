import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getTasks, storeTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function AddTodoScreen({ navigation }) {
  const [text, setText] = useState('');

  const handleAdd = async () => {
    if (!text.trim()) {
      Alert.alert("Empty Task", "Please enter a task.");
      return;
    }

    const currentTasks = await getTasks();
    const newTask = { id: uuidv4(), text, completed: false };
    const updatedTasks = [...currentTasks, newTask];
    await storeTasks(updatedTasks);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Todo" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import { getTasks, storeTasks } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export default function AddTodoScreen({ navigation }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priorityValue, setPriorityValue] = useState(1);

  const getPriorityLabel = () => {
    if (priorityValue < 1.5) return 'Low';
    if (priorityValue < 2.5) return 'Medium';
    return 'High';
  };

  const handleAdd = async () => {
    if (!text.trim()) {
      Alert.alert('Empty Task', 'Please enter a task.');
      return;
    }

    const currentTasks = await getTasks();
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      category,
      priority: getPriorityLabel(),
    };
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

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => setCategory(value)}
        style={styles.picker}
      >
        <Picker.Item label="Health" value="Health" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Education" value="Education" />
        <Picker.Item label="Personal" value="Personal" />
      </Picker>

      <Text style={styles.label}>Priority: {getPriorityLabel()}</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={3}
        step={1}
        value={priorityValue}
        onValueChange={setPriorityValue}
        minimumTrackTintColor="#3f51b5"
        maximumTrackTintColor="#ccc"
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
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
});
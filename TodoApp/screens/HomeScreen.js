import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import TaskCard from '../components/TaskCard';
import { getTasks, storeTasks } from '../utils/storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) loadTasks();
  }, [isFocused]);

  const loadTasks = async () => {
    const saved = await getTasks();
    setTasks(saved);
  };

  const toggleTask = async (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await storeTasks(updated);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onToggle={toggleTask} />
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTodo')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
      <Button title="Clear All Tasks" color="red" onPress={async () => {
        await storeTasks([]);
        setTasks([]);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3f51b5',
    borderRadius: 50,
    padding: 16,
    elevation: 5,
  },
});

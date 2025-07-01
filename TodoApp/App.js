import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
import { globalStyles } from './styles/global';
import { getTasks, storeTasks } from './utils/storage';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const saved = await getTasks();
      setTasks(saved);
    };
    load();
  }, []);

  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: uuidv4(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={globalStyles.container}>
      <Header />
      <TaskInput onAdd={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </View>
  );
}

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskCard({ task, onToggle }) {
  return (
    <TouchableOpacity onPress={() => onToggle(task.id)} style={styles.card}>
      <Text style={[styles.text, task.completed && styles.completed]}>
        {task.text}
      </Text>
      <Text style={styles.meta}>
        📁 {task.category} | ⚡ {task.priority}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fdfdfd',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  meta: {
    marginTop: 6,
    fontSize: 13,
    color: '#666',
  },
});
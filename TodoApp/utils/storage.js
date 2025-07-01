import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks:', e);
  }
};

export const getTasks = async () => {
  try {
    const json = await AsyncStorage.getItem('tasks');
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
};

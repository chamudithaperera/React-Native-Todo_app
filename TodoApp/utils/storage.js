import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save:', e);
  }
};

export const getTasks = async () => {
  try {
    const json = await AsyncStorage.getItem('tasks');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load:', e);
    return [];
  }
};
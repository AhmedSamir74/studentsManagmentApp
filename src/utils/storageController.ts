import AsyncStorage from '@react-native-async-storage/async-storage';

export async function _storeData(
  key: string,
  value: any,
  callback?: Function | null,
) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    callback?.(true);
  } catch (error) {
    callback?.(false);
  }
}

export async function _retrieveData(key: null | string = null) {
  try {
    let retrievedItem: any;
    if (key == null) {
      let allKeys = await AsyncStorage.getAllKeys();
      retrievedItem = await AsyncStorage.multiGet(allKeys);
    } else {
      retrievedItem = await AsyncStorage.getItem(key);
    }
    return JSON.parse(retrievedItem);
  } catch (error) {}
}

export async function _updateData(key: string, data: {}) {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(data));
  } catch (error) {}
}

export async function _removeData(key: any, callback?: Function) {
  try {
    await AsyncStorage.removeItem(key, () => {
      if (callback) {
        callback();
      }
    });
  } catch (error) {
    if (callback) {
      callback(false);
    }
  }
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import {stickyWorkers} from '../../metro.config';
import {isToday} from 'date-fns/isToday';

const MY_FOOD_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:key';

const useFoodStorage = () => {
  const saveInfoToStorage = async (keyStorage, meal) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(keyStorage);

      if (currentSaveFood !== null) {
        const currentSaveFoodParsed = JSON.parse(currentSaveFood);
        currentSaveFoodParsed.push(meal);

        await AsyncStorage.setItem(
          keyStorage,
          JSON.stringify(currentSaveFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(keyStorage, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleSaveFood = async ({calories, name, portion}) => {
    try {
      const result = await saveInfoToStorage(MY_FOOD_KEY, {
        calories,
        name,
        portion,
      });
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleSaveTodayFood = async ({calories, name, portion}) => {
    console.log(calories, name, portion);
    try {
      const result = await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        const filteredFoods = parsedFoods.filter(
          item => item.date && isToday(new Date(item.date)),
        );
        return Promise.resolve(filteredFoods);
      } else {
        // Si no hay alimentos guardados para el día actual, retornar un array vacío
        return Promise.resolve([]);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleRemoveTodayFood = async indexToRemove => {
    console.log('index', indexToRemove);
    try {
      const todayFood = await handleGetTodayFood();
      const filteredItems = todayFood.filter((item, index) => {
        console.log('jaja', item, indexToRemove);

        return index !== indexToRemove;
      });
      await AsyncStorage.setItem(
        MY_TODAY_FOOD_KEY,
        JSON.stringify(filteredItems),
      );
      return Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood,
  };
};

//metodo para guardar info de comida
//metodo para obtener info de comida

export default useFoodStorage;

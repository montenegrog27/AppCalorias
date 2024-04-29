import AsyncStorage from '@react-native-async-storage/async-storage';

const MY_FOOD_KEY = '@MyFood:Key';

const useFoodStorage = () => {
  const handleSaveFood = async ({calories, name, portion}) => {
    try {
      const currentSaveFood = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (currentSaveFood !== null) {
        const currentSaveFoodParsed = JSON.parse(currentSaveFood);
        currentSaveFoodParsed.push({
          calories,
          name,
          portion,
        });

        await AsyncStorage.setItem(
          MY_FOOD_KEY,
          JSON.stringify(currentSaveFoodParsed),
        );
        return Promise.resolve();
      }
      await AsyncStorage.setItem(
        MY_FOOD_KEY,
        JSON.stringify([
          {
            calories,
            name,
            portion,
          },
        ]),
      );

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
  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
  };
};

//metodo para guardar info de comida
//metodo para obtener info de comida

export default useFoodStorage;

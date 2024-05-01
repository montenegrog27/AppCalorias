import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import Header from '../../components/Header';
import useFoodStorage from '../../hooks/useFoodStorage';
import TodayCalories from '../../components/TodayCalories';
import TodayMeals from '../../components/TodayMeals';

const totalCaloriesPerDay = 3000;

const Home = () => {
  const [todayFood, setTodayFood] = useState([]);
  const [todayStatistics, setTodayStatistics] = useState({
    consumed: 0,
    percentage: 0,
    remaining: 0,
    total: totalCaloriesPerDay,
  });
  const {onGetTodayFood} = useFoodStorage();
  const {navigate} = useNavigation();

  const calculateStatistics = meals => {
    try {
      const caloriesConsumed = meals.reduce(
        (acum, curr) => acum + Number(curr.calories),
        0,
      );
      const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
      const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;
      setTodayStatistics({
        consumed: caloriesConsumed,
        percentage,
        remaining: remainingCalories,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodayFood = useCallback(async () => {
    try {
      const response = await onGetTodayFood();
      calculateStatistics(response);
      setTodayFood(response);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood]),
  );

  const handleAddCaloriesPress = () => {
    navigate('AddFood');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.calories}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            radius="lg"
            color="#4ecb71"
            icon={<Icon name="add-circle-outline" color="#fff" />}
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals
        foods={todayFood}
        onCompleteAddRemove={() => loadTodayFood()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  calories: {
    fontSize: 20,
    color: 'black',
  },
});

export default Home;

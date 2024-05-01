import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MealItem from '../MealItem/MealItem';

const TodayMeals = ({foods, onCompleteAddRemove}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foods</Text>
      <ScrollView style={styles.content}>
        {foods?.map((meal, index) => (
          <MealItem
            key={index}
            {...meal}
            onCompleteAddRemove={onCompleteAddRemove}
            itemPosition={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 24,
  },
  title: {
    fontSize: 18,
  },
  content: {
    marginVertical: 16,
  },
});
export default TodayMeals;

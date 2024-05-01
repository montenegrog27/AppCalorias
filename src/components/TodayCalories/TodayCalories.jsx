import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const TodayCalories = ({
  total = 3000,
  consumed = 0,
  remaining = 0,
  percentage = 0,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CircularProgress value={percentage} valueSuffix={'%'} />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>Today</Text>
        <View style={styles.rightItem}>
          <Text style={styles.rightLegend}>Total</Text>
          <Text style={styles.rightValue}>{total}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightLegend}>Consumed</Text>
          <Text style={styles.rightValue}>{consumed}</Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.rightLegend}>Remaining</Text>
          <Text style={styles.rightValue}>{remaining}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 14,
  },
  rightItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  rightLegend: {
    flex: 1,
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
  rightValue: {
    flex: 1,
    textAlign: 'right',
    color: 'black',
    fontSize: 15,
  },
});

export default TodayCalories;

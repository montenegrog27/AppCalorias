import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Icon} from '@rneui/themed';

const MealItem = ({calories, portion, name}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.portion}>{portion}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Button
          icon={<Icon name="add-circle-outline" />}
          type="clear"
          style={styles.iconButton}
        />
        <Text style={styles.calories}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4ecb71',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  portion: {
    color: '#808080',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 15,
    color: 'black',
  },
  iconButton: {
    marginBottom: -18,
  },
});

export default MealItem;

import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from '@rneui/themed';
import Header from '../../components/Header';

const Home = () => {
  const {navigate} = useNavigation();

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

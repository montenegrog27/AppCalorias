import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Input} from '@rneui/themed';
import AddFoodModal from '../../components/AddFoodModal';
import Header from '../../components/Header';
import useFoodStorage from '../../hooks/useFoodStorage';
import MealItem from '../../components/MealItem/MealItem';

export const AddFood = () => {
  const [visible, setVisible] = useState(false);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');

  const {onGetFoods} = useFoodStorage();

  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFoods();
      setFoods(foodResponse);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleModalClose = async shouldUpdate => {
    if (shouldUpdate) {
      Alert.alert('Comida guardada exitosamente');
      loadFoods();
    }
    setVisible(false);
  };

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter(item =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodBtncontainer}>
          <Button
            radius="lg"
            color="#4ecb71"
            icon={<Icon name="add-circle-outline" color="#fff" />}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="manzana, banana, gaseosa"
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <Button
          title="Seach"
          color="#78F18D"
          titleStyle={styles.searchBtnTitle}
          radius="lg"
          onPress={handleSearchPress}
        />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map(meal => (
          <MealItem key={meal.name} {...meal} isAbleToAdd={true} />
        ))}
      </ScrollView>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#FFF',
  },
  content: {},
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  addFoodBtncontainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  legendContainer: {
    flex: 1,
  },
  addFoodLegend: {
    fontSize: 20,
    color: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: '#000',
    fontSize: 15,
  },
});

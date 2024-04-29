import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Icon, Input} from '@rneui/themed';
import useFoodStorage from '../../hooks/useFoodStorage';

const AddFoodModal = ({onClose, visible}) => {
  const [calories, setCalories] = useState('');
  const [name, setName] = useState('');
  const [portion, setPortion] = useState('');
  const {onSaveFood} = useFoodStorage();

  useEffect(() => {
    setCalories('');
    setName('');
    setPortion('');
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });

      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={text => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>CAL</Text>
            </View>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={name} onChangeText={text => setName(text)} />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>

          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={portion} onChangeText={text => setPortion(text)} />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porcion</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Add"
              icon={<Icon name="add" color="#fff" />}
              color="#78F18D"
              radius={13}
              onPress={handleAddPress}
              disabled={
                calories.trim() === '' ||
                name.trim() === '' ||
                portion.trim() === ''
              }
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    width: '75%',
    padding: 18,
    borderRadius: 20,
    //las propiedades de shadow fiuncionan para IOS mientras que elevacion funciona en ANDROID
    // shadowColor: '#000',
    // textShadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    //elevation solo funciona en ANDROID
    elevation: 5,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  formItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
});
export default AddFoodModal;

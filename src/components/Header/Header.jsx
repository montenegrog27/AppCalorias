import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import {Button} from '@rneui/themed';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const staticInfo = {
  name: 'Germán Montenegro',
  uri: 'https://media.licdn.com/dms/image/D4D03AQGHjpoW08jWBA/profile-displayphoto-shrink_200_200/0/1690926614863?e=1720051200&v=beta&t=3aLMdp8zn1_Cbs6v8N8mq710F5Nubev0WtAa59lTbbM',
};

function Header() {
  const {canGoBack, goBack} = useNavigation(); // canGoBack devuelve true o false, goBack va para atras

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" size={24} />}
            type="clear"
            onPress={() => goBack()}
          />
        </View>
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{uri: staticInfo.uri}} style={styles.profileImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#808080',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  arrowContainer: {
    marginLeft: -12,
  },
});

export default Header;

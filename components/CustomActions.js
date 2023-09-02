import { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
//component for the action button

const CustomActions = ({ wrapperStyle, iconTextStyle }) => {
  //job is to fetch whatever actionsheet is included in the wrapper. (GiftedChat is wrapper)
  const actionSheet = useActionSheet();
  const onActionPress = () => {
    const options = [
      'Choose from library',
      'Take a pic',
      'Send location',
      'Cancel',
    ];
    //set index of cancel button to use later
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      title="Action button"
      onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: -4,
  },
});

export default CustomActions;

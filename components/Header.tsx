import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {COLORS, SIZES} from '../config';
import {capitalizeFirstLetter} from '../utils';

type HeaderProps = {
  leftToggle: () => void;
  rightToggle: () => void;
  leftFilter: string;
  rightFilter: string;
  centerItem: string;
};

export const Header = ({
  leftToggle,
  rightToggle,
  leftFilter,
  rightFilter,
  centerItem,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.left} onPress={leftToggle}>
        <Text style={styles.text}>
          {leftFilter === 'List' ? 'Map' : 'List'}
        </Text>
      </TouchableOpacity>
      <View style={styles.middle}>
        <Text style={styles.middleText}>{centerItem}</Text>
      </View>
      <TouchableOpacity style={styles.right} onPress={rightToggle}>
        <Text style={styles.text}>
          Set{' '}
          {capitalizeFirstLetter(rightFilter === 'new' ? 'delivered' : 'new')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: SIZES.s50,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: COLORS.black,
    marginBottom: SIZES.s50 / 5,
    marginTop: Platform.OS === 'android' ? (SIZES.s50 / 5) * 2 : 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  left: {
    width: SIZES.s50,
    paddingLeft: SIZES.s50 / 5,
    justifyContent: 'center',
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: SIZES.s50 * 2.1,
    paddingRight: SIZES.s50 / 5,
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
  },
  middleText: {
    fontWeight: '700',
    color: COLORS.primary,
    fontSize: 16,
  },
});

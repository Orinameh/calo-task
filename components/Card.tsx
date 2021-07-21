import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../config';
import {buttonValue} from '../utils';
import {Delivery} from '../interface';

interface CardProps extends Delivery {
  onChangeStatus: (id: string, status: string) => void;
}

export const Card = ({
  name,
  address,
  deliveryStatus,
  onChangeStatus,
  id,
}: CardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Pressable
        onPress={() => onChangeStatus(id, buttonValue(deliveryStatus))}
        style={
          deliveryStatus === 'delivering'
            ? styles.delivered
            : deliveryStatus === 'delivered'
            ? styles.normal
            : styles.delivering
        }>
        <Text
          style={
            deliveryStatus === 'delivered'
              ? styles.buttonNormalText
              : styles.buttonText
          }>
          {deliveryStatus !== 'delivered' ? 'Mark as' : ''}{' '}
          {buttonValue(deliveryStatus)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SIZES.s50 / 5,
    borderRadius: SIZES.s50 / 10,
    borderColor: COLORS.primary,
    marginVertical: SIZES.s50 / 10,
    marginHorizontal: SIZES.s50 / 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5,
  },
  address: {
    fontSize: 13,
    marginVertical: 5,
  },
  delivering: {
    backgroundColor: COLORS.orange,
    padding: SIZES.s50 / 5,
    borderRadius: SIZES.s50 / 5,
  },
  delivered: {
    backgroundColor: COLORS.primary,
    padding: SIZES.s50 / 5,
    borderRadius: SIZES.s50 / 5,
  },
  normal: {
    backgroundColor: COLORS.lightGray,
    color: COLORS.black,
    padding: SIZES.s50 / 5,
    borderRadius: SIZES.s50 / 5,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  buttonNormalText: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
});

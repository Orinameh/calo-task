import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Delivery} from '../interface';
import {Card} from './Card';

type MapProps = {deliveries: Delivery[]} & {
  onChangeStatus: (id: string, status: string) => void;
};
// type Region = {
//   latitude: number;
//   longitude: number;
//   latitudeDelta: number;
//   longitudeDelta: number;
// };
export const Map = ({deliveries, onChangeStatus}: MapProps) => {
  const [cardItem, setCardItem] = useState<Delivery>();

  const onSetItem = (val?: Delivery) => {
    if (val?.id === cardItem?.id) {
      setCardItem(undefined);
    } else {
      setCardItem(val);
    }
  };
  const renderMap = () => (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        zoomTapEnabled
        zoomControlEnabled
        style={styles.map}>
        {deliveries.map(item => (
          <Marker
            coordinate={{latitude: item.lat, longitude: item.lng}}
            key={item.id}
            title={item.name}
            description={item.address}
            onPress={() => onSetItem(item)}
          />
        ))}
      </MapView>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderMap()}
      {cardItem !== undefined && (
        <View style={styles.bottomCard}>
          <Card {...cardItem} {...{onChangeStatus}} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomCard: {position: 'absolute', bottom: 0, width: '100%'},
});

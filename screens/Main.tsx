import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {COLORS, data, SIZES} from '../config';
import {Header, Map, Card} from '../components';
import {Delivery} from '../interface';
import {filterItems} from '../utils';

const Separator = () => <View style={styles.separator} />;

const INITIAL_ITEMS = 10;

export const Main = () => {
  const [leftFilter, setLeftFilter] = useState('List');
  const [rightFilter, setRightFilter] = useState('new');
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const start = 0;
  const end =
    offset === Math.ceil(data.length / offset)
      ? data.length - 1
      : offset * INITIAL_ITEMS - 1;

  const filteredItems = useCallback(
    items => {
      return filterItems(
        items as Delivery[],
        rightFilter === 'new'
          ? undefined
          : ('delivered' as Pick<Delivery, 'deliveryStatus'>),
      );
    },
    [rightFilter],
  );

  useEffect(
    () => setDeliveries(filteredItems(data).slice(start, end) as Delivery[]),
    [end, filteredItems, offset, rightFilter, start],
  );

  const onToggleLeft = () => {
    if (leftFilter === 'List') {
      setLeftFilter('Map');
    } else {
      setLeftFilter('List');
    }
  };
  const onToggleRight = () => {
    if (rightFilter === 'new') {
      setRightFilter('delivered');
    } else {
      setRightFilter('new');
    }
  };

  // Delay this call by 2secs to show the loading text
  const handleReachEnd = () => {
    setLoading(true);
    setTimeout(() => {
      setOffset(offset + 1);
      setLoading(false);
    }, 2000);
  };

  const onChangeStatus = (id: string, status: string) => {
    const getItem = data.find(item => item.id === id) as Delivery;
    const getIndex = data.findIndex(item => item.id === id);
    if (status !== 'no status') {
      getItem.deliveryStatus = status as keyof Delivery['deliveryStatus'];
    }
    data.filter(item => item.id === id).splice(getIndex, 0, getItem);
    setDeliveries(filteredItems(data).slice(start, end) as Delivery[]);
  };

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.footer}>
        {loading ? <Text>Loading...</Text> : null}
      </View>
    );
  }, [loading]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftFilter={leftFilter}
        rightFilter={rightFilter}
        leftToggle={onToggleLeft}
        rightToggle={onToggleRight}
        centerItem={`${filteredItems(data).length} / ${data.length}`}
      />
      {leftFilter === 'List' ? (
        <FlatList
          renderItem={({item}) => <Card {...item} {...{onChangeStatus}} />}
          data={deliveries}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={Separator}
          onEndReachedThreshold={0.01}
          ListFooterComponent={renderFooter}
          onMomentumScrollEnd={handleReachEnd}
        />
      ) : (
        <Map deliveries={deliveries} onChangeStatus={onChangeStatus} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.s50 / 5,
  },
  separator: {
    width: 15,
  },
  footer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

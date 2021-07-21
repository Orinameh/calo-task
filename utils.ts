import {Delivery} from './interface';
export const filterItems = (
  data: Delivery[],
  status?: Pick<Delivery, 'deliveryStatus'> | undefined,
) => {
  if (status) {
    return data.filter(item => item.deliveryStatus === status);
  } else {
    return data.filter(item => item.deliveryStatus !== 'delivered');
  }
};

export const capitalizeFirstLetter = (text: string) =>
  `${text[0].toUpperCase()}${text.slice(1)}`;

export const buttonValue = (status: string | undefined) => {
  if (status === 'delivering') {
    return 'delivered';
  } else if (status === 'delivered') {
    return 'no status';
  } else {
    return 'delivering';
  }
};

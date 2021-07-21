export interface Delivery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  deliveryStatus?: 'delivering' | 'delivered';
}

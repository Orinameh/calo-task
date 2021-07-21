import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#37B674',
  secondary: '#FEFFFF',
  white: '#FFFFFF',
  lightGray: '#DDDDDD',
  black: '#1E1F20',
  orange: '#F1BA60',
  red: '#CF2820',
};

export const SIZES = {
  s50: 50,
  width,
  height,
};

const appTheme = {COLORS, SIZES};
export default appTheme;

import { View } from 'react-native';

import Logo from '../assets/logo.svg';

export function Header() {
  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo/>
    </View>
  );
}
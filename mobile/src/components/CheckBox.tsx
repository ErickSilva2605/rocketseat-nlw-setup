import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

interface CheckBoxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export function CheckBox({ title, checked = false, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked ?
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Animated.View>
          :
          <View
            className="h-8 w-8 bg-zinc-900 rounded-lg border-2 border-zinc-800"
          />
      }

      <Text className={clsx("text-white text-base ml-3", {
        ["line-through"]: checked
      })}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
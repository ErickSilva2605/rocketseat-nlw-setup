import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return (
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum
      hábito, comece {' '}
      <Text
        onPress={() => navigate('newHabit')}
        className="text-violet-400 text-base underline active:text-violet-500"
      >
        cadastrando um.
      </Text>
    </Text>
  );
}
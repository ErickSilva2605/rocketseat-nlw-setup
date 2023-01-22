import { ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';

interface HabitParams {
  date: string
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitParams;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="text-zinc-400 font-semibold text-base mt-6 lowercase">
          {dayOfWeek}
        </Text>

        <Text className="text-white font-extrabold text-3xl mt-2">
          {dayAndMonth}
        </Text>

        <ProgressBar progress={50} />

        <View className="mt-6">
          <CheckBox
            title="Beber 2L de água"
            checked={false}
          />

          <CheckBox
            title="Alimentação saudável"
            checked={true}
          />
        </View>
      </ScrollView>
    </View>
  );
}
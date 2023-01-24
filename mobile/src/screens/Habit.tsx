import { Alert, ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { api } from '../lib/axios';
import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { generateProgressPercentage } from '../utils/generate-progress-percentage';

interface HabitParams {
  date: string
}

interface HabitsInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>,
  completedHabits: string[]
}

export function Habit() {
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const { date } = route.params as HabitParams;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = habitsInfo?.possibleHabits?.length ?
    generateProgressPercentage(habitsInfo.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get('day', {
        params: {
          date
        }
      });

      setHabitsInfo(response.data);
      setCompletedHabits(response.data.completedHabits ?? []);
    } catch (error) {
      console.error(error);
      Alert.alert('Oops...', 'Não foi possível carregar os hábitos desde dia!');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleHabits(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`);

      if (completedHabits?.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
      } else {
        setCompletedHabits(prevState => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Oops...', 'Não foi possível atualizar o status do hábito.')
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

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

        <ProgressBar progress={habitsProgress} />

        <View className={clsx("mt-6", {
          ['opacity-50']: isDateInPast
        })}>
          {
            habitsInfo?.possibleHabits?.length ?
              habitsInfo?.possibleHabits.map(habit => {
                return (
                  <CheckBox
                    key={habit.id}
                    title={habit.title}
                    checked={completedHabits?.includes(habit.id)}
                    disabled={isDateInPast}
                    onPress={() => handleToggleHabits(habit.id)}
                  />
                )
              })
              : <HabitsEmpty />
          }
        </View>

        {
          isDateInPast && (
            <Text className="text-white mt-10 text-center">
              Você não pode editar hábitos de uma data passada.
            </Text>
          )
        }
      </ScrollView>
    </View>
  );
}
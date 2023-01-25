import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import dayjs from 'dayjs';

import { HabitDay, DAY_SIZE } from '../components/HabitDay';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';

import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',];

const summaryDates = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  completed: number;
  amount: number;
}>

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);

      const response = await api.get('summary');
      setSummary(response.data);
    } catch (error) {

      Alert.alert('Oops...', 'Não foi possível carregar o resumo dos hábitos!');
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, index) => {
            return (
              <Text
                key={`${weekDay}-${index}`}
                className="text-zinc-400 text-xl font-bold text-center mx-1"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {
          summary &&
          <View className="flex-row flex-wrap">
            {
              summaryDates.map(date => {
                const dayInSummary = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })

                return (
                  <HabitDay
                    key={date.toISOString()}
                    date={date}
                    amount={dayInSummary?.amount}
                    completed={dayInSummary?.completed}
                    onPress={() => navigate('habit', { date: date.toISOString() })}
                  />
                )
              })
            }

            {
              amountOfDaysToFill > 0 && Array
                .from({ length: amountOfDaysToFill })
                .map((_, index) => (
                  <View
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                ))
            }
          </View>
        }
      </ScrollView>
    </View>
  );
}
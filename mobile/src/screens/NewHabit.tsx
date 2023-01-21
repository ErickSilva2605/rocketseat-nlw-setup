import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { BackButton } from '../components/BackButton';
import { CheckBox } from '../components/CheckBox';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function NewHabit() {
  const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (checkedWeekDays.includes(weekDayIndex)) {
      setCheckedWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setCheckedWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-2 focus:border-green-600"
          placeholder="Ex.:Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[500]}
        />

        <Text className="text-white text-base font-semibold mt-4 mb-3">
          Qual a recorrência?
        </Text>

        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <CheckBox
                key={`${weekDay}`}
                title={weekDay}
                checked={checkedWeekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index)}
              />
            )
          })
        }

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center w-full h-14 mt-6 rounded-lg bg-green-600"
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="text-white font-semibold font-base ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
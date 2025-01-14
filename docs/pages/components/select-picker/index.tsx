import React from 'react';
import { SelectPicker, Button, RadioGroup, Radio } from 'rsuite';
import DefaultPage from '@/components/Page';
import PreventOverflowContainer from '@/components/PreventOverflowContainer';
import useFetchData from '@/utils/useFetchData';
import Spinner from '@rsuite/icons/legacy/Spinner';

export default function Page() {
  const { response: data } = useFetchData('users-role');
  return (
    <DefaultPage
      dependencies={{
        PreventOverflowContainer,
        SelectPicker,
        Button,
        Spinner,
        data,
        RadioGroup,
        Radio,
      }}
    />
  );
}

import { Box, Container, useTheme } from '@mui/material';
import Select from 'react-select';
import { tickerSelectActions } from './ticker-select.slice';
import { useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';

export default function TickerSelect() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { options, selectedOption } = useSelector((state: any) => {
    return state.tickerSelectReducer;
  });

  const handleOnChange = (selectedOption: any) => {
    dispatch(tickerSelectActions.setSelectedOption(selectedOption));
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: 1,
      }}
    >
      <Select
        options={options}
        isClearable={false}
        className='ticker-select-container'
        classNamePrefix='ticker-select'
        value={selectedOption}
        onChange={handleOnChange}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          control: (provided) => ({ ...provided, textAlign: 'center' }),
        }}
      />
    </Box>
  );
}

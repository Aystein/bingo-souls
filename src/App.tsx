import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Stack,
  Button,
  TextInput,
  Flex,
  Center,
  Slider,
  Checkbox,
  Input
} from '@mantine/core';
import { ALL_CATEGORIES, Entry, generateSample } from './Entries';
import { createStyles } from '@mantine/core';
import { cloneDeep } from 'lodash';
import { useTheme } from '@emotion/react';


const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    '&:hover': {
      boxShadow: `inset 0 0 20px ${theme.colors.blue[9]}`
    },
  },
  grid: {
    border: '1px solid white'
  }
}));


function Board({ dimension, board, checked, setChecked }: { dimension: number, board?: Entry[][], checked?: boolean[][], setChecked: (value: boolean[][]) => void; }) {
  const { classes } = useStyles();

  if (!board || !checked) return null;


  const handleCellClick = (rowIndex: number, columnIndex: number) => {
    const newState = cloneDeep(checked);
    newState[rowIndex][columnIndex] = !newState[rowIndex][columnIndex];
    setChecked(newState);
  }

  return <div style={{ background: '#353534', width: '100%', height: '100%', display: 'grid', gridTemplateRows: 'repeat(5, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' }}>
    {board.map((row, rowIndex) => {
      return <>{row.map((cell, columnIndex) => {
        const isCellChecked = checked[rowIndex][columnIndex];

        return <Center className={classes.wrapper} onClick={() => handleCellClick(rowIndex, columnIndex)} style={{ padding: 8, border: '1px solid white', userSelect: 'none', background: isCellChecked ? 'red' : '#353534' }}>
          <Text align='center' fw={400} color={'white'}>{board[rowIndex][columnIndex].task}</Text>
        </Center>
      })}</>
    })}
  </div>;
}



function generateBoard(dimension: number, availableCategories: string[]) {
  const state = new Array(dimension);

  for (let i = 0; i < dimension; i++) {
    state[i] = new Array(dimension);

    for (let j = 0; j < dimension; j++) {
      state[i][j] = generateSample(availableCategories)
    }
  }

  return state;
}

function App() {
  const initialSeed = React.useMemo(() => {
    return Date.now();
  }, []);

  const randomGenerator = React.useMemo(() => {
    return 4;
  }, []);

  const [difficulty, setDifficulty] = React.useState(1);
  const [dimension, setDimension] = React.useState(5)
  const [categories, setCategories] = React.useState(ALL_CATEGORIES)

  const [board, setBoard] = React.useState<Entry[][]>();
  const [checked, setChecked] = React.useState<boolean[][]>();

  const { classes } = useStyles();

  const handleGenerateBoard = () => {
    setBoard(generateBoard(dimension, categories));
    const checked = new Array<boolean[]>(dimension);
    for (let i = 0; i < dimension; i++) {
      checked[i] = new Array<boolean>(dimension);
    }
    setChecked(checked)
  }

  return (
    <AppShell style={{ background: '#c8c8c7' }}>
      <Stack style={{ height: '100%' }}>
        <Stack>
          <Flex justify={'space-between'}>
            <Input.Wrapper label="Difficulty" required>
              <Slider
                style={{ width: 200 }}
                value={difficulty}
                onChange={setDifficulty}
                min={0}
                max={3}
                marks={[
                  { value: 0, label: 'easy' },
                  { value: 1, label: 'medium' },
                  { value: 2, label: 'hard' },
                  { value: 3, label: 'sadge' },
                ]}
              />
            </Input.Wrapper>

            <Checkbox.Group
              defaultValue={ALL_CATEGORIES}
              label="Select categories"
              withAsterisk
              onChange={setCategories}
              value={categories}
            >
              {ALL_CATEGORIES.map((category) => {
                return <Checkbox value={category} label={category} />
              })}
            </Checkbox.Group>
          </Flex>
          <Flex justify='center' align='end' gap={16}>
            <TextInput
              placeholder="Seed value for random generation"
              label="Seed"
              withAsterisk
              defaultValue={initialSeed}
            />
            <Button onClick={handleGenerateBoard}>Generate bingo board</Button>
          </Flex>
        </Stack>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={classes.grid} style={{ width: '75vh', height: '75vh' }}>
            <Board dimension={dimension} board={board} checked={checked} setChecked={setChecked} />
          </div>
        </div>
      </Stack>
    </AppShell>
  );
}

export default App;

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
  Input,
  NumberInput,
  Space
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
  },
  main: {
    '.mantine-AppShell-main': {
      
    }
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

  return <div style={{ fontSize: 22 - dimension * 1.5, maxHeight: '90vh', aspectRatio: 1, display: 'grid', gridTemplateRows: `repeat(${dimension}, 1fr)`, gridTemplateColumns: `repeat(${dimension}, 1fr)` }}>
    {board.map((row, rowIndex) => {
      return <>{row.map((cell, columnIndex) => {
        const isCellChecked = checked[rowIndex][columnIndex];

        return <Center className={classes.wrapper} onClick={() => handleCellClick(rowIndex, columnIndex)} style={{ padding: 8, border: '1px solid white', userSelect: 'none', background: isCellChecked ? '#ff0000f0' : '#353534dd' }}>
          <Text align='center' fw={400} color={'white'}>{board[rowIndex][columnIndex].task}</Text>
        </Center>
      })}</>
    })}
  </div>;
}



function generateBoard(dimension: number, availableCategories: string[], difficulty: number) {
  const state = new Array(dimension);

  for (let i = 0; i < dimension; i++) {
    state[i] = new Array(dimension);

    for (let j = 0; j < dimension; j++) {
      state[i][j] = generateSample(availableCategories, difficulty)
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
    setBoard(generateBoard(dimension, categories, difficulty));
    const checked = new Array<boolean[]>(dimension);
    for (let i = 0; i < dimension; i++) {
      checked[i] = new Array<boolean>(dimension);
    }
    setChecked(checked)
  }

  React.useEffect(() => {
    handleGenerateBoard();
  }, [dimension, difficulty, categories])

  return (
    <AppShell style={{ background: '#5f6171' }}
      className={classes.main}
      navbar={<Navbar width={{ base: 300 }} p="xs">
        <Input.Wrapper label="Difficulty" required>
          <Slider
            style={{ width: 200, marginBottom: 32 }}
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

        <Input.Wrapper label="Board size" required>
          <Slider
            style={{ width: 200, marginBottom: 32 }}
            value={dimension}
            onChange={setDimension}
            min={3}
            max={9}
            marks={[
              { value: 3, label: '3x3' },
              { value: 5, label: '5x5' },
              { value: 7, label: '7x7' },
              { value: 9, label: '9x9' },
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

        <Space h='xs' />

        <TextInput
          placeholder="Seed value for random generation"
          label="Seed"
          withAsterisk
          defaultValue={initialSeed}
        />

        <Space h='xs' />

        <Button onClick={handleGenerateBoard}>Generate bingo board</Button>
      </Navbar>}
    >



      <Stack style={{ height: '100%', background: 'transparent', position: 'relative' }}>

        <img src="campfire.gif" style={{ position: 'absolute', zIndex: 10, width: '100%', height: '100%', objectFit: 'cover' }}></img>

        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '100vh', zIndex: 100 }}>
          <div className={classes.grid}>
            <Board dimension={dimension} board={board} checked={checked} setChecked={setChecked} />
          </div>
        </div>
      </Stack>
    </AppShell>
  );
}

export default App;

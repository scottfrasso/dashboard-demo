import { ReactNode, useState } from 'react'
import {
  FormControl,
  TextField,
  Grid,
  FormLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
} from '@mui/material'

import { SurveyDTO, SurveyDTOFavoriteColor } from '@dashboard/dtos'

function App() {
  const [favoriteNumber, setFavoriteNumber] = useState(0)
  const [favoriteColor, setFavoriteColor] = useState('green')
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleColorChange = (
    event: SelectChangeEvent<string>,
    child: ReactNode,
  ) => {
    setFavoriteColor(child?.toString() || 'green')
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    console.log(`Submitting survey: ${favoriteNumber} ${favoriteColor}`)

    const postData = async () => {
      const response = await fetch('http://localhost:3001/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favoriteNumber,
          favoriteColor,
        } as SurveyDTO),
      })

      console.log('Response:', response)
      setIsLoading(false)
    }

    postData()
      .catch(console.error)
      .finally(() => {
        setIsDone(true)
      })
  }

  const colors: string[] = Object.values(SurveyDTOFavoriteColor)

  if (isDone) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100vh' }}
      >
        <div>Thank you for submitting the survey!</div>
      </Grid>
    )
  }

  if (isLoading) {
    return (
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100vh' }}
      >
        <div>Loading...</div>
      </Grid>
    )
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100vh' }}
      >
        <Grid item sm={2}>
          <FormLabel>What is your favorite number?</FormLabel>
          <TextField
            id='favorite-number'
            name='favorite number'
            type='number'
            value={favoriteNumber}
            onChange={(e) => setFavoriteNumber(Number(e.target.value))}
          />
        </Grid>
        <Grid item sm={2}>
          <FormLabel>What is your favorit color?</FormLabel>
          <FormControl>
            <Select
              name='favorite-color'
              value={favoriteColor}
              onChange={handleColorChange}
            >
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  {color}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={2}>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default App

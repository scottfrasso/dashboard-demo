import { ReactNode, useEffect, useState } from 'react'
import {
  FormControl,
  TextField,
  Grid,
  FormLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Button,
  InputLabel,
} from '@mui/material'

import './App.css'

import { SurveyDTO, SurveyDTOFavoriteColor } from '@dashboard/dtos'
import { animate } from './Starfield'

function App() {
  const [favoriteNumber, setFavoriteNumber] = useState(0)
  const [favoriteColor, setFavoriteColor] = useState<SurveyDTOFavoriteColor>(
    SurveyDTOFavoriteColor.GREEN,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    animate()
  }, [])

  const handleColorChange = (
    event: SelectChangeEvent<SurveyDTOFavoriteColor>,
    child: ReactNode,
  ) => {
    setFavoriteColor(event.target.value as SurveyDTOFavoriteColor)
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

  const renderSelectColorMenu = () => {
    const colors: string[] = Object.values(SurveyDTOFavoriteColor)

    return colors.map((color: string) => {
      return (
        <MenuItem key={color} value={color}>
          {color}
        </MenuItem>
      )
    })
  }

  if (isDone) {
    return (
      <Grid container alignItems='center' justifyContent='center'>
        <div>Thank you for submitting the survey!</div>
      </Grid>
    )
  }

  if (isLoading) {
    return (
      <Grid container alignItems='center' justifyContent='center'>
        <div>Loading...</div>
      </Grid>
    )
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container alignItems='center' justifyContent='center' spacing={6}>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField
              label='What is your favorite number?'
              id='favorite-number'
              name='favorite number'
              type='number'
              value={favoriteNumber}
              onChange={(e) => setFavoriteNumber(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <InputLabel id='favorite-color-select-label'>
              What is your favorit color?
            </InputLabel>
            <Select
              labelId='favorite-color-select-label'
              name='favorite-color'
              value={favoriteColor}
              onChange={handleColorChange}
            >
              {renderSelectColorMenu()}
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

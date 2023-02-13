import React, { useEffect } from 'react'
import {
  CardContent,
  Card,
  CardHeader,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import toast from 'react-hot-toast'

import { GroupDTO } from '@dashboard/dtos'
import { api } from 'src/hooks/useApi'

function CreateAPostForm() {
  const imageRef = React.useRef<HTMLInputElement>(null)
  const contentRef = React.useRef<HTMLInputElement>(null)

  const [selectedGroupId, setSelectedGroupId] = React.useState<
    string | undefined
  >(undefined)
  const [groups, setGroups] = React.useState<GroupDTO[] | undefined>(undefined)
  useEffect(() => {
    const fetchGroups = async () => {
      const groupList = await api.groups.getGroups()
      setGroups(groupList)
      if (groupList.length > 0) {
        setSelectedGroupId(groupList[0].id.toString())
      }
    }
    fetchGroups().catch(console.error)
  }, [])

  const onGroupChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroupId(parseInt(event.target.value, 10).toString())
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedGroupId) {
      toast.error('Please select a group')
      return
    }

    const image = imageRef.current?.value
    const content = contentRef.current?.value
    const groupId = parseInt(selectedGroupId || '', 10)

    const postData = async () => {
      await api.posts.createPost({
        imageURL: image,
        content,
        groupId,
      })
    }

    postData().catch(console.error)
  }

  if (!groups) return <div>Loading...</div>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title='Create a post 🚀' />
          <CardContent>
            <form noValidate autoComplete='off' onSubmit={onHandleSubmit}>
              <FormControl>
                <Select
                  label='Group'
                  value={selectedGroupId}
                  onChange={onGroupChange}
                >
                  {groups.map((group) => (
                    <MenuItem value={group.id}>{group.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type='text'
                label='ImageURL'
                variant='outlined'
                inputRef={imageRef}
              />
              <TextField
                type='text'
                label='Content'
                variant='outlined'
                inputRef={contentRef}
              />
              <Button type='submit'>
                <Typography variant='button'>Create</Typography>
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CreateAPostForm

import React from 'react'
import {View, Text} from 'react-native'
import {usePage} from '../../contexts/page-context'
import {BookmarkPreview} from './BookmarkPreview'

export interface Bookmark {
  id: string
  title: string
  description: string
  url: string
  videoURL?: string
  authorID?: string
  screenshotURL?: string
  createdAt?: string
}

const Bookmarks = () => {
  const {
    bookmarks: {data, loading, error},
  } = usePage()

  if (error) {
    console.log(JSON.stringify(error))
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      {data?.searchBookmarks.length ? (
        data?.searchBookmarks?.map(bookmark => {
          return <BookmarkPreview data={bookmark} />
        })
      ) : (
        <Text>You haven't added any bookmarks yet</Text>
      )}
    </View>
  )
}

export {Bookmarks}

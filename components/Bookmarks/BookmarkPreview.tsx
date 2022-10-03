//import {useState} from 'react'
import React from 'react'
import {Text, View, Image} from 'react-native'
// import {UpdateBookmark} from '../UpdateBookmark'
// import {DeleteBookmark} from '../DeleteBookmark'
import {Bookmark} from './Bookmarks'
//import {Loader} from '../Loader/Loader'
import {useAuth0} from '@auth0/auth0-react'
//import {useModal} from '../../contexts/modal-context'

type Props = {
  data: Bookmark
}

export const BookmarkPreview = ({
  data: {id, url, title, description, screenshotURL},
}: Props) => {
  //const [, setUpdateMode] = useState(false)
  //const [hover, setHover] = useState(false)
  //const {user, isLoading} = useAuth0()
  //  const {openModal, setModalContent} = useModal()

  // if (isLoading) {
  //   //return <Loader />
  //   return <Text>Loading...</Text>
  // }

  return (
    <View key={id}>
      {screenshotURL && (
        <Image style={{width: 100, height: 50}} source={{uri: screenshotURL}} />
      )}

      <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {/* <a
          className="inline-block text-xs text-blue-500 mb-2"
          href={url}
          target="_blank">
          {url}
        </a> */}
      </View>

      <View>
        {/* <button
          className="btn btn-sm text-xs font-bold mr-2"
          onClick={() => {
            setModalContent(
              <UpdateBookmark
                id={id}
                title={title}
                description={description}
                setMode={setUpdateMode}
                screenshotURL={screenshotURL}
              />,
            )
            openModal()
          }}>
          edit
        </button> */}

        {/* <DeleteBookmark id={id} authorID={user?.sub} /> */}
      </View>
    </View>
  )
}

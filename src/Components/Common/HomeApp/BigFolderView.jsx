import React from 'react'

//components
import Background from './Background'
import DocumentRepoCard from '../Cards/DocumentRepoCard'

function BigFolderView({onClose}) {
  return (
    <>
    <Background onClose={onClose}>
        <DocumentRepoCard/>
    </Background>
    </>
  )
}

export default BigFolderView
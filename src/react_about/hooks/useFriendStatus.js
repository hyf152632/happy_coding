import React, { useState, useEffect } from 'react'

const ChatAPI = {
  subscribeToFriendStatus(friendID, handleStatusChange) {
    handleStatusChange({ id: friendID, isOnline: true })
  },
  unsubscribeToFriendStatus(friendID, handleStatusChange) {
    handleStatusChange({ id: friendID, isOnline: false })
  }
}

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeToFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}

export default useFriendStatus

// 多个 Hook 之间传递信息

const friendList = [{ id: 1, name: 'Phoebe' }, { id: 2, name: 'Rachel' }, { id: 3, name: 'Ross' }]

function Circle({ color = 'red' }) {
  return (
    <>
      <div style={{ background: color }} />
    </>
  )
}

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1)
  const isRecipientOnline = useFriendStatus(recipientID)

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select value={recipientID} onChange={e => setRecipientID(e.target.value)}>
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  )
}

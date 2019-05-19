// before:
// useState
const BookEntryList = props => {
  const [pending, setPending] = useState(0)
  const [booksJustSaved, setBooksJustSaved] = useState([])

  useEffect(() => {
    const ws = new WebSocket(webSocketAddress('/bookEntryWS'))

    ws.onmessage = ({ data }) => {
      let packet = JSON.parse(data)
      if (packet._messageType == 'initial') {
        setPending(packet.pending)
      } else if (packet._messageType == 'bookAdded') {
        setPending(pending - 1 || 0)
        setBooksJustSaved([packet, ...booksJustSaved])
      } else if (packet._messageType == 'pendingBookAdded') {
        setPending(+pending + 1 || 0)
      } else if (packet._messageType == 'bookLookupFailed') {
        setPending(pending - 1 || 0)
        setBooksJustSaved([
          {
            _id: '' + new Date(),
            title: `Failed lookup for ${packet.isbn}`,
            success: false
          },
          ...booksJustSaved
        ])
      }
    }
    return () => {
      try {
        ws.close()
      } catch (e) {}
    }
  }, [])

  //...
}

// after:
// useReducer

function scanReducer(state, [type, payload]) {
  switch (type) {
    case 'initial':
      return { ...state, pending: payload.pending }
    case 'pendingBookAdded':
      return { ...state, pending: state.pending + 1 }
    case 'bookAdded':
      return {
        ...state,
        pending: state.pending - 1,
        booksSaved: [payload, ...state.booksSaved]
      }
    case 'bookLookupFailed':
      return {
        ...state,
        pending: state.pending - 1,
        booksSaved: [
          {
            _id: '' + new Date(),
            title: `Failed lookup for ${payload.isbn}`,
            success: false
          },
          ...state.booksSaved
        ]
      }
  }
  return state
}
const initialState = { pending: 0, booksSaved: [] }

const BookEntryList_new = props => {
  const [state, dispatch] = useReducer(scanReducer, initialState)

  useEffect(() => {
    const ws = new WebSocket(webSocketAddress('/bookEntryWS'))

    ws.onmessage = ({ data }) => {
      let packet = JSON.parse(data)
      dispatch([packet._messageType, packet])
    }
    return () => {
      try {
        ws.close()
      } catch (e) {}
    }
  }, [])

  //...
}

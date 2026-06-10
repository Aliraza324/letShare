export const mentionPattern = /(@[a-zA-Z0-9_.]+)/g

export const formatRelativeTime = (date) => {
  if (!date) return 'Just now'

  const timestamp = new Date(date).getTime()
  const diff = Math.max(0, Date.now() - timestamp)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return `${weeks}w ago`
}

export const getMentionQuery = (value) =>
  value.match(/(^|\s)(@[a-zA-Z0-9_.]*)$/)?.[2] || ''

export const insertAtCursor = (value, insertion, input) => {
  const start = input?.selectionStart ?? value.length
  const end = input?.selectionEnd ?? value.length

  return {
    nextValue: `${value.slice(0, start)}${insertion}${value.slice(end)}`,
    nextCursor: start + insertion.length,
  }
}

export const insertMention = (value, user) =>
  value.replace(/(^|\s)(@[a-zA-Z0-9_.]*)$/, `$1@${user.handle} `)

export const extractMentionMetadata = (value, users) => {
  const matches = value.match(mentionPattern) || []
  const handles = matches.map((mention) => mention.slice(1).toLowerCase())

  return users
    .filter((user) => handles.includes(user.handle.toLowerCase()))
    .map((user) => ({
      id: user.id,
      handle: user.handle,
      name: user.name,
    }))
}


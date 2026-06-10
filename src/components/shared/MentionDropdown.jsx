const MentionDropdown = ({
  activeIndex = 0,
  onSelect,
  query,
  users,
}) => {
  const filteredUsers = users
    .filter((user) => {
      const normalizedQuery = query.replace('@', '').toLowerCase()

      return (
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.handle.toLowerCase().includes(normalizedQuery)
      )
    })
    .slice(0, 5)

  if (!query || filteredUsers.length === 0) return null

  return (
    <div
      className="absolute bottom-full left-0 z-20 mb-2 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
      role="listbox"
      aria-label="Mention suggestions"
    >
      {filteredUsers.map((user, index) => (
        <button
          key={user.id}
          type="button"
          role="option"
          aria-selected={activeIndex === index}
          className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-xs font-semibold transition ${
            activeIndex === index ? 'bg-[#f4fbdf] text-slate-950' : 'text-slate-700 hover:bg-slate-50'
          }`}
          onMouseDown={(event) => {
            event.preventDefault()
            onSelect(user)
          }}
        >
          <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span className="min-w-0">
            <span className="block truncate font-extrabold">{user.name}</span>
            <span className="block truncate text-slate-400">@{user.handle}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default MentionDropdown


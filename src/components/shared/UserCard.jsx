const UserCard = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#a6ef00] to-emerald-500" />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-extrabold text-slate-950">
          {user.name}
        </h3>
        <p className="text-xs text-slate-400">{user.role}</p>
      </div>
      <button className="h-8 rounded-full bg-[#ecffd4] px-3 text-xs font-bold text-[#6fb600]">
        Follow
      </button>
    </div>
  )
}

export default UserCard

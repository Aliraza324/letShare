
const ActionButton = ({ icon: Icon, label, count, active, onClick }) => {
  return (
    <button
      type="button"
      className="group flex flex-col items-center gap-1 text-white"
      aria-label={label}
      onClick={onClick}
    >
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition group-hover:scale-105 ${
          active ? 'bg-[#b7f238] text-black' : 'bg-white/12 text-white'
        }`}
      >
        <Icon className={`h-5 w-5 ${active ? 'fill-current' : ''}`} />
      </span>
      {count && <span className="text-[11px] font-bold">{count}</span>}
    </button>
  )
}

export default ActionButton

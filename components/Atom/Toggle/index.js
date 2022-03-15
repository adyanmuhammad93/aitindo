import './index.module.css'

export default function toggle({ checked, updateHandler }) {
  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative flex items-center">
        <input
          id="toggle"
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => updateHandler(e.target.checked)}
        />
        <div className="toggle-path bg-gray-400 w-8 h-3.5 rounded-full shadow-inner"> </div>
        <div className="toggle-circle absolute w-5 h-5 bg-black shadow-xl rounded-full inset-y-0 left-0">
          {' '}
        </div>
        <div className="pl-3 text-xs">Saya bersedia berlangganan newsletter.</div>
      </div>
    </label>
  )
}

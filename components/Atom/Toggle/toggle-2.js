import './index.module.css'

export default function toggle({ checked, handler }) {
  return (
    <label htmlFor="toggle-2" className="flex items-center cursor-pointer">
      <div className="relative flex items-center">
        <input
          id="toggle-2"
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => handler(e.target.checked)}
        />
        <div className="toggle-path bg-gray-400 w-8 h-3.5 rounded-full shadow-inner"> </div>
        <div className="toggle-circle absolute w-5 h-5 bg-black shadow-xl rounded-full inset-y-0 left-0">
          {' '}
        </div>
      </div>
    </label>
  )
}

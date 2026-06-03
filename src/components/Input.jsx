const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-blue-300 rounded-xl px-4 py-3 bg-white"
      />
    </div>
  )
}

export default Input

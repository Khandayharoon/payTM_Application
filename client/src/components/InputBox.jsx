function InputBox({ label, placeholder, value, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type="text"
        placeholder={placeholder}
        value={value} // Ensure value is passed from props
        onChange={onChange} // Ensure onChange is passed from props
        className="w-full px-2 py-1 border rounded border-slate-200 outline-none"
      />
    </div>
  );
}

export default InputBox;

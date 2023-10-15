const Input = ({ label, state, setState, type = "text" }) => {
  return (
    <div className="form-floating mb-2">
      <input
        type={type}
        className="form-control"
        value={state}
        onChange={(e) => setState(e.target.value)}
        id="floatingUsername"
        placeholder={label}
      />
      <label htmlFor="floatingUsername">{label}</label>
    </div>
  );
};

export default Input;

import { useSelector } from "react-redux";
import { useCallback } from "react";

const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);
  const obj = error !== null && error.errors;
  console.log(obj);

  const errorMessage = useCallback(() => {
    return Object.keys(obj).map((name) => {
      const msg = obj[name].join(", ");
      return `${name} - ${msg}`;
    });
  }, [obj]);

  console.log(error !== null && errorMessage());

  return (
    error !== null &&
    errorMessage().map((error) => (
      <div
        className="alert alert-danger m-1 p-1 text-start "
        role="alert"
        key={error}
      >
        {error}
      </div>
    ))
  );
};

export default ValidationError;

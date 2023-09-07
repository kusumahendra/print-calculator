import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Diameter = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [value, setValue] = useState(formValue.diameter);

  const handleChange = (event) => {
    setValue(parseFloat(event.target.value));
  };

  useEffect(() => {
    dispatch.formValue.update({
      diameter: value,
    });
  }, [value]);
  return (
    <div className="mb-4">
      <div>
        <label className="block text-xs font-medium text-gray-700">Diameter (cm)</label>
        <input value={value} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" onChange={handleChange} />
      </div>
    </div>
  );
};

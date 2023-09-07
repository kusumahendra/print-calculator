import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Gap = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [value, setValue] = useState(formValue.gap);

  const handleChange = (event) => {
    setValue(parseFloat(event.target.value));
  };

  useEffect(() => {
    dispatch.formValue.update({
      gap: value,
    });
  }, [value, dispatch.formValue]);

  return (
    <div className="mb-4">
      <div>
        <label className="block text-xs font-medium text-gray-700">Gap (mm)</label>
        <input value={value} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" step={5} onChange={handleChange} />
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const WidthHeight = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    height: parseInt(formValue.height),
    width: parseInt(formValue.width),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseInt(value),
    });
  };

  useEffect(() => {
    dispatch.formValue.update({
      width: parseInt(values.width),
      height: parseInt(values.height),
    });
  }, [values]);

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700">Width (mm)</label>
          <input onChange={handleChange} name="width" value={values.width} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700">Height (mm)</label>
          <input onChange={handleChange} name="height" value={values.height} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
      </div>
    </div>
  );
};

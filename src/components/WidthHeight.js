import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export const WidthHeight = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    height: parseFloat(formValue.height),
    width: parseFloat(formValue.width),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseFloat(value),
    });
  };

  useEffect(() => {
    dispatch.formValue.update({
      width: parseFloat(values.width),
      height: parseFloat(values.height),
    });
  }, [values]);

  const handleSwap = () => {
    setValues({
      height: values.width,
      width: values.height,
    });
  };

  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700">Width (cm)</label>
          <input onChange={handleChange} name="width" value={values.width} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700">Height (cm)</label>
          <input onChange={handleChange} name="height" value={values.height} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">&nbsp;</label>

          <button className="rounded-md border-gray-200 border p-2 mt-1 hover:bg-gray-100" onClick={handleSwap}>
            <ArrowsRightLeftIcon className="h-5 w-5 " />
          </button>
        </div>
      </div>
    </div>
  );
};

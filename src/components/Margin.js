import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Margin = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [values, setValues] = useState(formValue.margin);

  const handleChange = (e) => {
    // const newValues = Object.assign(values, value);
    const { name, value } = e.target;

    const newValues = {
      ...values,
      [name]: parseInt(value),
    };
    setValues(newValues);
  };

  useEffect(() => {
    dispatch.formValue.update({
      margin: values,
    });
  }, [values]);

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-700 mb-2">Margin (mm)</label>
      <div className="flex gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-700">Top</label>
          <input name="top" onChange={handleChange} value={values.top} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Bottom</label>
          <input name="bottom" onChange={handleChange} value={values.bottom} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Left</label>
          <input name="left" onChange={handleChange} value={values.left} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">Right</label>
          <input name="right" onChange={handleChange} value={values.right} type="number" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
      </div>
    </div>
  );
};

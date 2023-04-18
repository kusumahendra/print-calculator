import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Diameter } from './Diameter';
import { WidthHeight } from './WidthHeight';

export const Shape = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const [value, setValue] = useState(formValue.shape);

  const options = [
    {
      label: 'Rectangle',
      value: 'rectangle',
    },
    {
      label: 'Circle',
      value: 'circle',
    },
    {
      label: 'Triangle',
      value: 'triangle',
    },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch.formValue.update({
      shape: value,
    });
  }, [value]);

  return (
    <div className="mb-4">
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700">Shape</label>
        <select value={value} name="paper-size" id="" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" onChange={handleChange}>
          {options.map((option, key) => {
            return (
              <option key={key} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      {value === 'circle' ? <Diameter /> : ''}
      {value === 'rectangle' ? <WidthHeight /> : ''}
      {value === 'triangle' ? <WidthHeight /> : ''}
    </div>
  );
};

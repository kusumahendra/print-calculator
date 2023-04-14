import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paperSize } from '../data';

export const PaperSize = () => {
  const options = paperSize;
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();

  const [value, setValue] = useState(formValue.paperSize);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    dispatch.formValue.update({
      paperSize: value,
    });
  }, [value]);

  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-700">Paper size</label>
      <select value={value} onChange={handleChange} name="paper-size" id="" className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm">
        {options.map((option, key) => {
          return (
            <option key={key} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

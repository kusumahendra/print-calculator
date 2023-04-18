import { useSelector } from 'react-redux';
import { PaperSize } from './components/PaperSize';
import { Margin } from './components/Margin';
import { Shape } from './components/Shape';
import { Gap } from './components/Gap';
import { paperSize } from './data';
import { useEffect, useState } from 'react';
import { Rectangles } from './components/Rectangles';
import { Canvas } from './components/Canvas';

function App() {
  const formValue = useSelector((state) => state.formValue);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [selectedPaperSize, setSelectedPaperSize] = useState({
    width: 0,
    height: 0,
  });
  const [paperInnerSize, setPaperInnerSize] = useState({
    width: 0,
    height: 0,
  });

  const calculateResult = () => {
    const selectedSize = paperSize.find((el) => el.value === formValue.paperSize);
    setSelectedPaperSize({ width: selectedSize.width, height: selectedSize.height });

    const innerWidth = selectedSize.width - (formValue.margin.left + formValue.margin.right);
    const innerHeight = selectedSize.height - (formValue.margin.top + formValue.margin.bottom);
    setPaperInnerSize({ width: innerWidth, height: innerHeight });

    let calculatedColumn = 0;
    let calculatedRow = 0;
    switch (formValue.shape) {
      case 'rectangle':
        calculatedColumn = Math.floor(innerWidth / (formValue.width + formValue.gap * 2));
        calculatedRow = Math.floor(innerHeight / (formValue.height + formValue.gap * 2));

        break;
      case 'circle':
        calculatedColumn = Math.floor(innerWidth / (formValue.diameter + formValue.gap * 2));
        calculatedRow = Math.floor(innerHeight / (formValue.diameter + formValue.gap * 2));
        break;
      default:
    }

    setRow(calculatedRow ?? 0);
    setColumn(calculatedColumn ?? 0);
  };

  useEffect(() => {
    calculateResult();
  }, [formValue]);

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-2xl	font-bold mb-8">Print size calculator</h1>

      <div className="flex gap-8">
        <div className="form max-w-md">
          <PaperSize />
          <Margin />
          <Shape />
          <Gap />

          <div className="mb-4 text-right">
            <button onClick={calculateResult} className="ml-auto inline-block rounded border border-indigo-600 px-10 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500" href="/download">
              Calculate
            </button>
          </div>
        </div>

        <div className=" px-8 py-6 rounded-md border-gray-200 w-full border">
          <h1 className="text-xl	font-bold mb-8">Result</h1>
          <div>
            Paper size: {selectedPaperSize.width} x {selectedPaperSize.height}
          </div>
          <div>
            Printable size: {paperInnerSize.width} x {paperInnerSize.height}
          </div>
          <div>Column: {column}</div>
          <div>Row : {row}</div>
          <div>Total : {row * column}</div>

          <Canvas />

          <div className="my-4 flex">
            <div
              style={{
                width: selectedPaperSize.width + 2,
                height: selectedPaperSize.height + 2,
              }}
              className="border-gray-400 bg-gray-100 border flex"
            >
              <div
                style={{
                  width: paperInnerSize.width + 2,
                  height: paperInnerSize.height + 2,
                  marginTop: formValue.margin.top - 1,
                  marginBottom: formValue.margin.bottom - 1,
                  marginLeft: formValue.margin.left - 1,
                  marginRight: formValue.margin.right - 1,
                }}
                className="border-gray-400 border border-dotted border-collapse"
              >
                {formValue.shape === 'rectangle' ? <Rectangles total={row * column} width={formValue.width} height={formValue.height} gap={formValue.gap} /> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

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

  return (
    <div className="container mx-4 lg:mx-auto my-16">
      <h1 className="text-2xl	font-bold mb-8">Print size calculator</h1>

      <div className="lg:flex gap-8">
        <div className="form max-w-md">
          <PaperSize />
          <Margin />
          <Shape />
          <Gap />

          {/* <div className="mb-4 text-right">
            <button onClick={calculateResult} className="ml-auto inline-block rounded border border-indigo-600 px-10 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500" href="/download">
              Calculate
            </button>
          </div> */}
        </div>

        <div className=" px-4 md:px-8 py-4 rounded-md border-gray-200 w-full border">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;

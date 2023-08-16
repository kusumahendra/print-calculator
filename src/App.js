import { PaperSize } from './components/PaperSize';
import { Shape } from './components/Shape';
import { Gap } from './components/Gap';
import { Canvas } from './components/Canvas';

function App() {
  return (
    <div className="container mx-4 lg:mx-auto my-16">
      <h1 className="text-2xl	font-bold mb-8">Print size calculator</h1>

      <div className="lg:flex gap-8">
        <div className="form max-w-md w-full">
          <PaperSize />
          {/* <Margin /> */}
          <Shape />
          <Gap />
        </div>

        <div className=" px-4 md:px-8 py-4 rounded-md border-gray-200 w-full border">
          <Canvas />
        </div>
      </div>
    </div>
  );
}

export default App;

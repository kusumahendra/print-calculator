import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paperSize as paperSizeData } from '../data';
import { formValue } from '../models/formValue';

export const Canvas = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();

  const [paperSize, setPaperSize] = useState({
    width: 0,
    height: 0,
  });
  const [paperInnerSize, setPaperInnerSize] = useState({
    width: 0,
    height: 0,
  });
  const [caclculatedColumn, setCalculatedColumn] = useState(0);
  const [caclculatedRow, setCalculatedRow] = useState(0);
  // const colorObject = '#6c5ce7';
  const colorObject = '#C7D2FE';

  useEffect(() => {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);
  });

  useEffect(() => {
    const selectedSize = paperSizeData.find((el) => el.value === formValue.paperSize);
    setPaperSize({
      width: selectedSize.width,
      height: selectedSize.height,
    });
    setPaperInnerSize({
      width: selectedSize.width - (formValue.margin.left + formValue.margin.right),
      height: selectedSize.height - (formValue.margin.top + formValue.margin.bottom),
    });
  }, [formValue]);

  useEffect(() => {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');

    ctx.setLineDash([0, 0]);
    ctx.clearRect(0, 0, c.width + 10, c.height + 10);
    // ctx.fillStyle = '#C7D2FE';
    ctx.lineWidth = 1;

    /* draw paper */

    // const paper = new createRectangle(0, 0, paperSize.width, paperSize.height, '#f6f6f6');

    ctx.fillStyle = '#f9f9f9';
    ctx.strokeStyle = '#999';
    ctx.fillRect(0, 0, paperSize.width, paperSize.height);
    ctx.strokeRect(0, 0, paperSize.width, paperSize.height);

    /* draw printable area */
    ctx.strokeStyle = '#2DD4F6';
    ctx.setLineDash([10, 5]);
    ctx.strokeRect(formValue.margin.left, formValue.margin.top, paperInnerSize.width, paperInnerSize.height);

    ctx.strokeStyle = '#999';
    ctx.fillStyle = colorObject;

    switch (formValue.shape) {
      case 'rectangle':
        drawRectangles();
        break;
      case 'circle':
        drawCircles();
        break;
      case 'triangle':
        drawTriangles();
        break;
      default:
        return;
        break;
    }
  }, [paperSize, paperInnerSize, formValue]);

  function drawRectangles() {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    const objWidth = formValue.width * 10;
    const objHeight = formValue.height * 10;
    const objGap = formValue.gap * 10;

    const totalColumn = Math.floor(paperInnerSize.width / (objWidth + objGap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (objHeight + objGap * 2)) ?? 0;

    setCalculatedColumn(totalColumn);
    setCalculatedRow(totalRow);

    let currentPos = {
      x: formValue.margin.left,
      y: formValue.margin.top,
    };

    if (totalRow) {
      Array.from(Array(totalRow), (er, ir) => {
        currentPos.x = formValue.margin.left;
        if (totalColumn) {
          Array.from(Array(totalColumn), (er, ir) => {
            /* draw object margin */
            ctx.setLineDash([2, 6]);
            ctx.strokeRect(currentPos.x, currentPos.y, objWidth + objGap * 2, objHeight + objGap * 2);

            /* draw object */
            ctx.setLineDash([0, 0]);
            // ctx.fillStyle = '#C7D2FE';
            ctx.fillRect(currentPos.x + objGap, currentPos.y + objGap, objWidth, objHeight);

            currentPos.x += objWidth + objGap * 2;
          });
          currentPos.y += objHeight + objGap * 2;
        }
      });
    }
  }

  function drawCircles() {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    console.log('draw circles');
    const objDiameter = formValue.diameter * 10;
    const objGap = formValue.gap * 10;

    const totalColumn = Math.floor(paperInnerSize.width / (objDiameter + objGap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (objDiameter + objGap * 2)) ?? 0;

    setCalculatedColumn(totalColumn);
    setCalculatedRow(totalRow);

    let currentPos = {
      x: formValue.margin.left,
      y: formValue.margin.top,
    };

    if (totalRow) {
      Array.from(Array(totalRow), (er, ir) => {
        currentPos.x = formValue.margin.left;
        if (totalColumn) {
          Array.from(Array(totalColumn), (er, ir) => {
            /* draw object margin */
            ctx.setLineDash([2, 6]);

            ctx.strokeRect(currentPos.x, currentPos.y, objDiameter + objGap * 2, objDiameter + objGap * 2);
            /* draw object */
            ctx.beginPath();
            ctx.setLineDash([0, 0]);
            // ctx.fillStyle = '#C7D2FE';
            ctx.arc(currentPos.x + objGap + objDiameter / 2, currentPos.y + objGap + objDiameter / 2, objDiameter / 2, 0, 2 * Math.PI);
            ctx.fill();
            currentPos.x += objDiameter + objGap * 2;
          });

          currentPos.y += objDiameter + objGap * 2;
        }
      });
    }
  }

  function drawTriangles() {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    const objWidth = formValue.width * 10;
    const objHeight = formValue.height * 10;
    const objGap = formValue.gap * 10;

    let yGap = ((objWidth + objGap * 2) / objWidth) * objHeight - objHeight;

    let totalColumn = Math.floor(paperInnerSize.width / (objWidth + objGap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (objHeight + yGap * 2)) ?? 0;

    if ((objWidth * 1 + objGap * 2) * totalColumn + (objWidth + objGap * 2) / 2 > paperInnerSize.width) {
      totalColumn *= 2;
      totalColumn -= 1;
    } else {
      totalColumn *= 2;
    }

    setCalculatedColumn(totalColumn);
    setCalculatedRow(totalRow);

    let currentPos = {
      x: formValue.margin.left,
      y: formValue.margin.top,
    };
    if (totalRow) {
      Array.from(Array(totalRow), (er, ir) => {
        currentPos.x = formValue.margin.left;
        if (totalColumn) {
          Array.from(Array(totalColumn), (ec, ic) => {
            if (ic % 2 === 0) {
              /* draw object margin */
              ctx.setLineDash([2, 4]);
              ctx.beginPath();
              ctx.moveTo(currentPos.x + objWidth / 2 + objGap, currentPos.y);
              // ctx.lineTo(currentPos.x, currentPos.y + objHeight + pyt);
              // ctx.lineTo(currentPos.x + objWidth + pyt * 2ntPos.y + objHeight + pyt);
              ctx.lineTo(currentPos.x, currentPos.y + objHeight + yGap);
              ctx.lineTo(currentPos.x + objWidth + objGap * 2, currentPos.y + objHeight + yGap);
              ctx.closePath();
              ctx.stroke();

              /* draw object */
              ctx.setLineDash([0, 0]);
              // ctx.fillStyle = '#C7D2FE';
              ctx.beginPath();

              ctx.moveTo(currentPos.x + objWidth / 2 + objGap, currentPos.y + yGap);
              ctx.lineTo(currentPos.x + objGap, currentPos.y + objHeight + yGap);
              ctx.lineTo(currentPos.x + objWidth + objGap, currentPos.y + objHeight + yGap);
              ctx.closePath();
              ctx.fill();
              // if (ir === totalRow - 1 && ic == 0) {
              //   console.log('---');
              //   console.log('top height', currentPos.y);
              //   console.log('height', objHeight + yGap);
              //   console.log('end', currentPos.y + objHeight + yGap +yGap);
              // }
            } else {
              ctx.setLineDash([1, 4]);
              ctx.beginPath();
              // const startX = currentPos.x - objWidth / 2 - objGap;
              ctx.moveTo(currentPos.x, currentPos.y);
              ctx.lineTo(currentPos.x + objWidth + objGap * 2 + objGap - objGap, currentPos.y);
              ctx.lineTo(currentPos.x + objWidth / 2 + objGap, currentPos.y + objHeight + yGap);
              ctx.closePath();
              ctx.stroke();

              /* draw object */
              ctx.setLineDash([0, 0]);
              // ctx.fillStyle = '#C7D2FE';
              ctx.beginPath();
              ctx.moveTo(currentPos.x + objGap, currentPos.y);

              ctx.lineTo(currentPos.x + objWidth + objGap, currentPos.y);
              ctx.lineTo(currentPos.x + objWidth / 2 + objGap, currentPos.y + objHeight);
              ctx.closePath();
              ctx.fill();
            }
            // currentPos.x += objWidth + objGap * 2;
            currentPos.x += objWidth / 2 + objGap;
          });
          currentPos.y += objHeight + yGap * 2;
        }
      });
    }
  }

  return (
    <div className="my-4">
      <div className="relative overflow-x-auto mb-4">
        <table className="text-sm text-left">
          <tbody>
            <tr className="border-b border-gray-300">
              <th className="pr-2 py-2">Paper Size</th>
              <td className="px-2 py-2">
                {paperSize.width} x {paperSize.height} mm ({formValue.paperSize})
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="pr-2 py-2">Printable size</th>
              <td className="px-2 py-2">
                {paperInnerSize.width} x {paperInnerSize.height} mm
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="pr-2 py-2">Column</th>
              <td className="px-2 py-2">{caclculatedColumn}</td>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="pr-2 py-2">Row</th>
              <td className="px-2 py-2">{caclculatedRow}</td>
            </tr>
            <tr className="">
              <th className="pr-2 py-2">Total</th>
              <td className="px-2 py-2">{caclculatedColumn * caclculatedRow}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="block"></div>
      <canvas id="canvas" width={paperSize.width + 100} height={paperSize.height + 100}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
};

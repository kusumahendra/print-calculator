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
    ctx.fillStyle = '#C7D2FE';

    ctx.lineWidth = 1;

    /* draw paper */

    // const paper = new createRectangle(0, 0, paperSize.width, paperSize.height, '#f6f6f6');

    ctx.fillStyle = '#f6f6f6';
    ctx.strokeStyle = '#999';
    ctx.fillRect(0, 0, paperSize.width, paperSize.height);
    ctx.strokeRect(0, 0, paperSize.width, paperSize.height);

    /* draw printable area */
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(formValue.margin.left, formValue.margin.top, paperInnerSize.width, paperInnerSize.height);

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

    console.log('draw rectangle');
    const totalColumn = Math.floor(paperInnerSize.width / (formValue.width + formValue.gap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (formValue.height + formValue.gap * 2)) ?? 0;

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
            ctx.setLineDash([1, 2]);
            ctx.strokeRect(currentPos.x, currentPos.y, formValue.width + formValue.gap * 2, formValue.height + formValue.gap * 2);

            /* draw object */
            ctx.setLineDash([0, 0]);
            ctx.fillStyle = '#C7D2FE';
            ctx.fillRect(currentPos.x + formValue.gap, currentPos.y + formValue.gap, formValue.width, formValue.height);

            currentPos.x += formValue.width + formValue.gap * 2;
          });
          currentPos.y += formValue.height + formValue.gap * 2;
        }
      });
    }
  }

  function drawCircles() {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');
    console.log('draw circles');
    const totalColumn = Math.floor(paperInnerSize.width / (formValue.diameter + formValue.gap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (formValue.diameter + formValue.gap * 2)) ?? 0;

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

            ctx.setLineDash([1, 2]);
            ctx.strokeRect(currentPos.x, currentPos.y, formValue.diameter + formValue.gap * 2, formValue.diameter + formValue.gap * 2);
            /* draw object */
            ctx.beginPath();
            ctx.setLineDash([0, 0]);
            ctx.fillStyle = '#C7D2FE';
            ctx.arc(currentPos.x + formValue.gap + formValue.diameter / 2, currentPos.y + formValue.gap + formValue.diameter / 2, formValue.diameter / 2, 0, 2 * Math.PI);
            ctx.fill();
            currentPos.x += formValue.diameter + formValue.gap * 2;
          });

          currentPos.y += formValue.diameter + formValue.gap * 2;
        }
      });
    }
  }
  function drawTriangles() {
    const c = document.getElementById('canvas');
    const ctx = c.getContext('2d');

    console.log('draw rectangle');
    const totalColumn = Math.floor(paperInnerSize.width / (formValue.width + formValue.gap * 2)) ?? 0;
    const totalRow = Math.floor(paperInnerSize.height / (formValue.height + formValue.gap * 2)) ?? 0;

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
            ctx.setLineDash([1, 2]);
            ctx.strokeRect(currentPos.x, currentPos.y, formValue.width + formValue.gap * 2, formValue.height + formValue.gap * 2);

            /* draw object */
            ctx.setLineDash([0, 0]);
            ctx.fillStyle = '#C7D2FE';
            ctx.beginPath();
            const topPoint = [currentPos.x + formValue.width / 2 + formValue.gap, currentPos.y + formValue.gap];
            const leftPoint = [currentPos.x + formValue.gap, currentPos.y + formValue.height + formValue.gap];
            const rightPoint = [currentPos.x + formValue.width + formValue.gap, currentPos.y + formValue.height + formValue.gap];
            console.log(topPoint);
            console.log(leftPoint);
            console.log(rightPoint);
            console.log('------');
            ctx.moveTo(currentPos.x + formValue.width / 2 + formValue.gap, currentPos.y + formValue.gap);
            ctx.lineTo(currentPos.x + formValue.gap, currentPos.y + formValue.height + formValue.gap);
            ctx.lineTo(currentPos.x + formValue.width + formValue.gap, currentPos.y + formValue.height + formValue.gap);
            ctx.closePath();
            ctx.fill();

            currentPos.x += formValue.width + formValue.gap * 2;
          });
          currentPos.y += formValue.height + formValue.gap * 2;
        }
      });
    }
  }

  return (
    <div className="my-4">
      <div className="block">{formValue.paperSize}</div>
      <canvas id="canvas" width={paperSize.width + 100} height={paperSize.height + 100}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paperSize as paperSizeData } from '../data';

export const Canvas = () => {
  const formValue = useSelector((state) => state.formValue);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);

  const [ctx, setCtx] = useState(null);

  const [paperSize, setPaperSize] = useState({
    width: 0,
    height: 0,
  });
  const [paperInnerSize, setPaperInnerSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const c = document.getElementById('canvas');
    setCtx(c.getContext('2d'));
  });

  useEffect(() => {
    if (ctx) {
      ctx.translate(0.5, 0.5);
    }
  }, [ctx]);

  useEffect(() => {
    console.log('run papersizedata');
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
    console.log(ctx);
    if (!ctx) {
      return;
    }
    const c = document.getElementById('canvas');

    ctx.setLineDash([0, 0]);
    ctx.clearRect(0, 0, c.width + 10, c.height + 10);
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
    drawRectangles();
  }, [paperSize, paperInnerSize, formValue]);

  function drawRectangles() {
    console.log('rectanglesss');
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

  return (
    <div className="my-4">
      <div className="block">{formValue.paperSize}</div>
      <canvas id="canvas" width={paperSize.width + 100} height={paperSize.height + 100}>
        Your browser does not support the HTML canvas tag.
      </canvas>
    </div>
  );
};

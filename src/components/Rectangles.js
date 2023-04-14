export const Rectangles = ({ width, height, gap, total }) => {
  return (
    <div className="flex flex-wrap">
      {total
        ? Array.from(Array(total), (e, i) => {
            return (
              <div
                key={i}
                style={{
                  padding: gap,
                  // width: width + gap * 2,
                  // height: height + gap * 2,
                }}
                className="inline-block border-indigo-400 border-dotted  border-collapse"
              >
                <div
                  style={{
                    width: width,
                    height: height,
                  }}
                  className="block bg-indigo-200 w-full h-full"
                ></div>
              </div>
            );
          })
        : ''}
    </div>
  );
};

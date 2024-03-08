import { useRef, useEffect, Fragment } from "react";
import { Rect, Circle, Line, Transformer, Text } from "react-konva";

export default function TransformShape({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    if (shapeProps.type === "line") {
      const updatedPoints = [
        node.points()[0] + node.x(),
        node.points()[1] + node.y(),
        node.points()[2] + node.x(),
        node.points()[3] + node.y() + node.height() * scaleY,
      ];

      const updatedShapeProps = {
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        points: updatedPoints,
      };

      // Log the drawing data
      console.log("Updated Drawing Data:", updatedShapeProps);

      onChange(updatedShapeProps);
    } else if (shapeProps.type === "text") {
      const updatedShapeProps = {
        ...shapeProps,
        x: node.x(),
        y: node.y(),
      };

      // Log the drawing data
      console.log("Updated Drawing Data:", updatedShapeProps);

      onChange(updatedShapeProps);
    } else {
      const updatedShapeProps = {
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
      };

      // Log the drawing data
      console.log("Updated Drawing Data:", updatedShapeProps);

      onChange(updatedShapeProps);
    }
  };

  return (
    <Fragment>
      {shapeProps.type === "rectangle" && (
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(5, node.height() * scaleY),
            });
          }}
        />
      )}

      {shapeProps.type === "circle" && (
        <Circle
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={(e) => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={(e) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              radius: Math.max(5, node.radius() * scaleX),
            });
          }}
        />
      )}

      {shapeProps.type === "line" && (
        <Line
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={handleDragEnd}
        />
      )}

      {shapeProps.type === "text" && (
        <Text
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={handleDragEnd}
        />
      )}

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (shapeProps.type === "line") {
              newBox.width = Math.abs(newBox.width);
              newBox.height = Math.abs(newBox.height);
            }

            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  );
}

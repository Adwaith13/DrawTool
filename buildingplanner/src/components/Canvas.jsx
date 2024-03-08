import { useState } from "react";
import ToolBar from "./ToolBar";
import { Stage, Layer } from "react-konva";
import TransformShape from "./TransformShapes";

export default function Canvas() {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const createShape = (shapeType) => {
    let newShape;
    switch (shapeType) {
      case "rectangle":
        newShape = {
          type: shapeType,
          x: 50,
          y: 50,
          width: 100,
          height: 50,
          fill: "rgba(255,255,255, 0.9)",
          stroke: "black",
        };
        break;
      case "circle":
        newShape = {
          type: shapeType,
          x: 100,
          y: 100,
          radius: 50,
          fill: "rgba(255,255,255, 0.9)",
          stroke: "black",
        };
        break;
      case "line":
        newShape = {
          type: shapeType,
          points: [10, 10, 100, 10],
          fill: "rgba(255,255,255, 0.9)",
          stroke: "black",
          strokeWidht: 0,
        };
        break;
      default:
        newShape = { type: shapeType };
    }

    setShapes([...shapes, newShape]);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div>
      <ToolBar onCreateShape={createShape} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          {shapes.map((shape, index) => (
            <TransformShape
              key={index}
              shapeProps={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => {
                selectShape(shape.id);
              }}
              onChange={(newAttrs) => {
                const updatedShapes = shapes.slice();
                updatedShapes[index] = newAttrs;
                setShapes(updatedShapes);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

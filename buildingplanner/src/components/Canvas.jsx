import { useState, useEffect } from "react";
import ToolBar from "./ToolBar";
import { Stage, Layer, Text } from "react-konva";
import TransformShape from "./TransformShapes";
import { saveDrawing } from "../apis/saveDrawing";
import { getDrawing } from "../apis/getDrawing";

export default function Canvas() {
  const [shapes, setShapes] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [textCreationMode, setTextCreationMode] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState("");

  let updatedShapes;

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
      case "text":
        newShape = {
          type: shapeType,
          text: displayText,
          x: textPosition.x,
          y: textPosition.y,
          fontSize: 16,
          fontFamily: "Arial",
          fill: "black",
          align: "left",
          verticalAlign: "top",
        };
        break;
      default:
        newShape = { type: shapeType };
    }
    updatedShapes = [...shapes, newShape];
    setShapes(updatedShapes);
  };

  const handleStageClick = () => {
    if (textCreationMode) {
      createShape("text", textPosition);
      setTextPosition({ x: 0, y: 0 });
    }
  };

  const handleTextButtonClick = () => {
    setTextCreationMode(!textCreationMode);
  };

  const handleTextChange = (e) => {
    setDisplayText(e.target.value);
  };

  const handleTextSubmit = () => {
    if (textCreationMode && displayText.trim() !== "") {
      createShape("text", textPosition);
    }
  };

  useEffect(() => {
    const stage = document.getElementById("canvas-stage");
    stage.addEventListener("click", handleStageClick);

    return () => {
      stage.removeEventListener("click", handleStageClick);
    };
  }, [textCreationMode]);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (shapes.length > 0) {
      const save = async () => {
        try {
          const payload = await saveDrawing(shapes, token);
          console.log(payload);
        } catch (error) {
          console.log(error);
        }
      };
      save();
    }
  }, [shapes, token]);

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const shapesData = await getDrawing(token);
        setShapes(shapesData.shapes || []);
        console.log(shapesData.shapes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrawing();
  }, [token]);

  useEffect(() => {
    const retrievedShapes = localStorage.getItem("shapes");
    const initialShapes = retrievedShapes ? JSON.parse(retrievedShapes) : [];
    setShapes(initialShapes);
  }, []);

  return (
    <div>
      <ToolBar
        onCreateShape={createShape}
        onTextButtonClick={handleTextButtonClick}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      />
      <Stage
        id="canvas-stage"
        width={window.innerWidth}
        height={window.innerHeight}
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
          {textCreationMode && (
            <Text
              x={textPosition.x}
              y={textPosition.y}
              text={displayText}
              fontSize={16}
              fontFamily="Arial"
              fill="black"
              align="left"
              verticalAlign="top"
            />
          )}
        </Layer>
      </Stage>
      {textCreationMode && (
        <div>
          <label>
            Text:
            <input
              type="text"
              value={displayText}
              onChange={handleTextChange}
            />
          </label>
          <button onClick={handleTextSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

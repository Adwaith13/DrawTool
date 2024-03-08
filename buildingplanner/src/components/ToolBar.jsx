export default function ToolBar({ onCreateShape, onTextButtonClick }) {
  const handleButtonClick = (shapeType) => {
    onCreateShape(shapeType);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("rectangle")}>Rectangle</button>
      <button onClick={() => handleButtonClick("circle")}>Circle</button>
      <button onClick={() => handleButtonClick("line")}>Line</button>
      <button onClick={() => onTextButtonClick()}>Text</button>
    </div>
  );
}

export default function ToolBar({ onCreateShape }) {
  const handleButtonClick = (shapeType) => {
    onCreateShape(shapeType);
  };

  return (
    <div>
      <button onClick={() => handleButtonClick("rectangle")}>Rectangle</button>

      <button onClick={() => handleButtonClick("circle")}>Circle</button>
      <button onClick={() => handleButtonClick("line")}>Line</button>
    </div>
  );
}

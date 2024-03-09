import styles from "../styles/toolbar.module.css";

export default function ToolBar({ onCreateShape, onTextButtonClick }) {
  const handleButtonClick = (shapeType) => {
    onCreateShape(shapeType);
  };

  return (
    <div className={styles.toolbar}>
      <button
        onClick={() => handleButtonClick("rectangle")}
        className={styles.rectangle}
      >
        Rectangle
      </button>
      <button
        onClick={() => handleButtonClick("circle")}
        className={styles.circle}
      >
        Circle
      </button>
      <button onClick={() => handleButtonClick("line")} className={styles.line}>
        Line
      </button>
      <button onClick={() => onTextButtonClick()} className={styles.text}>
        Text
      </button>
    </div>
  );
}

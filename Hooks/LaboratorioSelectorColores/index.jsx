const { useState } = React;

const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  return (
    <div id="color-picker-container" style={{ backgroundColor: color }}>
      <label htmlFor="color-input">Color</label>
      <input id="color-input" type="color" value={color} onChange={handleColor} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ColorPicker />);
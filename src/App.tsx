import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return <div className="text-center selection:bg-green-900">Hello World</div>;
}

export default App;

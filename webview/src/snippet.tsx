import "./codeSnap.css";

export default function Snippet() {
  return (
    <div className="flex-1 w-full overflow-auto flex justify-center p-0">
      <div id="snippet-scroll">
        <div id="snippet-container">
          <div id="window">
            <div id="navbar">
              <div id="window-controls">
                <div className="red dot"></div>
                <div className="yellow dot"></div>
                <div className="green dot"></div>
              </div>
              <div id="window-title"></div>
            </div>
            <div id="snippet"></div>
          </div>
        </div>
      </div>

      <div id="flash-fx"></div>

    </div>
  );
}

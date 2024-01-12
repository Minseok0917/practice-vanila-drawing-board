- scripts

  - share
  - drawing-board
    - components
    - constants
    - layers : canvasLayer
    - tools

- drawing-board

  - layer-container shape-layer
    - canvas
  - layer-container rendering-layer
    - canvas

- layerManger

  - layerState : $layerContainer, $canvas, context
  - layerComponent (layerState, setter:$layer-container.shape-layer,$canvas)
  - layerHandler
    - handleMouse(layerState)

- drawingBoard
  - drawingBoardState
  - drawingBoardToolManger
  - drawingBoardComponentManger
    - layer
      - component.layer-shape.js
      - component.layer-rendering.js
      - layer.manager.js (layer display management)
    - componeont.drawing-board.js
    - component.manager.js (layer append)

아 어지럽다...

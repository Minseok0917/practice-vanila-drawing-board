기능 구현 목록 : 터치, 선택, 네모, 타원

HTML 구조를 Vue 컴포넌트 구조로 다뤘을 때

```vue
<template>
  <ExcalidrawApp>
    <ExcalidrawContainer class="rendering-container">
      <ExcalidrawRenderingCanvas />
    </ExcalidrawContainer>
    <ExcalidrawContainer class="working-container">
      <ExcalidrawWorkingCanvas />
    </ExcalidrawContainer>
    <ExcalidrawContainer class="tool-container"></ExcalidrawContainer>
  </ExcalidrawApp>
</template>
```

- app
  - renderingContainer
  - workingContainer
  - toolContainer

working mode 일 때는 ui container 대상 특성 함수 실행을 시켜야함  
status 기반 조작

기본적인 유틸 클래스를

Element
Context

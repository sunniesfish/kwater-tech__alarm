/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Worker 모듈 선언
declare module "*?worker" {
  // Worker 생성자 타입
  class WorkerConstructor extends Worker {
    constructor();
  }

  export default WorkerConstructor;
}

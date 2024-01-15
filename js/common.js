import { ElementFactory } from "./@share/elementFactory.js";
import { Context } from "./@share/context.js";
import { CONTEXT_SHAPE_ACTIONS, ContextPathRect, ContextPathEllipse } from "./@share/contextPath.js";

const $app = document.getElementById("app");
const $canvas = ElementFactory.createElement("canvas");
const context = new Context($canvas);

$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;
$app.append($canvas);

context.beginPath();

const shapes = [
  { name: "RECT", x: 0, y: 0, width: 100, height: 100 },
  { name: "ELLIPSE", x: 200, y: 200, rx: 30, ry: 30 },
].map((shape) => {
  const shapeAction = CONTEXT_SHAPE_ACTIONS.get(shape.name);
  return new shapeAction(shape);
});

shapes.forEach((contextPath) => context.fill(contextPath.path));

console.log(JSON.stringify(shapes));

/* 
    데이터 구조로 생각했을 때
    저장을 한다고 가정하면 localStorage 또는 indexedDB 
    페이지로 가져왔을 때 직렬화를 해야하는가? 렌더링을 할 떄마다 인스턴스를 만드는건 상당한 소비이긴함

    직렬화가 맞음
    직렬화를 하지 않았을 경우에는 배열에 따로 인스턴스 정보가 아닌 다른 정보를 담고 있었어야했는데 그게 아니였네

    context 객체를 인스턴스로 넘기느냐
    또는 context 에 path 를 넘기느냐인데

    인스턴스가 배열로 존재하는건 거의 확정임     
    draw 를 하는 순간은 솔직히 업데이트의 밖에 없긴함 (후자가 맞는듯.. 그래도 context 객체인데)

    [].forEach( contextPath => contextPath.fill(context) ) 
    [].forEach( contextPath => context.fill(contextPath.path) )

    생성자에 setter 도 해놔야될 듯함.....  
    결국 저 draw 는 수정할 때 사용하는 용도임 
    하지만 처음부터 계속 하진 않음 

    여기서 중요한건 기존 x,y,width, height 를 저장을 해야되냐는 여부
    일단 작업 캔버스 기준으로 contexPath 는 싱글턴인게 좋긴함
    매번 인스턴스를 생성하면서 렌더링을 하는건 좋은 방법은 아니긴함 따로 조건으로 비교해야되니깐      
    - 나중에 전용 싱클턴을 만들던가, 조건을 걸어서 해결하는 해야될 듯하긴하네
    - x,y, width, height 는 결국 로컬스토리지용이긴함
        -  class 를 JSON.stringify를 했을 떄 public 필드만 오브젝트 구조로 변함

    1번째 로컬스토리기반으로 관리를 해야되기 때문에 
    매번 인스턴스를 만드는건 어쩔수 없다고 생각함 (최적화 방법은 캐싱정도?)         

    아니면 브라우저로 로딩후 처음에는 직렬화로 가져오고 이후에는 따로 저장하는 방법도 있긴함            
    하지만 인스턴스를 객체지향으로 한다고 private로 관리하면 이제 안되는거기 때문에 거기서 끝인듯 ㅅㅂ...   

    그러면 일단 localStorage를 고려해서 작업해야될듯


*/

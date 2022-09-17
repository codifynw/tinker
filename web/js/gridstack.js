import jQuery from "jquery";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";

import "../css/styles.css";

console.log(jQuery);
window.$ = window.jQuery = jQuery;

function init() {
  // const gridWraps = $(".grid-stack");

  // gridWraps.each(function (gridWrap) {
  //   console.log(gridWrap);
  //   const grid = GridStack.init({}, gridWrap[0]);
  //   console.log(grid);
  // });

  let grids = GridStack.initAll();
}

init();

// Main javascript entry point
// Should handle bootstrapping/starting application

"use strict";

import "core-js";
import "regenerator-runtime/runtime";
import $ from "jquery";

import { TablePreview } from "../_modules/table-preview/table-preview";

window.$ = jQuery;

$(() => {
  new TablePreview();

  // JavaScript hack for opening links into new windows if target="_blank" is not set
  let a = new RegExp("/" + window.location.host + "/");
  $("a").on("click", function() {
    if (!a.test(this.href)) {
      window.open($(this).attr("href"));
      return false;
    }
  });

  // Warning alert for leaving the page
  // window.onbeforeunload = function (e) {
  //     e = e || window.event;

  //     // For IE and Firefox prior to version 4
  //     if (e) {
  //         e.returnValue = 'Any string';
  //     }

  //     // For Safari
  //     return 'Any string';
  // };

  console.log("I'm a drupal firestarter!!!");
});

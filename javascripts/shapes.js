$(function() {
  var $canvas = $("#canvas");

  function getFormObject($f) {
    var o = {};

    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });
    
    return o;
  }

  function createDiv(dataObj) {
    var $d = $("<div>", {
      "class": dataObj.shape_type,
      data: dataObj,
    });

    resetElement($d);

    return $d;
  }

  function resetElement($element) {
    var data = $element.data();

    $element.css({
      left: +data.start_x,
      top: +data.start_y,
    });
  }

  function animateElement() {
    var $element = $(this);
    var data = $element.data();
    
    resetElement($element);

    $element.stop().animate({
      left: data.end_x,
      top: data.end_y
    }, +data.duration, "linear")
  }

  function stopAnimations() {
    $canvas.find("div").stop();
  }

  $("form").on("submit", function(e) {
    e.preventDefault();

    var $f = $(this);
    var data = getFormObject($f);
    
    $canvas.append(createDiv(data));
  });

  $("#animate").on("click", function(e) {
    e.preventDefault();

    $canvas.find("div").each(animateElement);
  });

  $("#stop").on("click", function(e) {
    e.preventDefault();
    stopAnimations();
  });
});
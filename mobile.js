//Hooks.on("init", () => {CONFIG.debug.hooks = true})
Hooks.once('init', function() {

	game.settings.register('simplemobile', 'lasttoken', {
        name: 'Last Token',
        hint: 'This is the value where the last selected token will be saved',
        scope: 'client',
        config: false,
        default: "0",
		type: String,
    }); 
	game.settings.register('simplemobile', 'movementdirection', {
        name: 'Movement Swich',
        hint: 'This is the value the movement values is saved',
        scope: 'client',
        config: false,
        default: "",
        type: String,
    }); 
	game.settings.register('simplemobile', 'cps', {
        name: 'Camera Pan Speed',
        hint: 'How many pixels the camera pans when tapping on the screen',
        scope: 'world',
        config: true,
        default: "25",
        type: String,
    }); 
	game.settings.register('simplemobile', 'autorotation', {
        name: 'Auto Rotate',
        hint: 'Automatically Rotate tokens based on where they are going',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean,
    });
 	game.settings.register('simplemobile', 'invertrotation', {
        name: 'Invert Rotation',
        hint: 'Inverts the rotation of the token',
        scope: 'client',
        config: true,
        default: true,
        type: Boolean,
    });
  	game.settings.register('simplemobile', 'performanceop', {
        name: 'Performance Optimization',
        hint: 'Limits the functionality of simple mobile to optimize it for slower devices, also disabled the canvas (where scenes are rendered on)',
        scope: 'client',
        config: true,
        default: false,
        type: Boolean,
    }); 
	

});
Hooks.on('preRenderActorSheet5eCharacter', () => {
	const container = document.querySelector('. container')
	container.scrollTop
	container.scrollLeft
});
Hooks.on('canvasInit', () => {
	if(game.settings.get('simplemobile', 'performanceop') & window.screen.width < 1080){
		
		var node = document.getElementById("board");
		if (node.parentNode) {
		  node.parentNode.removeChild(node);
		}
	console.log("performance optimised");
	let mi = document.querySelector("#mobile-container");


	}
});

Hooks.on('canvasReady', function(){
    function opencontrols() {
        Controls = new Controls();
        Controls.openDialog();
	}
  opencontrols();
  let charname = game.user.charname
  console.log("mobile initialised");
  document.getElementById('board').ontouchstart = function (event) {
  console.log("Touchstart");
  var x = event.touches[0].clientX;
  var y = event.touches[0].clientY;
  console.log("Moving Canvas to: "+"X:"+ x + " Y:" + y);
  let options = {
  animationSpeed: 250,      // The total time in milliseconds for the animation to take
  panSpeed: 100             // The panning speed in pixels per second, only used if animationSpeed is not specified
  };
  let tapcameraspeed = parseInt(game.settings.get('simplemobile', 'cps'));
  let view = canvas.scene._viewPosition;
  if (x<= screen.width/3){
  view.x -= tapcameraspeed;
  }
  else if (x>= screen.width - screen.width/3){
  view.x += tapcameraspeed;
  }
  if (y<= screen.height/4){
	view.y -= tapcameraspeed  
  }
  else if (y>= screen.height - screen.height/4){
  view.y += tapcameraspeed;
  }
  canvas.animatePan({duration: 25, x: view.x, y: view.y, scale: view.scale});
  console.log("canvas moved");

}
	canvas.tokens.ownedTokens.length
});
export class Controls extends Application {
    openDialog() {
        let $dialog = $('.Controls-window');
        if ($dialog.length > 0) {
            $dialog.remove();
            return;
        }
        const templateData = { data: [] };
		templateData.title = "Controls";
		templateData.user = game.userId;
		templateData.charname = game.user.charname;
        const templatePath = "/modules/simplemobile/mobile-controls.html";;
		console.log(templateData);
		this.appId = "mobile-controls";
		Controls.renderMenu(templatePath, templateData);
	}
    static renderMenu(path, data) {
        const dialogOptions = {
            width: 300,
            top: event.clientY - 80,
            left: window.innerWidth - 510,
            classes: ['Controls-window'],
			id: 'mobile-controls'
        };
        renderTemplate(path, data).then(dlg => {
            new Dialog({
                content: dlg,
                buttons: {}
            }, dialogOptions).render(true);
        });
    }

}

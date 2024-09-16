// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl, tl2;

////////////////////////////////////////////////////////////////////////
// @FT1 - code block start
//VARIABLE DECLARATIONS
var thisFeedLoaded=false;
var showDefault=false;
var ctURL = "";


var default_exit = myFT.$("#default_exit");

default_exit.on('click',function(){
  myFT.clickTag(1,ctURL);
});

myFT.on('instantads',function(){
      ctURL=myFT.instantAds.Retail_default_clickTag_URL
      myFT.dispatch('RL1_available');

    });
    myFT.on('theFeedLoaded', function(e) {
      console.log('RL1: Richload recieved feed from Base file)');
      feedLoaded(e.a);
    });
    myFT.on('RL1_play', function () {
      init();
    });
    /*
    ////////////////////////////////////////////////
       LOADING FEED START
    ////////////////////////////////////////////////

    Please note: JetBlue setup has feeds loading form the base file and then passed into richLoads via a custom event
    called 'theFeedLoaded'.
    */
    function feedLoaded(feedItems) {
      let partner_logo_src = feedItems[0].image_logo_728x250;

      //testing swap between layouts for partner logo
      partner_logo_src = './images/partner_logo.png'

      if(partner_logo_src == "n/a"){
        //no partner logo included in feed, do nothing
      }else{
        //partner logo included in feed
        // console.log('partner logo included!')
        // document.getElementById('logoHolder').style.justifyContent = 'space-between'
        // document.getElementById('partner_logo_container').style.width = '116px'


        // var partner_logo_img = myFT.$("#partner_logo_img");
        // partner_logo_img[0].src=partner_logo_src;
      }

      if(!thisFeedLoaded){
        thisFeedLoaded=true;
        try {
          /*Setting variable values from loaded feed (FEED PASSED THROUGH THE --theFeedLoaded-- CUSTOM EVENT)*/
          /*For example: the following variable ctURL is used to pass a url from feed into a dynamic clickTag*/
          ctURL = feedItems[0]['url'];
          //This variable will be passed through clicktag (inside clickEvent handler below) as a parameter
          //myFT.clickTag(1, ctURL);
          //If using dynamic text, set variables values to feed or dynamic variables setup in manifest/versions within instandAd*/
        } catch (e) {
          showDefault = true;
        }
        setupContent();
      }
    }
    function setupContent() {
      //Populate dynamic text with feed and/or dynamic variable data here
      //Once all dynamic content has been populated, dispatch event to the base file to notify richload 1 ready to start playing
      myFT.dispatch('RL1_ready_to_play');
    }

// @FT1 - code block end
///////////////////////////////////////////////////////////////////////////////////////


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax();
  tl2 = new TimelineMax();

  animate();
  setRollover();

}

function animate() {
  //make parent (base file) border black
  window.parent.document.getElementById("border").style.borderColor="#000"

  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });
  tl.set(["#photo, #photo2"], { rotationZ: 0.1, force3D:true});
  tl.set(["#photo2"], { x:640});

  tl.addLabel('frame_1', 0)

  .to('#photo', 4, { x:"-=60",  ease:"none" }, "frame_1")
  .to(['#h1'], 0.5, { top:31, autoAlpha: 1, ease: Power1.easeInOut }, "frame_1+=1")
  .to(['#h1'], 0.5, {  autoAlpha: 0, ease: Power1.easeInOut }, "frame_1+=3.3")


  tl.addLabel('frame_END', '+=4.5')    
  tl.addLabel('frame_2', 3.5)
  .to(['#photo, #photo2'], .5, {  x:"-=728", ease: Power1.easeInOut })
  .to(['#h1b, #h2'], 0.5, { top:19, autoAlpha: 1, ease: Power1.easeInOut }, "frame2")
  .to('#photo2', 5, { x:"-=60", ease:"none" }, "frame_2+=1")


    ////////////////////////////////////////
    //@FT2 code block start
    .call(playEndframe, ["param1"], 'frame_END')
    //@FT2 code block end
    ////////////////////////////////////////


}
////////////////////////////////////////
//@FT3 code block start
function playEndframe(param1){
  myFT.dispatch('init_RL2');
}
//@FT3 code block end
////////////////////////////////////////

function buildingAnimation () {
  const tl = new TimelineMax({ repeat: 5 });

  tl.to('#bubbles-1', 0, { autoAlpha: 1 }, 0)
  .to('#bubbles-1', 0, { autoAlpha: 0 }, 0.25)
  .to('#bubbles-2', 0, { autoAlpha: 1 }, 0.25)
  .to('#bubbles-2', 0, { autoAlpha: 0 }, 0.5)
  .to('#bubbles-3', 0, { autoAlpha: 1 }, 0.5)
  .to('#bubbles-3', 0, { autoAlpha: 0 }, 0.75)
  .to('#bubbles-1', 0, { autoAlpha: 1 }, 0.75)
}


// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}
////////////////////////////////////////
//@FT4 code block start

// End timer custom event listener (dispatched from RL2 when animation complete)
myFT.on('stopTimer',function(){
  // show total banner animation time in browser console.
  var endTime = new Date();
  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
})

//@FT4 code block end
////////////////////////////////////////

//get current year
const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerHTML = year;
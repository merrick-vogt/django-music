// Sassy To-Do List
// Create a to-do list that can take in user input

var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var inspiration = document.getElementById("inspiration");
var li = document.getElementsByClassName("listItem")

function inputLength() {
    return input.value.length;
}

function createListElement() {
    var li = document.createElement("li");
    li.classList.add('listItem');
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    input.value = "";
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
        inspiration.innerHTML = sassyToDoList();
    }
    
}    

function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.keyCode === 13) {
        createListElement();
        inspiration.innerHTML = sassyToDoList();
    }
}

// Remove a specific List Item
function removeListElement(event) {
    var clickedLi = event.target;
    ul.removeChild(clickedLi)
    inspiration.innerHTML = sassyFinishedTask();
}

function sassyToDoList() {
    
    const randomNumber = Math.floor(Math.random() * 22);
    
    const sassyResponses = [
        "Adding that to your list? Hope you're ready to juggle like a circus performer.",
        "Just when I thought your to-do list couldn't get any longer, you surprise me!",
        "Ah, yes, the never-ending saga of your to-do list continues. Cue the dramatic music.",
        "Adding more tasks? Your list is starting to resemble a phone book. Remember those?",
        "Oh, look, another mission for the superhero of productivity. Up, up, and away!",
        "Let me guess, your to-do list is auditioning for a role in an epic fantasy novel.",
        "Just a friendly reminder: The world's longest to-do list award is already taken. Sorry!",
        "Ah, your to-do list is evolving faster than a Pokémon. Gotta catch 'em all, I suppose.",
        "Adding more tasks? At this rate, your to-do list deserves its own national holiday.",
        "Your to-do list is becoming a work of art. You can't rush it.",
        "Are you sure your to-do list isn't a secret plan to take over the world?",
        "If adding to-do's was an Olympic sport, you'd be a gold medalist.",
        "Your to-do list is the stuff legends are made of. Keep the myth alive!",
        "You're on a roll! Keep conquering that to-do list like a fearless warrior.",
        "Is your to-do list a secret recipe? Because you're cooking up some serious productivity.",
        "Your to-do list has more items than discounts on Black Friday. Impressive!",
        "The sheer size of your to-do list could give Mount Everest a run for its money.",
        "Your to-do list is like a redwood tree. It keeps growing and growing!",
        "I'm starting to think your to-do list has taken on a life of its own...",
        "Completing your to-do list would take longer than Odysseus' entire journey.",
        "Your to-do list is reaching legendary status. People will write songs about it.",
        "Keep adding to your to-do list, and soon you'll need a separate universe just to contain it."
        ];
        
    
    return sassyResponses[randomNumber];
    
}

function sassyFinishedTask() {
    const sarcasticSayings = [
      "Oh, joy! You completed another groundbreaking task. The world trembles before your might!",
      "Stop the presses! You actually managed to cross off another life-altering item from your list. Bravo!",
      "Alert the media! You've accomplished yet another task. Your productivity is unparalleled!",
      "Hold your applause, folks! Another task met its match by your sheer determination. Astonishing!",
      "Be still, my beating heart! You've gone and done it again - completing a task like it's no big deal!",
      "Sound the trumpets! Another task bites the dust as you gallantly forge ahead in your list-conquering quest!",
      "Oh, be still, my excitement! You've managed to achieve the incredible feat of ticking off one more mundane task!",
      "Somebody pinch me! Your prodigious ability to accomplish tasks is out of this world!",
      "Stop everything! You've achieved the mind-blowing task of completing yet another item on your list!",
      "Alert the authorities! Your to-do list is shaking in fear as you relentlessly check off more tasks!",
      "Hold on to your hats, folks! You've done the unimaginable - completing another everyday task!",
      "Whoa, Nelly! You've just obliterated another task with the force of a thousand suns!",
      "Clear the runway! Your productivity is about to take flight and soar to unprecedented heights!",
      "It's official: you're the eighth wonder of the world! Tackling to-dos with the finesse of a seasoned pro!",
      "Oh, the humanity! You've accomplished yet another run-of-the-mill task in the most spectacular fashion!",
      "Buckle up, world! Your to-do list is no match for your awe-inspiring ability to get things done!",
      "Hold your applause, mortals! Another task bows before your extraordinary efficiency and talent!",
      "Sound the alarm! You're on a rampage of task-conquering mayhem that defies all reason!",
      "Somebody call the president! You've unlocked the secrets of crossing off tasks like it's nobody's business!",
      "Step aside, ordinary folks! Your superhuman ability to complete to-dos is a sight to behold!",
    ];
  
    const randomNumber = Math.floor(Math.random() * sarcasticSayings.length);
    return sarcasticSayings[randomNumber];
  }
  

button.addEventListener("click", function() {
    addListAfterClick();
});

ul.addEventListener("click", removeListElement);

input.addEventListener("keypress", addListAfterKeypress);
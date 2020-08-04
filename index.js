/* variable declaration */
/* costs */
var pCost = 200;
var pCostStack = 50;
var cost1 = 0;
var cost2 = 0;
var cost3 = 0;
var total = pCost + cost1 + cost2 + cost3;

/* others */
var ability = document.getElementById("aType").value;

/* hides and shows tutorial text */
function hideTutorial() {
  var tut = document.getElementById("hidetut");
  if (tut.style.display === "none") {
    tut.style.display = "block";
  } else {
    tut.style.display = "none";
  }
}

/* hides and shows helpful links */
function hideLinks() {
  var links = document.getElementById("hidelinks");
  if (links.style.display === "none") {
    links.style.display = "block";
  } else {
    links.style.display = "none";
  }
}

/* hides and shows changelog */
function hideChanges() {
  var change = document.getElementById("hidechanges");
  if (change.style.display === "none") {
    change.style.display = "block";
  } else {
    change.style.display = "none";
  }
}

/* resets page to default */
function resetBuilder() {

  /* allow Build button to be selected again */
  document.getElementById("builder").disabled = false;

  /* reset Ability Type dropdown */
  document.getElementById("aType").disabled = false;
  document.getElementById("aType").selectedIndex = 0;

  /* clear text explaining Passive/CM choice */
  document.getElementById("typetext").innerHTML = ""

  /* reset Primary Technique dropdown */
  document.getElementById("tTypeP").diabled = true;
  document.getElementById("tTypeP").selectedIndex = 0;

  /* reset Secondary Technique dropdown */
  document.getElementById("tTypeS").disabled = true;
  document.getElementById("tTypeS").selectedIndex = 0;

  /* reset Skill dropdown */
  document.getElementById("skill").disabled = true;
  document.getElementById("skill").selectedIndex = 0;

  /* disable perk selection buttons */
  document.getElementById("perkbutton").disabled = true;
  document.getElementById("clearbutton").disabled = true;

  /* unselect Perk Boxes */
  document.getElementById("p1").classList.remove("activePerk");
  document.getElementById("p2").classList.remove("activePerk");
  document.getElementById("p3").classList.remove("activePerk");

  /* reset Perk Box text */
  document.getElementById("p1").innerHTML = "PERK #1";
  document.getElementById("p2").innerHTML = "PERK #2";
  document.getElementById("p3").innerHTML = "PERK #3";

  /* make Perk Boxes unclickable until ability type is chosen again */
  document.getElementById("p1").removeEventListener("click", selectPerk1, false);
  document.getElementById("p2").removeEventListener("click", selectPerk2, false);
  document.getElementById("p3").removeEventListener("click", selectPerk3, false);

  /* removes classes from all searched perks */
  $(".perksearch").remove();
  $(".primary").remove();
  $(".secondary").remove();

  /* hides perk boxes */
  var x, i;
  x = document.querySelectorAll(".perkbox");
  for (i = 0; i < x.length; i++) {
    x[i].style.visibility = "hidden";
  }

  /* hide perk cost text and reset cost to default */
  document.getElementById("perkcost").innerHTML = "";
  cost1 = 0;
  cost2 = 0;
  cost3 = 0;
}

/* select an Ability Type and allow selection of techniques */
function loadBuilder() {

  /* prevents Build button from being clicked again */
  document.getElementById("builder").disabled = true;
  ability = document.getElementById("aType").value;

  /* error text if nothing is selected */
  if (ability === "nothing") {
    document.getElementById("typetext").innerHTML = "You have selected " + ability + ", please select either a Passive or CM to build.";
  };

  /* disable and enable buttons and dropdowns if an ability has been selected */
  if (ability !== "nothing") {
    /* disable ability changing */
    document.getElementById("aType").disabled = true;

    /* enable technique and skill selection */
    document.getElementById("tTypeP").disabled = false;
    document.getElementById("tTypeS").disabled = false;
    document.getElementById("skill").disabled = false;
    document.getElementById("perkbutton").disabled = false;
    document.getElementById("clearbutton").disabled = false;
  }

  /* 2 perk boxes if passive */
  if (ability === "passive") {
    var x, i;
    x = document.querySelectorAll(".perkbox");
    for (i = 0; i < 2; i++) {
      x[i].style.visibility = "visible";
    }
  /* 3 perk boxes if CM */
  } else if (ability === "cm") {
    var x, i;
    x = document.querySelectorAll(".perkbox");
    for (i = 0; i < 3; i++) {
      x[i].style.visibility = "visible";
    }
  }
  /* display perk explanatory text */
  document.getElementById("typetext").innerHTML = "You are building a " + $("#aType option:selected").text() + ". You may select up to two perks.";
  document.getElementById("perkcost").innerHTML = "Your " + $("#aType option:selected").text() + " costs " + String(total).bold() + " dirham.";
}

/* highlights and unhighlights Perk 1 when its Perk Box is clicked */
function selectPerk1() {
  if (document.getElementById("p1").classList.contains("activePerk")) {
    document.getElementById("p1").classList.remove("activePerk");
  } else {
    document.getElementById("p1").classList.add("activePerk");
    document.getElementById("p2").classList.remove("activePerk");
    document.getElementById("p3").classList.remove("activePerk");
  }
}

/* highlights and unhighlights Perk 2 when its Perk Box is clicked */
function selectPerk2() {
  if (document.getElementById("p2").classList.contains("activePerk")) {
    document.getElementById("p2").classList.remove("activePerk");
  } else {
    document.getElementById("p2").classList.add("activePerk");
    document.getElementById("p1").classList.remove("activePerk");
    document.getElementById("p3").classList.remove("activePerk");
  }
}

/* highlights and unhighlights Perk 3 when its Perk Box is clicked */
function selectPerk3() {
  if (document.getElementById("p3").classList.contains("activePerk")) {
    document.getElementById("p3").classList.remove("activePerk");
  } else {
    document.getElementById("p3").classList.add("activePerk");
    document.getElementById("p1").classList.remove("activePerk");
    document.getElementById("p2").classList.remove("activePerk");
  }
}

/* removes a perk after it has been chosen */
function clearPerk() {

  /* reset perk1 text to default if perk1 is selected */
  if (document.getElementById("p1").classList.contains("activePerk")) {
    document.getElementById("p1").innerHTML = "PERK #1";
    cost1 = 0;
    /* if perk 1 is same as perk 2 and in a passive, remove the surcharge */
    if (document.getElementById("p3").innerHTML === "Stacking Perk Surcharge <br><strong>Cost:</strong> " + cost3 + "dh" && document.getElementById("p1").innerHTML !== p2.innerHTML) {
      document.getElementById("p3".innerHTML = "PERK #3");
      cost3 = 0;
      document.getElementById("p3").style.visibility = "hidden";
    }
    /* unselect perk1 and update cost */
    document.getElementById("p1").classList.remove("activePerk");
    document.getElementById("perkcost").innerHTML = "Your " + $("#aType option:selected").text() + "costs " + String(total).bold() + " dirham.";
  /* do the same for perk 2 */
} else if (document.getElementById("p2").classList.contains("activePerk")) {
    document.getElementById("p2").innerHTML = "PERK #2";
    cost2 = 0;
    if (document.getElementById("p3").innerHTML === "Stacking Perk Surcharge <br><strong>Cost:</strong> " + cost3 + "dh" && document.getElementById("p1").innerHTML !== p2.innerHTML) {
      document.getElementById("p3".innerHTML = "PERK #3");
      cost3 = 0;
      document.getElementById("p3").style.visibility = "hidden";
    }
    document.getElementById("p2").classList.remove("activePerk");
  /* do the same for perk 3 */
  } else if (document.getElementById("p3").classList.contains("activePerk")) {
    document.getElementById("p3").innerHTML = "PERK #3";
    cost3 = 0;
    document.getElementById("p3").classList.remove("activePerk");
  }
  total = pCost + cost1 + cost2 + cost3;
  document.getElementById("perkcost").innerHTML = "Your " + $("#aType option:selected").text() + " costs " + String(total).bold() + " dirham.";
}

/* get list of perks matching ability type and technique type */
function getPerks() {

  /* variable declaration, type of primary and secondary technique */
  var tP = document.getElementById("tTypeP").value.slice(-1);
  var tS = document.getElementById("tTypeS").value.slice(-1);

  /* lists of different perks based on primary technique */
  if (tP === "O" && ability === "passive") {
    addPerks(perkPassiveO);
  } else if (tP === "D" && ability === "passive") {
    addPerks(perkPassiveD);
  } else if (tP === "S" && ability === "passive") {
    addPerks(perkPassiveS);
  } else if (tP === "C" && ability === "passive") {
    addPerks(perkPassiveC);
  } else if (tP === "O" && ability === "cm") {
    addPerks(perkCMO);
  } else if (tP === "D" && ability === "cm") {
    addPerks(perkCMD);
  } else if (tP === "S" && ability === "cm") {
    addPerks(perkCMS);
  } else if (tP === "C" && ability === "cm") {
    addPerks(perkCMC);
  }

  /* lists of different perks based on secondary technique */
  if (tS === "O" && ability === "passive") {
    addPerks(perkPassiveOs);
  } else if (tS === "D" && ability === "passive") {
    addPerks(perkPassiveDs);
  } else if (tS === "S" && ability === "passive") {
    addPerks(perkPassiveSs);
  } else if (tS === "C" && ability === "passive") {
    addPerks(perkPassiveCs);
  } else if (tS === "O" && ability === "cm") {
    addPerks(perkCMOs);
  } else if (tS === "D" && ability === "cm") {
    addPerks(perkCMDs);
  } else if (tS === "S" && ability === "cm") {
    addPerks(perkCMSs);
  } else if (tS === "C" && ability === "cm") {
    addPerks(perkCMCs);
  }

  /* disables buttons/dropdowns to select technique type */
  document.getElementById("perkbutton").disabled = true;
  document.getElementById("tTypeP").disabled = true;
  document.getElementById("tTypeS").disabled = true;
  document.getElementById("skill").disabled = true;

  /* allows Perk Boxes to be selected */
  document.getElementById("p1").addEventListener("click", selectPerk1, false);
  document.getElementById("p2").addEventListener("click", selectPerk2, false);
  document.getElementById("p3").addEventListener("click", selectPerk3, false);
}

/* perks will show up in right hand side of builder */
function addPerks(array) {
  var toAdd = document.createDocumentFragment();
  var y;
  for(y = 0; y < array.length; y++) {
    perksSearch = document.createElement('div');
    perksSearch.className = "perksearch";
    perksSearch.addEventListener("click", choosePerk, false);
    toAdd.appendChild(perksSearch);
    perksSearch.innerHTML = array[y].description + "<br><strong>Cost:</strong> " + array[y].cost + "dh";
    if (array[y].secondary === 1) {
      perksSearch.classList.add("secondary");
      perksSearch.classList.remove("primary");
    } else {
      perksSearch.classList.add("primary");
      perksSearch.classList.remove("secondary");
    }
    if (array[y].onlysecondary === 1 && perksSearch.classList.contains("primary")) {
      perksSearch.style.display = "none";
    }
  }
  document.getElementById("rightbox").appendChild(toAdd);
}

/* what happens when perk is selected from the search list */
function choosePerk() {

  /* if a perk box is active */
  if (document.querySelector(".activePerk").length !== 0) {
    /* select and unselect perk */
    if (this.classList.contains("active")) {
      this.classList.remove("active");
    } else {
      var l, i;
      l = document.querySelectorAll(".perksearch");
      for (i = 0; i < l.length; i++) {
        l[i].classList.remove("active");
      }
      this.classList.add("active");
    }

    /* replace text of active perk box with clicked perk */
    document.querySelector(".activePerk").innerHTML = document.querySelector(".active").innerHTML;
    this.classList.remove("active");

    /* perk pricing */
    if (document.getElementById("p1").innerHTML === "PERK #1") {
      cost1 = 0;
    } else {
      cost1 = Number(document.getElementById("p1").innerHTML.slice(-5,-2));
    }

    if (document.getElementById("p2").innerHTML === "PERK #2") {
      cost2 = 0;
    } else {
      cost2 = Number(document.getElementById("p2").innerHTML.slice(-5,-2));
    }

    if (document.getElementById("p3").innerHTML === "PERK #3") {
      cost3 = 0;
    } else {
      cost3 = Number(document.getElementById("p3").innerHTML.slice(-5,-2));
    }

    /* unselect all perk boxes */
    document.getElementById("p1").classList.remove("activePerk");
    document.getElementById("p2").classList.remove("activePerk");
    document.getElementById("p3").classList.remove("activePerk");

    /* if perk 1 and 2 are the same and in a passive, apply perk stacking cost*/
    if (document.getElementById("p1").innerHTML === document.getElementById("p2").innerHTML && ability === "passive") {
      cost3 = pCostStack;
      document.getElementById("p3").style.visibility = "visible";
      document.getElementById("p3").removeEventListener("click", selectPerk3, false);
      document.getElementById("p3").innerHTML = "Stacking Perk Surcharge <br><strong>Cost:</strong> " + cost3 + "dh";
    } else if (ability === "passive" && document.getElementById("p1").innerHTML !== document.getElementById("p2").innerHTML) {
      document.getElementById("p3").style.visibility = "hidden";
    }

    /* update price */
    total = pCost + cost1 + cost2 + cost3;
    document.getElementById("perkcost").innerHTML = "Your " + $("#aType option:selected").text() + " costs " + String(total).bold() + " dirham.";
  } /* else if no perk box has been selected (two way selection?) */
}

/* i don't understand this but it's the jquery to make a technique unselectable if it is already picked in one list */
$("select").on("change", function() {
  $('option').prop('disabled', false);
  $('select').each(function() {
    var val = this.value;
    $('select').not(this).find('option').filter(function() {
      return this.value === val;
    }).prop('disabled', true);
  });
}).change();

/* all perks */

var perklist = [];

var perk1 = { description: "Grant an ally advantage on skill checks using a specific skill (STR, DEX, INT, etc) a number of times equal to that [SKILL MODIFIER] in a thread", cost: "000", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 1, saves: 0, accuracy: 0, advantage: 1, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk2 = { description: "Grant an ally a damage bonus equal to a [SKILL MODIFIER]", cost: "025", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk3 = { description: "Perform your regular attack", cost: "050", isPassive: 0, isCM: 1, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk4 = { description: "Perform your regular heal on an ally", cost: "050", isPassive: 0, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk5 = { description: "Summon your Companion", cost: "050", isPassive: 0, isCM: 1, O: 0, D: 0, S: 0, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 1, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk6 = { description: "Grant an ally advantage on saves using a specific skill (STR, DEX, INT, etc) a number of times equal to that [SKILL MODIFIER] in a thread", cost: "050", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 1, accuracy: 0, advantage: 1, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk7 = { description: "Restore [SUPPORTIVE TECHNIQUE] hit points per round for [SUPPORTIVE TECHNIQUE] rounds to an ally", cost: "050", isPassive: 0, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 1, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk8 = { description: "Add [SKILL MODIFIER] to the damage dealt by a specific condition", cost: "050", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk9 = { description: "When engaging in grid-based combat, you can add [SUPPORTIVE TECHNIQUE] to your initiative roll", cost: "050", isPassive: 1, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 1, isSpecial: 0, onlysecondary: 0};
var perk10 = { description: "Grant an ally a damage bonus equal to [TECHNIQUE PROFICIENCY]", cost: "075", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk11 = { description: "Add [TECHNIQUE PROFICIENCY] to the damage dealt by a specific condition", cost: "075", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk12 = { description: "Impose a penalty on an enemy's accuracy equal to a [TECHNIQUE PROFICIENCY]. As a Passive, this triggers on your choice of successfully hitting or being hit, and lasts until your next turn", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 1, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk13 = { description: "Add a [SKILL MODIFIER] to your AC (min 1). Only one skill modifier may be used in this manner", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 1, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk14 = { description: "Grant an ally a bonus equal to a [TECHNIQUE PROFICIENCY] to skill checks using a specific ability. Lasts a number of rounds equal to [TECHNIQUE PROFICIENCY]", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 1, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk15 = { description: "Remove all the lesser conditions affecting an ally. Lesser conditions include deafened, bleeding, blinded, burned, chilled, and poisoned", cost: "100", isPassive: 0, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 1, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk16 = { description: "Grant an ally the ability to use their movement over hazardous terrain and tiles without incurring negative effects or being slowed. Lasts for a total of 3*[TECHNIQUE PROFICIENCY] tiles moved", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 1, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk17 = { description: "Add the dice pool of [SECONDARY OFFENSIVE TECHNIQUE]/2 to your rolled damage (min 1d10)", cost: "150", isPassive: 1, isCM: 1, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 1};
var perk18 = { description: "Add the dice pool of [SECONDARY DEFENSIVE TECHNIQUE]/2 to your damage mitigation (min 1d10)", cost: "150", isPassive: 1, isCM: 1, O: 0, D: 1, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 1, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 1};
var perk19 = { description: "Add [SKILL MODIFIER]/2 to the DC of a save for a specific condition", cost: "150", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 1, checks: 0, saves: 1, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk20 = { description: "Revive a dead creature. If taken as a Passive, it can only be done [SUPPORTIVE TECHNIQUE]/2 times a thread, and must be triggered by a basic heal or a CM with a healing perk", cost: "150", isPassive: 1, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 1, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk21 = { description: "The next attack roll made agaisnt this target before the end of your next turn has advantage", cost: "150", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 1, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk22 = { description: "Grant an ally a number of extra squares of movement equal to [SUPPORTIVE TECHNIQUE PROFICIENCY]", cost: "150", isPassive: 0, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 1, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk23 = { description: "Grants the ability to overheal an ally by 4*[SUPPORTIVE PROFICIENCY] hit points. It only allows for the potential of overhealing, it does not execute the heal", cost: "150", isPassive: 1, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 1, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk24 = { description: "Deal [DEFENSIVE PROFICIENCY]/2 * 1d10 damage the next time you are hit by a melee attack. If taken as a Passive, deal [DEFENSIVE PROFICIENCY]/2 damage instead", cost: "150", isPassive: 1, isCM: 1, O: 0, D: 1, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk25 = { description: "Give a specified creature disadvantage on their attacks until your next turn", cost: "150", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 1, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk26 = { description: "Grant an ally an AC bonus equal to [DEFENSIVE TECHNIQUE] for one round", cost: "150", isPassive: 0, isCM: 1, O: 0, D: 1, S: 0, C: 0, AC: 1, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk27 = { description: "Grant an ally an accuracy bonus equal to a [SKILL MOFIDIER] for one round", cost: "175", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 1, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk28 = { description: "Add the dice pool of [SECONDARY SUPPORTIVE TECHNIQUE]/2 to your rolled healing (min 1d10)", cost: "200", isPassive: 1, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 1, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 1};
var perk29 = { description: "Add [TECHNIQUE PROFICIENCY]/2 to the DC of a save for a specific condition", cost: "200", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 1, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk30 = { description: "Targets an additional number of allies equal to or less than a [SUPPORTIVE OR DEFENSIVE TECHNIQUE]. Must be used in conjunction with another perk", cost: "200", isPassive: 1, isCM: 1, O: 0, D: 1, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 1, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk31 = { description: "Remove all conditions affecting an ally. Does not apply to Banished, Grappled, Disarmed, or Prone", cost: "200", isPassive: 0, isCM: 1, O: 0, D: 0, S: 1, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 1, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk32 = { description: "Reduce up to [DEFENSIVE PROFICIENCY] * 1d10 damage until your next turn. If taken as a Passive, prevent [DEFENSIVE PROFICIENCY]/2 damage instead", cost: "200", isPassive: 1, isCM: 1, O: 0, D: 1, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 1, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk33 = { description: "Apply this Maneuver's effects to [TECHNIQUE PROFICIENCY] tiles. Any ally who starts their turn on a tile receives the benefits until the start of their next turn, while any foe incurs the penalty/saving throw/damage the first time they move onto or end their turn on the tile", cost: "225", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 1, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk34 = { description: "Grant an ally an accuracy bonus equal to [TECHNIQUE PROFICIENCY] for one round. This perk cannot target yourself", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 1, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk35 = { description: "Add [SECONDARY TECHNIQUE PROFICIENCY] to your own accuracy rolls", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 1, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 1};
var perk36 = { description: "Target an additional number of enemies equal to or less than [TECHNIQUE PROFICIENCY]. Must be used in conjunction with another perk", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 1, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk37 = { description: "Impose disadvantage on saves using a specific skill (STR, DEX, INT, etc) until the start of your next turn. Can be used a number of times equal to that [SKILL MODIFIER] in a thread", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 1, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk38 = { description: "When calling forth your companion in combat, they may automatically perform an attack as part of the process (therefore not consuming your bonus action that turn)", cost: "150", isPassive: 1, isCM: 1, O: 0, D: 0, S: 0, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 1, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk39 = { description: "The master has the ability to summon an additional companion. Doing so still requires a separate Main Action, but they can act together on the same Bonus Action Command. HP is divided equally between the Companions", cost: "200", isPassive: 1, isCM: 1, O: 0, D: 0, S: 0, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 1, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk40 = { description: "The summoned companion may attempt to revive their unconscious master once per thread", cost: "300", isPassive: 1, isCM: 1, O: 0, D: 0, S: 0, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 1, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk41 = { description: "Attempt to inflict Banished", cost: "750", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk42 = { description: "Attempt to inflict Bleeding", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk43 = { description: "Attempt to inflict Blinded", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk44 = { description: "Attempt to inflict Burning", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk45 = { description: "Attempt to inflict Charmed", cost: "200", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk46 = { description: "Attempt to inflict Chilled", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk47 = { description: "Attempt to inflict Confounded", cost: "750", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk48 = { description: "Attempt to inflict Deafened", cost: "050", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk49 = { description: "Attempt to inflict Disarmed", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk50 = { description: "Attempt to inflict Embargoed", cost: "300", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk51 = { description: "Attempt to inflict Exhausted", cost: "200", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk52 = { description: "Attempt to inflict Exposed", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk53 = { description: "Attempt to inflict Fettered", cost: "200", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk54 = { description: "Attempt to inflict Frightened", cost: "150", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk55 = { description: "Attempt to inflict Grappled", cost: "050", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk56 = { description: "Attempt to inflict Incapacitated", cost: "500", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk57 = { description: "Attempt to inflict Paralyzed", cost: "600", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk58 = { description: "Attempt to inflict Paranoid", cost: "150", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk59 = { description: "Attempt to inflict Petrified", cost: "750", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk60 = { description: "Attempt to inflict Poisoned", cost: "100", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk61 = { description: "Attempt to inflict Prone", cost: "150", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk62 = { description: "Attempt to inflict Restrained", cost: "200", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk63 = { description: "Attempt to inflict Sealed", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk64 = { description: "Attempt to inflict Sleep", cost: "400", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk65 = { description: "Attempt to inflict Sundered", cost: "175", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk66 = { description: "Attempt to inflict Stunned", cost: "600", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk67 = { description: "Attempt to inflict Taunted", cost: "075", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk68 = { description: "Attempt to inflict Vulnerable", cost: "250", isPassive: 1, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 1, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 0, onlysecondary: 0};
var perk69 = { description: "You may attempt to hide. Roll a DEX skill check. Enemies must meet or beat this number with a WIS skill check in order to locate you. You must have Shadow or Illusion Technique to attempt this if there is no suitable cover to use otherwise", cost: "100", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 1, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk70 = { description: "Use your action to perform a melee attack with advantage this turn, but until your next turn, attacks against you have advantage to hit as well", cost: "200", isPassive: 0, isCM: 1, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 1, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk71 = { description: "Before you make an attack, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 damage", cost: "200", isPassive: 0, isCM: 1, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 1, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk72 = { description: "You can transport one willing creature with you when taking your movement action in combat without being slowed. You must be able to touch this person before expending your movement action", cost: "300", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 1, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk73 = { description: "As a bonus action, you can move up to your speed towards an enemy ofyour choice that you can see or hear. You must end this move closer to the enemy than when you started", cost: "300", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 1, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk74 = { description: "When you are reduced to 0 hit points but not killed outright, you drop to 1 hit point instead. This ability can activate once per thread", cost: "400", isPassive: 1, isCM: 0, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 1, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk75 = { description: "As a bonus action, you can magically turn invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. You can use this ability once per encounter", cost: "400", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk76 = { description: "As a bonus action, you can prepare to take a hit for an adjacent ally. When an adjacent ally is attacked, you swap places with that ally, and they must attack you instead", cost: "400", isPassive: 0, isCM: 1, O: 1, D: 1, S: 1, C: 1, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 0, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk77 = { description: "Create an environmental hazard on the battlefield. Choose a number of touching tiles equal to [OFFENSIVE TECHNIQUE]. Enemies who start their turn or move within those squares must pass an INT/DEX saving throw or take [OFFENSIVE TECHNIQUE]d10 + [OFFENSIVE TECHNIQUE] damage. Lasts for [OFFENSIVE TECHNIQUE] rounds", cost: "400", isPassive: 0, isCM: 1, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 1, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 1, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};
var perk78 = { description: "When you crit, roll your damage and add on the maximum damage of your technique's dice pool to damage rolled", cost: "400", isPassive: 1, isCM: 0, O: 1, D: 0, S: 0, C: 0, AC: 0, DC: 0, checks: 0, saves: 0, accuracy: 0, advantage: 0, disadvantage: 0, damage: 1, mitigation: 0, healing: 0, condition: 0, movement: 0, targeting: 0, companion1: 0, death: 0, initiative: 0, isSpecial: 1, onlysecondary: 0};

perklist.push(perk1, perk2, perk3, perk4, perk5, perk6, perk7, perk8, perk9, perk10, perk11, perk12, perk13, perk14, perk15, perk16, perk17, perk18, perk19, perk20, perk21, perk22, perk23, perk24, perk25, perk26, perk27, perk28, perk29, perk30, perk31, perk32, perk33, perk34, perk35, perk36, perk37, perk38, perk39, perk40, perk41, perk42, perk43, perk44, perk45, perk46, perk47, perk48, perk49, perk50, perk51, perk52, perk53, perk54, perk55, perk56, perk57, perk58, perk59, perk60, perk61, perk62, perk63, perk64, perk65, perk66, perk67, perk68, perk69, perk70, perk71, perk72, perk73, perk74, perk75, perk76, perk77, perk78);

/* searches */
var perkPassiveO, perkPassiveOs,
    perkPassiveD, perkPassiveDs,
    perkPassiveS, perkPassiveSs,
    perkPassiveC, perkPassiveCs,
    perkCMO, perkCMOs,
    perkCMD, perkCMDs,
    perkCMS, perkCMSs,
    perkCMC, perkCMCs;

perkPassiveO = perklist.filter(one => one.isPassive === 1 && one.O === 1);
perkCMO = perklist.filter(two => two.isCM === 1 && two.O === 1);
perkPassiveD = perklist.filter(three => three.isPassive === 1 && three.D === 1);
perkCMD = perklist.filter(four => four.isCM === 1 && four.D === 1);
perkPassiveS = perklist.filter(five => five.isPassive === 1 && five.S === 1);
perkCMS = perklist.filter(six => six.isCM === 1 && six.S === 1);
perkPassiveC = perklist.filter(seven => seven.isPassive === 1 && seven.C === 1);
perkCMC = perklist.filter(eight => eight.isCM === 1 && eight.C === 1);

perkPassiveOs = perkPassiveO.map(obj => ({...obj, "secondary": 1}));
perkPassiveDs = perkPassiveD.map(obj => ({...obj, "secondary": 1}));
perkPassiveSs = perkPassiveS.map(obj => ({...obj, "secondary": 1}));
perkPassiveCs = perkPassiveC.map(obj => ({...obj, "secondary": 1}));
perkCMOs = perkCMO.map(obj => ({...obj, "secondary": 1}));
perkCMDs = perkCMD.map(obj => ({...obj, "secondary": 1}));
perkCMSs = perkCMS.map(obj => ({...obj, "secondary": 1}));
perkCMCs = perkCMC.map(obj => ({...obj, "secondary": 1}));

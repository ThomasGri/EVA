/**
*
*	Functions used for the Counterbalancing of Tasks.
*
*	General Functionality implemented as described in: http://www.statisticshowto.com/counterbalancing-2/
*
**/

// Counterbalancing function. takes: array of tasks, number of participants and the counterbalancing method as args.
counterBalance = function(taskarray, participantCount, balancingMethod){
	var participantTaskAssignment = [];

	// subset of arrays to separate tasks without counterbalancing.
	array_to_counterbalance = [];
	array_to_keep_order = [];

	taskarray.forEach(function(element, index){
		if(element.counter_balancing_group == 0){
			array_to_keep_order.push(element);
		} else {
			array_to_counterbalance.push(element);
			array_to_keep_order.push(null);
		}
	});

	// determine Counterbalancing Method and call respective function.
	if(balancingMethod == 0){
		possibleOrders = [array_to_counterbalance]; 
	} else if (balancingMethod == 3){
		// Reverse counterbalancing: add space since # of rebalanced tasks will duplicate.
		for(i = 0; i < array_to_keep_order.length; i++){
			if(array_to_keep_order[i] == null){
				array_to_keep_order.splice(i, 0, null);
				i++;
			}
		}
		possibleOrders = reverseOrderC(array_to_counterbalance, array_to_counterbalance.length);
	} else if (balancingMethod == 1){
		possibleOrders = completeCounterbalancing(array_to_counterbalance, array_to_counterbalance.length);
	} else if (balancingMethod == 2){
		possibleOrders = latinSquare(array_to_counterbalance);
	}

	// merge balanced tasks into not balanced ones.
	for(a=0; a < possibleOrders.length; a++){
		j = 0;
		tmp_array = array_to_keep_order.slice();
		for(i = 0; i < tmp_array.length; i++){
			if(tmp_array[i] == null){
				tmp_array[i] = possibleOrders[a][j];
				j++;
			}
		}
		possibleOrders[a] = tmp_array.slice();
	}

	// Determine how many particpants are in each full group
	participantsInGroup = Math.floor(participantCount / possibleOrders.length);

	// Number of participants with no group.
	participantsWithoutGroup = participantCount - (participantsInGroup * possibleOrders.length);

	// array to keep track of the number of participants in a group. (index=group, value = number, indexes = other positions belonging to same group)
	group_participant_assignment = [];

	for (i = 0; i < possibleOrders.length; i++){
		group_participant_assignment.push({});
	}

	// assign full groups.
	for (i=0; i < participantsInGroup; i++){
		for (j=0; j < possibleOrders.length; j++){
			participantTaskAssignment.push(possibleOrders[j]);//.push(j);
			
			if(isNaN(group_participant_assignment[j]["participants"])){
				group_participant_assignment[j]["participants"] = 1;
			} else {
				group_participant_assignment[j]["participants"]++;
			}
			
			if(typeof group_participant_assignment[j]["indexes"] === "undefined"){
				group_participant_assignment[j]["indexes"] = [participantTaskAssignment.length-1];
			} else {
				group_participant_assignment[j]["indexes"].push(participantTaskAssignment.length-1);
			}

			group_participant_assignment[j]["group"] = j;
		}
	}

	// assign incomplete groups randomly.
	for (i=0; i < participantsWithoutGroup; i++){

		// get a random number between 0 and the number of permutations-1
		randomPermutation = getRandomInt(0, (possibleOrders.length)-1);

		// Add the permutation at the place of the random number to the total assignmen
		participantTaskAssignment.push(possibleOrders[randomPermutation]);//.push(randomPermutation);

		if(isNaN(group_participant_assignment[randomPermutation]["participants"])){
			group_participant_assignment[randomPermutation]["participants"] = 1;
		} else {
			group_participant_assignment[randomPermutation]["participants"]++;
		}

		if(typeof group_participant_assignment[randomPermutation]["indexes"] === "undefined"){
			group_participant_assignment[randomPermutation]["indexes"] = [participantTaskAssignment.length-1];
		} else {
			group_participant_assignment[randomPermutation]["indexes"].push(participantTaskAssignment.length-1);
		}

		group_participant_assignment[randomPermutation]["group"] = randomPermutation;

		// Remove the added option to make sure it will not be added again!
		possibleOrders.splice(randomPermutation, 1);
	}

	return [group_participant_assignment,participantTaskAssignment];
}

// returns a latin square allocation of the array elements. Achieved by simply shifting array elements to the front array.length times
function latinSquare(array){

	original = array;

	orders = [];

	length = array.length;

	// loop array.length times.
	for(i=0; i < length; i++){

		var arraycopy = array.slice();

		// add this sequence to the possible orders
		orders.push(arraycopy);

		// save first element
		element = array[0];

		// remove first element from the array
		array.splice(0, 1);

		// add the first element to the end of the array
		array.push(element);
	}

	return orders;
}

// Add a reverse array to the original one.
function reverseOrderC(array){
	console.log("Reverse");

	original = array.slice();
	reverse = array.reverse();

	balanced = original.concat(reverse);

	return [balanced];
}


// Function to get all Permutations of an array that have the same length.
// Function taken from: http://rextester.com/OUC90847
function completeCounterbalancing(array, k){

	var balancedarray = [];
	var combinations = [];
	var indices = [];

	function run(level, start){
		for(var i=0; i < array.length; i++){

			if(!indices[i]){

				indices[i] = true;

				combinations[level] = array[i];

				if(level < k - 1){
					run(level + 1, i + 1);
				} else {
					var toAdd = combinations.slice();
					balancedarray.push(toAdd);
				}

				indices[i] = false;
			}
		}
	}

	run(0, 0);

	return balancedarray;
}

// Function to get random integer between two values.
// Function taken from: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
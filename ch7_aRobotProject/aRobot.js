// ------------------------------------- City
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

// -------------------------------------- Graph of places their routes
function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (!graph[from]) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// console.log(roadGraph);

// --------------------------------------- State of parcels and robot in the city
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

// let first = new VillageState('Post Office', [
//   { place: 'Post Office', address: "Alice's House" },
// ]);
// let next = first.move("Alice's House");

// console.log(next.place); // Alice's House
// console.log(next.parcels); // []
// console.log(first.place); // Post Office

// ------------------------------------------------------- Execute Robot
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

// ------------------------------------------------------- Robots
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

const mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office',
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// -------------------------------------------------------- Initialize Village
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState('Post Office', parcels);
};

// ------------------------------------------------------- Measuring a Robot
/*
  Write a function compareRobots that takes two robots (and their starting memory). It should generate 100 tasks and let each of the robots solve each of these tasks. When done, it should output the average number of steps each robot took per task.
*/

function compareRobots(robot1, memory1, robot2, memory2) {
  let tasks = [];
  for (let i = 0; i < 100; i++) {
    const parcelsToDeliver = Math.floor(Math.random() * 20);
    tasks.push(VillageState.random(parcelsToDeliver));
  }

  let robot1Results = [];
  let robot2Results = [];

  for (let j = 0; j < tasks.length; j++) {
    robot1Results.push(runRobot(tasks[j], robot1, memory1));
    robot2Results.push(runRobot(tasks[j], robot2, memory2));
  }

  const robot1Average =
    robot1Results.reduce((acc, curr) => acc + curr) / robot1Results.length;
  const robot2Average =
    robot2Results.reduce((acc, curr) => acc + curr) / robot2Results.length;

  console.log('Robot 1:', `Took in average ${robot1Average} turns`);
  console.log('Robot 2:', `Took in average ${robot2Average} turns`);
}

// --------------------------------------------------------- Robot Efficiency
/*
  Can you write a robot that finishes the delivery task faster than goalOrientedRobot? If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

  If you solved the previous exercise, you might want to use your compareRobots function to verify whether you improved the robot.
*/

function findStepsBetweenPlaces(graph) {
  const origins = Object.keys(graph);
  const destinations = [...origins];
  const stepsBetweenPlaces = {};

  function addSteps(from, to, steps) {
    if (!stepsBetweenPlaces[from]) {
      stepsBetweenPlaces[from] = { [to]: steps };
    } else {
      stepsBetweenPlaces[from] = { ...stepsBetweenPlaces[from], [to]: steps };
    }
  }

  for (let origin of origins) {
    for (let destination of destinations) {
      if (origin !== destination) {
        const route = findRoute(graph, origin, destination);
        const steps = route.length;
        addSteps(origin, destination, steps);
      }
    }
  }

  return stepsBetweenPlaces;
}

const stepsBetweenPlaces = findStepsBetweenPlaces(roadGraph);

function selectCloserParcel(place, parcels) {
  let closerParcel = parcels[0];
  for (let destination of parcels) {
    if (
      stepsBetweenPlaces[place][destination.place] <
      stepsBetweenPlaces[place][closerParcel.place]
    ) {
      closerParcel = destination;
    }
  }

  return closerParcel;
}

function moreEfficientRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let parcel = selectCloserParcel(place, parcels);
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// -------------------------------------------------------- Play
// runRobot(VillageState.random(), randomRobot);
// console.log('-------------------------------');
// runRobot(VillageState.random(), routeRobot, []);
// console.log(runRobot(VillageState.random(), goalOrientedRobot, []));
// console.log(runRobot(VillageState.random(), moreEfficientRobot, []));
// compareRobots(routeRobot, [], goalOrientedRobot, []);
compareRobots(goalOrientedRobot, [], moreEfficientRobot, []);

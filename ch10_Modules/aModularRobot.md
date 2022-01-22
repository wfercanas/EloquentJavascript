# Problem
These are the bindings that the project from Chapter 7 creates:

roads
buildGraph
roadGraph
VillageState
runRobot
randomPick
randomRobot
mailRoute
routeRobot
findRoute
goalOrientedRobot

If you were to write that project as a modular program, what modules would you create? Which module would depend on which other module, and what would their interfaces look like?

Which pieces are likely to be available prewritten on NPM? Would you prefer to use an NPM package or write them yourself?

# Solution

## What modules would you create?
I would create:
1. **buildGraph**: this module's objective is to create a graph given an array of edges.
2. **VillageState**: this module's objective is to create new states for the whole program and returning them.
3. **runRobot**: this module's objective is to define the logic for executing any robot.
4. **randomRobot**: this module's objective is to define the logic of this robot through the definition of randomPick and randomRobot.
5. **routeRobot**: this module's objective is to define the logic of this robot.
6. **findRoute**: this module's objective is to provide a route between two nodes in a graph.
7. **goalOrientedRobot**: this module's objective is to define the logic of this robot.
8. **main**: this module's is the one that controls the execution of the program.

## Which module depend on which other module?
1. **buildGraph** -> none
2. **VillageState** -> none
3. **runRobot** -> none
4. **randomRobot** -> none
5. **routeRobot** -> none
6. **findRoute** -> none
7. **goalOrientedRobot** -> none
8. **index** -> buildGraph, VillageState, runRobot, randomRobot, routeRobot, findRoute, goalOrientedRobot

## What would their interfaces look like?
1. **buildGraph** -> Function (edges)
2. **VillageState** -> VillageState {place, parcels, move(destination)}
3. **runRobot** -> Function (state, robot, memory)
4. **randomRobot** -> Function (graph, state)
5. **routeRobot** -> Function (state, memory, route)
6. **findRoute** -> Function (graph, from, to)
7. **goalOrientedRobot** -> Function (state, route)

## Pieces likely prewritten on NPM?
1. **buildGraph**
2. **findRoute**

I would prefer to write them myself. Otherwise I would have to invest time in making the data structures compatible, risking future troubles when they do change. Besides, the functionality is not that tough to maintain.
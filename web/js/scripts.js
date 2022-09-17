import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// create a Queue
// Queue class
class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }

  // Functions to be implemented
  // enqueue function
  enqueue(element) {
    // adding element to the queue
    this.items.push(element);
  }
  // dequeue function
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }

  // front function
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  // isEmpty function
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  // printQueue function
  printQueue() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}

// create a graph class
class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.nodes = new Map();
  }

  // functions to be implemented

  // add vertex to the graph
  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.nodes.set(v.key, v);
  }
  // add edge to the graph
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.nodes.get(v).children.push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    this.nodes.get(w).parents.push(v);
  }
  printGraph() {
    // get all the vertices
    let get_keys = this.nodes.keys();

    $("#graph").append("PRINT GRAPH:");
    // iterate over the vertices
    for (let key of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      let get_values = this.nodes.get(key).children;
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      $("#graph").append(`<div class="node">${key} -> ${conc}</div>`);
    }
    $("#graph").append("END PRINT GRAPH:");
  }

  // function to performs BFS
  bfs(startingNode) {
    // create a visited object
    let visited = {};

    // Create an object for queue
    let q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(this.nodes.get(startingNode));

    // loop until queue is empty
    while (!q.isEmpty()) {
      // get the element from the queue
      let getQueueElement = q.dequeue();

      // passing the current vertex to callback function
      // console.log(getQueueElement);
      debugger;

      // get the adjacent list for current vertex
      let get_List = this.nodes.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (let i in get_List) {
        let neigh = get_List[i];

        if (!visited[neigh]) {
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
    }
  }

  // Main DFS method
  dfs(startingNode) {
    let visited = {};

    let node = this.nodes.get(startingNode);
    this.DFSUtil(node, visited);
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(node, visited) {
    visited[node.key] = true;

    $("#graph").append(
      `<div class="node">${node.key} -> ${node.children}</div>`
    );

    for (let child of node.children) {
      let childNode = this.nodes.get(child);
      if (!visited[childNode.key]) {
        this.DFSUtil(childNode, visited);
      }
    }
  }
}

// Using the above implemented graph class
let g = new Graph(6);
// ADD ALL VERTICES IN WORKFLOW (UNLINKED)
let vertices = [
  {
    title: "File Upload",
    key: "fileUpload",
    data: {
      id: "file-upload",
    },
    color: "green",
    children: [],
    parents: [],
    column: 1,
  },
  {
    title: "Live Source 1",
    key: "liveSource",
    data: {
      id: "live-source",
      status: "offline",
    },
    color: "red",
    children: [],
    parents: [],
    column: 1,
  },
  {
    title: "File Ingest",
    key: "fileIngest",
    data: {
      id: "file-ingest",
      value: "1.2 TB",
    },
    color: "green",
    children: [],
    parents: [],
    column: 2,
  },
  {
    title: "Playout",
    key: "playout",
    data: {
      id: "playout",
      value: "Main Channel",
    },
    color: "green",
    children: [],
    parents: [],
    column: 2,
  },
  {
    title: "VOD Delivery",
    key: "vod",
    data: {
      id: "vod",
      value: "VOD Delivery",
    },
    color: "green",
    children: [],
    parents: [],
    column: 3,
  },
];

// adding vertices
for (let i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

// adding edges
g.addEdge("fileUpload", "fileIngest");
g.addEdge("fileIngest", "vod");
g.addEdge("liveSource", "playout");

// prints all vertex and
// its adjacency list
// A -> B D E
// B -> A C
// C -> B E F
// D -> A E
// E -> A D F C
// F -> E C

// g.printGraph();
// g.bfs("fileUpload");
// g.dfs("fileUpload");

// loop all vertices with column = 1
vertices.forEach((vertex) => {
  if (vertex.column === 1) {
    console.log(vertex.key);
    g.dfs(vertex.key);
  }
});

// console.log(g.noOfVertices);

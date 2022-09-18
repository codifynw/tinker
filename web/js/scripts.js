import jQuery from "jquery";
import "../css/styles.css";

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
  dequeue(element) {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "Underflow";

    if (element) {
      let index = this.items.indexOf(element);
      if (index > -1) {
        return this.items.splice(index, 1)[0];
      }
    }

    return this.items.shift();
  }

  // front function
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }

  // contains function
  contains(element) {
    // returns true if the queue
    // contains the element
    return this.items.includes(element);
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

class Arrow {
  constructor(parent, child) {
    this.parent = parent;
    this.child = child;

    this.arrow = $(`<div class="arrow"></div>`);

    const parentOffset = this.parent.el[0].getBoundingClientRect();
    const childOffset = this.child.el[0].getBoundingClientRect();

    const left = parentOffset.right + 10;
    const top = parentOffset.top + parentOffset.height / 2;
    const width = childOffset.left - parentOffset.right - 30;

    $("#arrows").append(this.arrow);
    this.arrow.css("width", width);
    this.arrow.css("top", top);
    this.arrow.css("left", left);
    this.arrow.css("height", "3px");
  }
}

// create a graph class
class Graph {
  // defining vertex array and
  // adjacent list
  constructor(nodes) {
    this.numberOfNodes = nodes.length;
    this.nodes = new Map();
    this.addNodes(nodes);
  }

  // functions to be implemented
  addNodes(nodes) {
    let self = this;
    for (let i = 0; i < nodes.length; i++) {
      self.addNode(nodes[i]);
    }
  }

  // add node to the graph
  addNode(v) {
    // initialize the adjacent list with a
    // null array
    this.nodes.set(v.key, v);
  }
  // add edge to the graph
  addEdge(v, w) {
    // get the list for node v and put the
    // node w denoting edge between v and w
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
      // for the node
      let get_values = this.nodes.get(key).children;
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (let j of get_values) conc += j + " ";

      // print the node and its adjacency list
      $("#graph").append(`<span class="node">${key} -> ${conc}</span>`);
    }
    $("#graph").append("END PRINT GRAPH:");
  }

  buildGraph() {
    let self = this;
    // self.visited = {};
    self.queue = new Queue();

    nodes
      .sort((a, b) => a.column - b.column)
      .forEach((node) => {
        self.queue.enqueue(node.key);
      });

    while (!self.queue.isEmpty()) {
      self.dfs(self.queue.front());
    }
  }

  addArrowsToGraph() {
    let self = this;
    $("#graph").append(`<div id="arrows">`);

    self.nodes.forEach((node) => {
      for (let childKey of node.children) {
        let child = self.nodes.get(childKey);
        let arrow = new Arrow(node, child);
        $("#graph").append(arrow);
      }
    });
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

      // passing the current node to callback function
      // console.log(getQueueElement);

      // get the adjacent list for current node
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
  dfs(nodeKey) {
    this.DFSUtil(nodeKey);
  }

  // Recursive function which process and explore
  // all the adjacent node of the node with which it is called
  DFSUtil(nodeKey) {
    this.queue.dequeue(nodeKey);

    let node = this.nodes.get(nodeKey);

    if (node.parents.length === 0) {
      $("#graph").append(`<br>`);
    }

    let el = $(`<div class="node ${node.color}">${node.key} </div>`);
    $("#graph").append(el);

    node.el = el;

    for (let childKey of node.children) {
      if (this.queue.contains(childKey)) {
        this.DFSUtil(childKey);
      }
    }

    if (node.parents.length) {
      for (let parentKey of node.parents) {
        if (
          this.nodes.get(parentKey).column === 1 &&
          this.queue.contains(parentKey)
        ) {
          console.log("jump queue");
          this.DFSUtil(parentKey);
        }
      }
    }
  }
}

// ADD ALL VERTICES IN WORKFLOW (UNLINKED)
let nodes = [
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
    title: "Live Source 3",
    key: "liveSource3",
    data: {
      id: "live-source",
      status: "offline",
    },
    color: "green",
    children: [],
    parents: [],
    column: 1,
  },
  {
    title: "Live Source 2",
    key: "liveSource2",
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

// Using the above implemented graph class
let g = new Graph(nodes);

// adding edges
g.addEdge("fileUpload", "fileIngest");
g.addEdge("fileIngest", "vod");
g.addEdge("liveSource", "playout");
g.addEdge("liveSource2", "playout");

g.buildGraph();
g.addArrowsToGraph();

class Node {
    constructor(book) {
        this.book = book;
        this.g = 0; // Cost from start to node
        this.h = 0; // Heuristic cost to goal
        this.f = 0; // Total cost
        this.parent = null;
    }
}

function aStarSearch(start, goal) {
    let openList = [];
    let closedList = [];
    openList.push(start);

    while (openList.length > 0) {
        let currentNode = openList[0];

        for (let node of openList) {
            if (node.f < currentNode.f) {
                currentNode = node;
            }
        }

        if (currentNode.book.title === goal.title) {
            return reconstructPath(currentNode);
        }

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        for (let neighbor of getNeighbors(currentNode)) {
            if (closedList.includes(neighbor)) {
                continue;
            }

            const tentative_g = currentNode.g + 1; // Assuming uniform cost for simplicity

            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            } else if (tentative_g >= neighbor.g) {
                continue;
            }

            neighbor.parent = currentNode;
            neighbor.g = tentative_g;
            neighbor.h = heuristic(neighbor.book, goal);
            neighbor.f = neighbor.g + neighbor.h;
        }
    }
    return [];
}

function heuristic(bookA, bookB) {
    // Simple heuristic: length of title difference
    return Math.abs(bookA.title.length - bookB.title.length);
}

function getNeighbors(node) {
    // Implement logic to get neighbors of the current node (books)
    return []; // Placeholder
}

function reconstructPath(node) {
    const path = [];
    while (node) {
        path.push(node.book);
        node = node.parent;
    }
    return path.reverse();
}

class Line {
  static counter = 0;

  constructor(point1, point2, type = 0) {
    this.id = Line.counter;
    Line.counter++;
    this.point1 = point1;
    this.point2 = point2;
    this.type = type;
  }

  changeType(playerTurn) {
  }

  makeNew(type) {
    return new Line(newPoint(this.point1), new Point(this.point2), type);
  }
}

class Point {
  static counter = 0;

  constructor(x, y, degree = [0, 0]) {
    this.id = Point.counter;
    Point.counter++;
    this.x = x;
    this.y = y;
    this.degree = degree;
  }
}

class Node {
  static counter = 0;
  static depthLimit = 4;
  constructor(parent = null, lines) {
    this.parent = parent;
    this.lines = lines.map(value => new Line(value.point1));
    this.value = 0;
    this.children = [];
  }

  copy() {
    return new Node(this.parent, this.points, this.lines);
  }

  childrenGenerator(player) {
    let arr = [],
      unselectedLines = this.lines.filter((line) => line.type == 0),
      temp;
    for (let i = 0; i < unselectedLines.length; i++) {
      temp = new Node(this, this.points, this.lines);
      arr.push();
    }
  }
}

export { Line, Point };

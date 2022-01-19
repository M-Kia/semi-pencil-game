class Line {
  static counter = 0;
  constructor(id, point1, point2, type) {
    this.id = counter;
    counter++;
    this.point1 = point1;
    this.point2 = point2;
    this.type = type;
  }
}

class Point {
  static counter = 0;
  constructor(x, y) {
    this.id = counter;
    counter++;
    this.x = x;
    this.y = y;
    this.degree = { player1: 0, player2: 0 };
  }
}

export { Line, Point };

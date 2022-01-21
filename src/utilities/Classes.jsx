class CustomNode {
  static counter = 0;
  static depthLimit = 4;
  constructor(points, lines, type, parent) {
    this.id = CustomNode.counter;
    CustomNode.counter++;
    this.parent = parent;
    this.depth = parent !== null ? parent.depth + 1 : 1;
    this.points = JSON.parse(JSON.stringify(points));
    this.lines = JSON.parse(JSON.stringify(lines));
    this.value = 0;
    this.isFinal = 0;
    this.children = [];
    this.type = type;
    this.isLeaf = CustomNode.depthLimit == this.depth ? true : false;
  }

  depthChanger() {
    this.depth--;
    if (!"1-1".includes(this.isFinal) && this.children.length > 0) {
      this.children.forEach((value) => value.depthChanger());
      this.isLeaf = false;
    }
  }

  childrenGenerator(player) {
    if (this.children.length > 0 || this.isLeaf || this.isFinal) return;
    if (this.lostCondition(1)) {
      this.value = 1000000000000000000000000000;
      this.isLeaf = true;
      this.isFinal = 1;
      return;
    } else if (this.lostCondition(2)) {
      this.value = -1000000000000000000000000000;
      this.isLeaf = true;
      this.isFinal = -1;
      return;
    }
    let unselectedLines = this.lines.filter((line) => line.type == 0),
      temp;
      if (unselectedLines.length == 0){
        this.isFinal = 1;
        this.isLeaf = true;
      }
    unselectedLines.forEach((value) => {
      temp = new CustomNode(this.points, this.lines, player, this);
      temp.lines.map((val) => {
        if (val.id == value.id) {
          val.type = player;
          val.point1.degree[player-1]++;
          val.point2.degree[player-1]++;
        };
        return val;
      });
      this.children.push(temp);
    });
  }

  validate() {
    let value = 0;
    if (!isLeaf || value != 0) return;
    if (this.lostCondition(1)) {
      value = 10000000000000;
    } else if (this.lostCondition(2)) {
      value = -10000000000000;
    } else {
      this.points.forEach((point) => {
        let x = point.degree[0] == 1 ? 1 : point.degree[0];
        let y = point.degree[1] == 1 ? -1 : -1 * point.degree[1];
        value += x + y;
      });
    }
    return value;
  }

  minimax(alpha, beta, player){
    if (this.isFinal || this.isLeaf){
      return this.validate();
    }
    let value;
    if (player == 1){
      value = Number.NEGATIVE_INFINITY;
      for ()
    } else {

    }
    return value;
  }

  static intersects(line1, line2) {
    var det, gamma, lambda;
    det =
      (line1.point2.x - line1.point1.x) * (line2.point2.y - line2.point1.y) -
      (line2.point2.x - line2.point1.x) * (line1.point2.y - line1.point1.y);
    if (det === 0) {
      return false;
    } else {
      lambda =
        ((line2.point2.y - line2.point1.y) * (line2.point2.x - line1.point1.x) +
          (line2.point1.x - line2.point2.x) *
            (line2.point2.y - line1.point1.y)) /
        det;
      gamma =
        ((line1.point1.y - line1.point2.y) * (line2.point2.x - line1.point1.x) +
          (line1.point2.x - line1.point1.x) *
            (line2.point2.y - line1.point1.y)) /
        det;
      return 0 <= lambda && lambda <= 1 && 0 <= gamma && gamma <= 1;
    }
  }

  static findTriangle(lines) {
    for (let k = 0; k < lines.length - 2; k++) {
      for (let i = k + 1; i < lines.length - 1; i++) {
        if (CustomNode.intersects(lines[k], lines[i])) {
          for (let j = i + 1; j < lines.length; j++) {
            if (
              CustomNode.intersects(lines[i], lines[j]) &&
              CustomNode.intersects(lines[j], lines[k])
            )
              return true;
          }
        }
      }
    }
  }

  lostCondition(player) {
    let theLines = this.lines.filter((line) => line.type == player);
    return theLines > 2 && CustomNode.findTriangle(theLines);
  }
}

export { CustomNode };

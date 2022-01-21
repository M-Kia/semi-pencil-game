class CustomNode {
  static counter = 0;
  static depthLimit = 4;
  constructor(points, lines, type, parent) {
    this.parent = parent;
    this.depth = parent !== null ? parent.depth + 1 : 1;
    this.points = JSON.parse(JSON.stringify(points));
    this.lines = JSON.parse(JSON.stringify(lines));
    this.value = 0;
    this.children = [];
    this.type = type;
    this.isLeaf = CustomNode.depthLimit == this.depth ? true : false;
  }

  childrenGenerator(player) {
    if (this.lostCondition(1)) {
      this.value = 10000000000000;
      this.isLeaf = true;
    } else if (this.lostCondition(2)) {
      this.value = -10000000000000;
      this.isLeaf = true;
    }
    let unselectedLines = this.lines.filter((line) => line.type == 0),
      temp;
    unselectedLines.forEach((value) => {
      temp = new CustomNode(this, this.points, this.lines);
      temp.lines.map((val) => {
        if (val.id == value.id) return { ...val, type: player };
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

  // static checkLinesHit(line1, line2) {
  //   if (line1.formula.a == line2.formula.a) return false;
  //   let x, y;
  //   if (line1.formula.a == line2.formula.a * -1) {
  //     y = (line1.formula.b + line2.formula.b) / 2;
  //     x = (y - line1.formula.b) / line1.formula.a;
  //   } else {
  //     x =
  //       (line1.formula.b + line2.formula.b) /
  //       (line1.formula.a + line2.formula.a);
  //     y = line1.formula.a * x + line1.formula.b;
  //   }
  //   console.log(line1.formula);
  //   console.log(line2.formula);
  //   console.log(x, y);
  //   return (
  //     (line1.point1.x >= x &&
  //       line1.point1.y >= y &&
  //       line1.point2.x <= x &&
  //       line2.point2.y <= y) ||
  //     (line1.point1.x <= x &&
  //       line1.point1.y <= y &&
  //       line1.point2.x >= x &&
  //       line2.point2.y >= y)
  //   );
  // }

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
    let theLines = this.lines.filter(
      (line) => line.type == player //&&
      // line.point1.degree[player - 1] > 1 &&
      // line.point2.degree[player - 1] > 1
    );
    if (theLines < 3) return false;
    // let loose = false;

    // for (let i = 0; i < theLines.length - 1; i++) {
    //   for (let j = i + 1; j < theLines.length; j++) {
    //     if (
    //       theLines[i].point1.id == theLines[j].point2.id ||
    //       theLines[i].point2.id == theLines[j].point2.id
    //     ) {
    //       let temp = theLines.filter(
    //         (line, index) =>
    //           index != j &&
    //           index != i &&
    //           (line.point1.id == theLines[j].point1.id ||
    //             line.point2.id == theLines[j].point1.id) && ( line.point1.id == theLines[i].point1.id ||
    //               line.point2.id == theLines[i].point1.id ||
    //               line.point1.id == theLines[i].point2.id ||
    //               line.poin2.id == theLines[i].point2.id)
    //       );
    //       if (temp.length > 0) {
    //         // let temp2 = temp.filter(
    //         //   (line) =>

    //         // );
    //         // if (temp2.length > 0) {
    //         // }
    //         loose = true;
    //       }
    //     } else if (
    //       theLines[i].point1.id == theLines[j].point1.id ||
    //       theLines[i].point2.id == theLines[j].point1.id
    //     ) {
    //       let temp = theLines.filter(
    //         (line, index) =>
    //           index != j &&
    //           index != i &&
    //           (line.point1.id == theLines[j].point2.id ||
    //             line.point2.id == theLines[j].point2.id) &&(
    //               line.point1.id == theLines[i].point1.id ||
    //               line.point2.id == theLines[i].point1.id ||
    //               line.point1.id == theLines[i].point2.id ||
    //               line.poin2.id == theLines[i].point2.id)
    //       );
    //       if (temp.length > 0) {
    //         // let temp2 = temp.filter(
    //         //   (line) =>
    //         // );
    //         // if (temp2.length > 0) {
    //         // }
    //         loose = true;
    //       }
    //     }
    //   }
    // }

    // return loose;
    return CustomNode.findTriangle(theLines);
  }
}

export { CustomNode };

class CustomNode {
  static counter = 0;
  static depthLimit = 3;
  static difficulty = 1;

  constructor(points, lines) {
    this.points = JSON.parse(JSON.stringify(points));
    this.lines = JSON.parse(JSON.stringify(lines));
  }

  validate() {
    let value = 0;
    if (this.lostCondition(1)) {
      value = Number.POSITIVE_INFINITY;
    } else if (this.lostCondition(2)) {
      value = Number.NEGATIVE_INFINITY;
    } else {
      this.points.forEach((point) => {
        let x = point.degree[0] == 1 ? 1 : point.degree[0];
        let y = point.degree[1] == 1 ? -1 : -1 * point.degree[1];
        value += x + y;
      });
    }
    return value;
  }

  // minimax(alpha, beta, depth, player) {
  minimax(alpha, beta, depth) {
    if (depth == CustomNode.depthLimit) {
      return this.validate();
    }
    let value;
    let theLines = this.lines.filter((line) => line.type == 0);
    if (depth % 2 == 0) {
      value = Number.NEGATIVE_INFINITY;
      theLines.forEach((line) => {
        let temp = new CustomNode(this.points, this.lines);
        // if (temp.lostCondition(player)) {
        if (temp.lostCondition(2)) {
          value = Number.POSITIVE_INFINITY;
        } else {
          alpha = Math.max(alpha, value);
          if (beta < alpha) return;
          temp.lines[
            temp.lines.findIndex((value) => value.id == line.id)
          ].type = 2;
          // ].type = player;
          value = Math.max(
            value,
            // temp.minimax(alpha, beta, depth + 1, player == 1 ? 2 : 1)
            temp.minimax(alpha, beta, depth + 1, 2)
          );
        }
      });
    } else {
      value = Number.POSITIVE_INFINITY;
      theLines.forEach((line) => {
        let temp = new CustomNode(this.points, this.lines);
        // if (temp.lostCondition(player)) {
        if (temp.lostCondition(1)) {
          value = Number.NEGATIVE_INFINITY;
        } else {
          beta = Math.min(beta, value);
          if (beta < alpha) return;
          temp.lines[
            temp.lines.findIndex((value) => value.id == line.id)
          ].type = 1;
          // ].type = player;
          value = Math.min(
            value,
            // temp.minimax(alpha, beta, depth + 1, player == 1 ? 2 : 1)
            temp.minimax(alpha, beta, depth + 1, 1)
          );
        }
      });
    }
    return value;
  }

  // chooseLine(player) {
  chooseLine() {
    let theLines = this.lines.filter((line) => line.type == 0);
    if (this.lines.filter((line) => line.type == 2).length < 2)
      return theLines[Math.floor(Math.random() * theLines.length)];
    let max = Number.NEGATIVE_INFINITY;
    let bestMove;
    theLines.forEach((line) => {
      let temp = new CustomNode(this.points, this.lines);
      temp.lines[temp.lines.findIndex((val) => val.id == line.id)].type = 2;
      // player;
      let val = temp.minimax(
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        1,
        1
        // player
      );
      if (val >= max) {
        bestMove = line;
        max = val;
      }
    });
    return bestMove;
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

  static checkLinesHit(lines) {
    theLines = lines.filter(
      (line) =>
        line.point1.degree[player - 1] > 1 && line.point2.degree[player - 1] > 1
    );
    for (let i = 0; i < theLines.length - 1; i++) {
      for (let j = i + 1; j < theLines.length; j++) {
        if (
          theLines[i].point1.id == theLines[j].point2.id ||
          theLines[i].point2.id == theLines[j].point2.id
        ) {
          if (
            theLines.some(
              (line, index) =>
                index != j &&
                index != i &&
                (line.point1.id == theLines[j].point1.id ||
                  line.point2.id == theLines[j].point1.id) &&
                (line.point1.id == theLines[i].point1.id ||
                  line.point2.id == theLines[i].point1.id ||
                  line.point1.id == theLines[i].point2.id ||
                  line.poin2.id == theLines[i].point2.id)
            )
          ) {
            loose = true;
          }
        } else if (
          theLines[i].point1.id == theLines[j].point1.id ||
          theLines[i].point2.id == theLines[j].point1.id
        ) {
          if (
            theLines.some(
              (line, index) =>
                index != j &&
                index != i &&
                (line.point1.id == theLines[j].point2.id ||
                  line.point2.id == theLines[j].point2.id) &&
                (line.point1.id == theLines[i].point1.id ||
                  line.point2.id == theLines[i].point1.id ||
                  line.point1.id == theLines[i].point2.id ||
                  line.poin2.id == theLines[i].point2.id)
            )
          ) {
            loose = true;
          }
        }
      }
    }
  }

  static chooseLinesHitFunc(lines) {
    switch (CustomNode.difficulty) {
      case 1:
        return this.checkLinesHit(lines);
      case 2:
        return this.findTriangle(lines);
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
            ) {
              let points = [lines[i], lines[j], lines[k]].reduce(
                (total, line) => {
                  return [...total, line.point1.id, line.point2.id];
                },
                []
              );
              if (
                points.every(
                  (value) => points.filter((val) => value == val).length < 3
                )
              )
                return true;
            }
          }
        }
      }
    }
    return false;
  }

  lostCondition(player) {
    let theLines = this.lines.filter((line) => line.type == player);
    if (theLines.length < 3) return false;
    return CustomNode.chooseLinesHitFunc(theLines);
  }
}

export { CustomNode };

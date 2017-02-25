function DataLine(amount, label) {
    this.amount = amount;
    this.label = label;
    this.percent = 0;
}
function RoundScore(svg, x, y) {
    this.draw = document.getElementById(svg);
    this.x = x;
    this.y = y;
    this._radius = 100;
    this._width = 20;
    this.data = [];
    this._colors = round_score_colors;
    this.showLegend = false;
    this.showValues = false;
    this.showPercents = false;
    this.colors = function(colors) {
        this._colors = colors;
        return this;
    };
    this.displayLegend = function () {
        this.showLegend = true;
        return this;
    };
    this.displayValues = function () {
        this.showValues = true;
        return this;
    };
    this.displayPercents = function () {
        this.showPercents = true;
        return this;
    };
    this.width = function (width) {
        this._width = width;
        return this;
    };
    this.radius = function (radius) {
        this._radius = radius;
        return this;
    };
    this.add = function (amount, label) {
        this.data[this.data.length] = new DataLine(amount, label);
        return this;
    };
    this.load = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var line = arr[i];
            this.add(line.amount, line.label);
        }
        return this;
    };
    this.recalc = function () {
        var total = 0;
        this.data.forEach(function (item) {
            total += item.amount;
        });
        this.data.forEach(function (item) {
            item.percent = Math.round(100 * item.amount / total);
        });
        this.data.sort(function (a, b) {
            return b.percent - a.percent;
        });
        var checkPercentage = 0;
        this.data.forEach(function (item) {
            checkPercentage += item.percent;
        });
        if (checkPercentage > 100) {
            this.data[this.data.length - 1].percent -= checkPercentage - 100;
        }
    };
    this.legendItem = function (line) {
        var s = line.label;
        var showDetails = this.showValues || this.showPercents;
        if (showDetails) {
            s += " (";
            if (this.showValues) {
                s += line.amount;
                if (this.showPercents) {
                    s += ", ";
                }
            }
            if (this.showPercents) {
                s += line.percent;
                s += "%";
            }
            s += ")";
        }
        return s;
    };
    this.show = function () {
        this.recalc();
        var em = 20;
        var offset = this.y - this.data.length * em / 2;
        var cursor = 0;
        for (var i = 0; i < this.data.length; i++) {
            var line = this.data[i];
            var color = this._colors[i];
            var nextPos = cursor + line.percent;
            var startAngle = Math.round(cursor * 3.6);
            var endAngle = Math.round(nextPos * 3.6);
            var arc = asSvgPathArc(this.x, this.y, this._radius, startAngle, endAngle);

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("id", "path" + i);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", this._width.toString());
            path.setAttribute("d", arc);
            this.draw.appendChild(path);
            if (this.showLegend) {
                var xr = 1.75 * this.x + 1.5 * em;
                var yr = offset + i * em;

                var xt = xr + em;
                var yt = yr + (0.7 * em);

                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("id", "rect" + i);
                rect.setAttribute("x", xr.toString());
                rect.setAttribute("y", yr.toString());
                rect.setAttribute("width", "15");
                rect.setAttribute("height", "15");
                rect.setAttribute("fill", color);
                this.draw.appendChild(rect);

                var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("id", "text" + i);
                text.setAttribute("x", xt.toString());
                text.setAttribute("y", yt.toString());
                var s = this.legendItem(line);
                var t = document.createTextNode(s);
                text.appendChild(t);
                this.draw.appendChild(text);
            }
            cursor = nextPos;
        }
    }
}
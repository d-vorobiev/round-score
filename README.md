# round-score
Doughnut chart on js, clean and simple.

![Doughnut chart example](docs/round-score-example.png?raw=true "Doughnut chart example")

```javascript
var chart_data = [
    {amount: 8, label: "Rincewind and Wizards"},
    {amount: 6, label: "Witches of Lancre"},
    {amount: 5, label: "Death Domain"},
    {amount: 8, label: "City Watch"},
    {amount: 6, label: "Small Gods, Pyramids etc."},
    {amount: 5, label: "Tiffany Aching"},
    {amount: 3, label: "Moist von Lipwig"}
];
new RoundScore("round-score-board")
    .at(150, 150)
    .radius(100)
    .width(20)
    .displayLegend()
    .displayValues()
    .displayPercents()
    .load(chart_data)
    .show();
```

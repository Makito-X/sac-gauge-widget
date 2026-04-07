alert("box.js loaded");
console.log("✅ box.js loaded");
class SimpleGauge extends HTMLElement {
  constructor() {
    super();
	console.log("✅ constructor called");
	this._value = 0;
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        svg {
          width: 100%;
          height: 100%;
        }
        text {
          font-size: 22px;
          fill: #333;
          text-anchor: middle;
        }
      </style>

      <svg viewBox="0 0 200 120">
        <!-- Background Halbkreis -->
        <path id="bg"
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="#eee"
          stroke-width="12"
          fill="none"
        />

        <!-- Progress Halbkreis -->
        <path id="progress"
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="#00bcd4"
          stroke-width="12"
          fill="none"
          stroke-linecap="round"
        />

        <!-- Wert -->
        <text id="value" x="100" y="70">--%</text>

        <!-- Label -->
        <text id="label" x="100" y="95" style="font-size:14px; fill:#777;">
          Gauge
        </text>
      </svg>
    `;
  }


onCustomWidgetAfterUpdate() {
    if (!this.dataBindings) return;

    const binding = this.dataBindings.getDataBinding("data");
    if (!binding) return;

    const resultSet = binding.getResultSet();
    if (!Array.isArray(resultSet) || resultSet.length === 0) return;

    // ✅ erste Zeile, erste Kennzahl
    const cell = resultSet[0][1];
    if (!cell) return;

    let value = Number(cell.raw);
    if (isNaN(value)) value = 0;

    // ✅ Prozent-Normalisierung
    // 0.41 → 41 %
    if (value <= 1) {
      value = value * 100;
    }

    this.setValue(value);
  }

  setValue(val) {
    this._value = val;
    this.updateGauge();
  }

  updateGauge() {
    const progress = this.shadowRoot.getElementById("progress");
    const valueText = this.shadowRoot.getElementById("value");

    if (!progress || !valueText) return;

    const pathLength = progress.getTotalLength();
    progress.style.strokeDasharray = pathLength;

    const offset = pathLength * (1 - this._value / 100);
    progress.style.strokeDashoffset = offset;

    valueText.textContent = Math.round(this._value) + "%";
  }
}

customElements.define("com-simple-gauge", SimpleGauge);


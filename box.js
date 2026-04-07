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



onCustomWidgetBeforeUpdate(changedProperties) {
    console.log("changedProperties", changedProperties);

    if (!changedProperties || !changedProperties.dataBindings) {
      return;
    }

    const binding =
      changedProperties.dataBindings.data;

    if (!binding || !binding.resultSet) {
      return;
    }

    const rs = binding.resultSet;
    if (!Array.isArray(rs) || rs.length === 0) return;

    const cell = rs[0][1];
    if (!cell) return;

    let value = Number(cell.raw);
    if (isNaN(value)) return;

    if (value <= 1) value *= 100;

    this._value = value;
    this.updateGauge();
  }

  updateGauge() {
    const progress = this.shadowRoot.getElementById("progress");
    const valueText = this.shadowRoot.getElementById("value");

    const pathLength = progress.getTotalLength();
    progress.style.strokeDasharray = pathLength;

    const offset = pathLength * (1 - this._value / 100);
    progress.style.strokeDashoffset = offset;

    valueText.textContent = Math.round(this._value) + "%";
  }
}

customElements.define("com-simple-gauge", SimpleGauge);



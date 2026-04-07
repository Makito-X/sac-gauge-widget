class SimpleGauge extends HTMLElement {
  constructor() {
    super();
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
        <text id="value" x="100" y="70">50%</text>

        <!-- Label -->
        <text id="label" x="100" y="95" style="font-size:14px; fill:#777;">
          Gauge
        </text>
      </svg>
    `;
  }

 

 


onDataChanged() {
  if (!this.dataBindings) return;

  const binding = this.dataBindings.getDataBinding("value");
  if (!binding) return;

  const dataObj = binding.getData();
  if (!dataObj || !Array.isArray(dataObj.data)) return;

  const firstCell = dataObj.data[0];
  if (!firstCell) return;

  const value = Number(firstCell.raw) || 0;
  this.setValue(value);
}


  updateGauge() {
    const progress = this.shadowRoot.getElementById("progress");
    const valueText = this.shadowRoot.getElementById("value");

    if (!progress || !valueText) return;

    const pathLength = progress.getTotalLength();
    progress.style.strokeDasharray = pathLength;
    progress.style.strokeDashoffset =
      pathLength * (1 - this._value / 100);

    valueText.textContent = Math.round(this._value) + "%";
  }
}

customElements.define("com-simple-gauge", SimpleGauge);

class SimpleGauge extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });

    this._shadowRoot.innerHTML = `
      <style>
        svg {
          width: 100%;
          height: 100%;
        }
        text {
          font-size: 20px;
          fill: #333;
          dominant-baseline: middle;
          text-anchor: middle;
        }
      </style>

      <svg viewBox="0 0 200 200">
        <!-- Background -->
        <circle cx="100" cy="100" r="80"
          stroke="#eee"
          stroke-width="12"
          fill="none"/>

        <!-- Progress -->
        <circle id="progress"
          cx="100" cy="100" r="80"
          stroke="#00bcd4"
          stroke-width="12"
          fill="none"
          stroke-linecap="round"
          transform="rotate(-90 100 100)"
        />

        <!-- Label -->
        <text id="label" x="100" y="100">50%</text>
      </svg>
    `;
  }

  onCustomWidgetAfterUpdate(changedProperties) {
    const value = this.value || 0;
    const color = this.color || "#00bcd4";

    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    const progress = this._shadowRoot.getElementById("progress");
    const label = this._shadowRoot.getElementById("label");

    progress.style.stroke = color;
    progress.style.strokeDasharray = circumference;

    const offset = circumference * (1 - value / 100);
    progress.style.strokeDashoffset = offset;

    label.textContent = value + "%";
  }
}

customElements.define("com-simple-gauge", SimpleGauge);
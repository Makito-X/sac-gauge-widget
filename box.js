class SimpleGauge extends HTMLElement {
  constructor() {
    super();

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
  const binding = this.dataBindings.getDataBinding("value");

  if (!binding) {
    this.setValue(0);
    return;
  }

  const data = binding.getData();

  if (!data || data.length === 0) {
    this.setValue(0);
    return;
  }

  // SAC liefert numerische Werte als Objekt
  const val = data[0].value;

  this.setValue(val);
}

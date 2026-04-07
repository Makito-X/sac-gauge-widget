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

  onCustomWidgetAfterUpdate() {
    
	let value = 0;

	  try {

		console.log("DataBinding:", this.dataBinding);

		if (this.dataBinding && this.dataBinding.data) {

		  const data = this.dataBinding.data;

		  // 🔒 sicherstellen dass Array
		  if (Array.isArray(data)) {
			if (data.length > 0 && data[0].value !== undefined) {
			  value = data[0].value;
			}
		  } else {
			console.log("Data is NOT array:", data);
		  }

		} else {
		  console.log("No dataBinding available");
		}

	  } catch (e) {
		console.error("ERROR:", e);
	  }

	  const progress = this.shadowRoot.getElementById("progress");
	  const valueText = this.shadowRoot.getElementById("value");

	  if (!progress || !valueText) return;

	  const pathLength = progress.getTotalLength();

	  progress.style.strokeDasharray = pathLength;

	  const offset = pathLength * (1 - value / 100);
	  progress.style.strokeDashoffset = offset;

	  valueText.textContent = value + "%";
	}
}

customElements.define("com-simple-gauge", SimpleGauge);

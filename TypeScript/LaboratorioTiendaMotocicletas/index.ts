type Category =
  | "Sport"
  | "Cruiser"
  | "Touring"
  | "Dirt"
  | "Adventure"
  | "Naked"
  | "Electric";

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
  engine_cc?: number; // el endpoint real no siempre trae este campo
}

async function fetchMotorcycles(): Promise<Motorcycle[]> {
  const response = await fetch(
    "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json"
  );
  const data: Motorcycle[] = await response.json();
  return data;
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
  return `
    <article class="motorcycle-card">
      <img
        src="${motorcycle.image_url}"
        alt="${motorcycle.name}"
        class="motorcycle-card-image-container"
      />

      <span class="motorcycle-card-year-badge">
        ${motorcycle.year}
      </span>

      <h2 class="motorcycle-card-title">
        ${motorcycle.name}
      </h2>

      <p class="motorcycle-card-manufacturer">
        ${motorcycle.manufacturer}
      </p>

      <p class="motorcycle-card-category">
        ${motorcycle.category}
      </p>

      <p class="motorcycle-card-description">
        ${motorcycle.description}
      </p>

      <p class="motorcycle-card-price">
        $${motorcycle.price}
      </p>

      <p class="motorcycle-card-engine">
        ${motorcycle.engine_cc ? `${motorcycle.engine_cc}cc` : "N/A"}
      </p>
    </article>
  `;
}

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    this.allMotorcycles = await fetchMotorcycles();
    this.renderMotorcycles();
  }

  renderMotorcycles() {
    // Si todavía no llegaron los datos, no renderizamos nada
    // (evita pisar el grid ya renderizado por otra instancia mientras
    // esta espera su propio fetch)
    if (this.allMotorcycles.length === 0) return;

    const grilla = document.getElementById("motorcycle-grid")!;
    const resultado = document.getElementById("results-number")!;

    grilla.innerHTML = this.allMotorcycles
      .map((moto) => renderMotorcycleCard(moto))
      .join("");

    resultado.textContent = `${this.allMotorcycles.length}`;
  }
}

const app = new MotorcycleGalleryApp();
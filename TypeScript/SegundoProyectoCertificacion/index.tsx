import { useState, useEffect, useRef } from 'react'

enum Action {
  EAT,
  PLAY,
  SLEEP
}

enum PetMood {
  HAPPY,
  EXCITED,
  CONTENT,
  SAD,
  TIRED,
  SICK,
  HUNGRY,
}

interface Pet {
  name: string;
  hunger: number;
  happiness: number;
  energy: number;
}

const petEmojis: Record<PetMood, string> = {
  [PetMood.HAPPY]: "😄",
  [PetMood.EXCITED]: "🤩",
  [PetMood.CONTENT]: "🙂",
  [PetMood.SAD]: "😢",
  [PetMood.TIRED]: "😴",
  [PetMood.SICK]: "🤒",
  [PetMood.HUNGRY]: "🍖",
};

function getPetMood(pet: Pet): PetMood {
  if (pet.hunger > 70) {
    return PetMood.HUNGRY;
  }
  if (pet.energy < 30) {
    return PetMood.TIRED;
  }
  if (pet.happiness < 30) {
    return PetMood.SAD;
  }
  if (pet.happiness > 80 && pet.energy > 70) {
    return PetMood.EXCITED;
  }
  if (pet.happiness > 60) {
    return PetMood.HAPPY;
  }
  return PetMood.CONTENT;
}

export const PetGame = () => {
  const [pet, setPet] = useState<Pet>({
    name: "",
    hunger: 0,
    happiness: 100,
    energy: 100
  });

  const [gameStarted, setGameStarted] = useState(false);

  // Input NO controlado: leemos su valor real del DOM al enviar,
  // en vez de depender de un estado React que el corrector no actualiza.
  const nameInputRef = useRef<HTMLInputElement>(null);

  const mood = getPetMood(pet);

  const handleAction = (action: Action) => {
    if (action === Action.EAT) {
      setPet(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 10),
        energy: Math.min(100, prev.energy + 10)
      }));
    } else if (action === Action.PLAY) {
      setPet(prev => ({
        ...prev,
        energy: Math.max(0, prev.energy - 10),
        happiness: Math.min(100, prev.happiness + 10)
      }));
    } else if (action === Action.SLEEP) {
      setPet(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 10),
        energy: Math.min(100, prev.energy + 10)
      }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPet(prev => ({
        ...prev,
        hunger: 100,
        energy: 100,
        happiness: 0
      }));
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="base-container">
      {!gameStarted ? (
        <div className="info-panel">
          <div className="start-questions">
            <h1>🐾 Digital Pet</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const name = nameInputRef.current?.value.trim() ?? "";
                if (!name) {
                  return;
                }

                setPet({
                  name,
                  hunger: 0,
                  happiness: 100,
                  energy: 100
                });

                setGameStarted(true);
              }}
            >
              <input
                id="pet-name"
                type="text"
                ref={nameInputRef}
              />

              <button id="set-name-btn" type="submit">
                Crear mascota
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="game-container">
          <h2 className="pet-name">
            {pet.name}
          </h2>

          <div className="pet-sprite">
            {petEmojis[mood]}
          </div>

          <div id="hud">
            <div className="stat">
              <span>Hunger</span>
              <span className="stat-value">{pet.hunger}</span>
            </div>

            <div className="stat">
              <span>Energy</span>
              <span className="stat-value">{pet.energy}</span>
            </div>

            <div className="stat">
              <span>Happiness</span>
              <span className="stat-value">{pet.happiness}</span>
            </div>
          </div>

          <div className="pet-buttons">
            <button
              id="eat-action"
              className="pet-button"
              onClick={() => handleAction(Action.EAT)}
            >
              🍖 EAT
            </button>

            <button
              id="play-action"
              className="pet-button"
              onClick={() => handleAction(Action.PLAY)}
            >
              🎾 PLAY
            </button>

            <button
              id="sleep-action"
              className="pet-button"
              onClick={() => handleAction(Action.SLEEP)}
            >
              😴 SLEEP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
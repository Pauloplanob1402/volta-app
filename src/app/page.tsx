// src/app/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { phrasesByState, mentalStates } from "@/lib/phrases";
import { Separator } from "@/components/ui/separator";

// --- Componentes Modulares ---

const AppHeader = () => (
  <header className="w-full px-8 pt-8 pb-4">
    <div className="mx-auto flex max-w-7xl items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock className="size-5 text-foreground" />
        <h1 className="text-xl font-bold tracking-wider text-foreground">
          VOLTA
        </h1>
      </div>
      <span className="text-xs font-semibold tracking-widest text-muted-foreground">
        MESTRE DO TEMPO
      </span>
    </div>
  </header>
);

const InitialStateBadge = ({ isVisible }: { isVisible: boolean }) => (
  <div
    className={`transition-opacity duration-500 ${
      isVisible ? "animate-in fade-in" : "opacity-0"
    }`}
  >
    <span className="mb-8 inline-block rounded-full border border-border bg-background px-4 py-1.5 text-sm text-foreground shadow-sm">
      Consciência Ativada
    </span>
  </div>
);


const FocusPhrase = ({ phrase }: { phrase: string }) => (
    <div className="relative flex min-h-[200px] w-full max-w-4xl items-center justify-center px-4 md:min-h-[240px]">
      {phrase && (
        <h2
          key={phrase}
          className="text-5xl font-medium text-center text-foreground animate-in fade-in duration-1000 md:text-6xl lg:text-7xl"
        >
          {phrase}
        </h2>
      )}
    </div>
  );

const ActionButton = ({ onClick }: { onClick: () => void }) => (
    <div className="mt-12 flex flex-col items-center gap-4">
      <Button
        onClick={onClick}
        size="lg"
        className="min-w-[240px] rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 hover:bg-foreground"
      >
        Assumir controle
        <ArrowRight className="ml-2 size-5" />
      </Button>
      <p className="text-sm text-muted-foreground">
        Respire fundo antes do próximo passo
      </p>
    </div>
  );

const AppFooter = () => (
    <footer className="w-full px-8 pb-8 pt-4">
      <div className="mx-auto max-w-7xl">
        <Separator className="mb-6 bg-border" />
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-semibold text-foreground">
              O agora é o que realmente importa.
            </h3>
            <p className="text-sm text-muted-foreground">
              Sua produtividade começa no seu próximo 'não'.
            </p>
          </div>
          <div className="hidden rounded-full border border-foreground/80 px-4 py-1.5 text-xs font-semibold tracking-wider text-foreground/80 sm:block">
            FOCO PROFUNDO ATIVO
          </div>
        </div>
      </div>
    </footer>
  );
  

// --- Componente Principal da Página ---

export default function Home() {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Math.random() e localStorage só devem ser usados no lado do cliente.
    const visited = localStorage.getItem("volta-visited");
    if (!visited) {
      setIsFirstVisit(true);
      localStorage.setItem("volta-visited", "true");
    } else {
        // Para visitas recorrentes, a frase inicial já é aleatória
        getNewPhrase();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNewPhrase = useCallback(() => {
    if (isFirstVisit) {
      setCurrentPhrase("Foque no que importa, diga não ao resto.");
      // Não mudar isFirstVisit aqui para que o badge continue visível
      return;
    }

    const randomState = mentalStates[Math.floor(Math.random() * mentalStates.length)];
    const phrasesForState = phrasesByState[randomState].frases;
    let newPhrase = "";

    if (phrasesForState.length > 1) {
      do {
        newPhrase = phrasesForState[Math.floor(Math.random() * phrasesForState.length)];
      } while (newPhrase === currentPhrase);
    } else {
      newPhrase = phrasesForState[0] || "Volta.";
    }
    setCurrentPhrase(newPhrase);
  }, [currentPhrase, isFirstVisit]);

  // Define a frase inicial assim que o componente é montado no cliente
  useEffect(() => {
    // A frase da primeira visita é definida no primeiro useEffect
    if (isFirstVisit) {
      setCurrentPhrase("Foque no que importa, diga não ao resto.");
    }
  }, [isFirstVisit]);
  
  const handleActionClick = () => {
    if (isFirstVisit) {
      setIsFirstVisit(false); // Agora o badge some e as frases se tornam aleatórias
    }
    getNewPhrase();
  };

  return (
    <div className="flex min-h-screen w-full flex-col font-sans items-center justify-between bg-background text-foreground">
      <AppHeader />
      <main className="flex flex-grow flex-col items-center justify-center p-4 text-center">
        <InitialStateBadge isVisible={isFirstVisit} />
        <FocusPhrase phrase={currentPhrase} />
        <ActionButton onClick={handleActionClick} />
      </main>
      <AppFooter />
    </div>
  );
}

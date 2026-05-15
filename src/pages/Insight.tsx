import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";

const Insight = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const { cities } = useAppSelector((state) => state.cities);

  const analyze = async () => {
    if (cities.length === 0 || loading) return;

    setIsLoading(true);
    setInsight("");

    try {
      const cityData = cities
        .map(
          (city) =>
            `- ${city.cityName}: ${city.notes || "No specific notes provided."}`,
        )
        .join("\n");

      const prompt = `You are a travel psychologist. Based on this travel history:
      ${cityData}

      Task: Provide a 3-sentence analysis of MY travel personality. 
      IMPORTANT: Speak directly to me using "You" and "Your". Do not say "The user".`;

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2:0.5b", 
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Ollama is not responding. Make sure it's running with OLLAMA_ORIGINS='http://localhost:5173' ollama serve");
      }

      const data = await response.json();
      setInsight(data.response);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to connect to local AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={analyze}
        disabled={loading || cities.length === 0}
        className="bg-[#ffb545] text-black font-bold py-2 px-4 rounded
      disabled:bg-gray-600 transition-colors hover:bg-[#e6a33e]"
      >
        {loading ? "Analyzing..." : "✨ Generate My Travel Insights"}
      </button>

      {insight && (
        <div className="bg-[#42484d] p-4 rounded border-l-4 border-[#ffb545] shadow-lg">
          <h3 className="text-[#ffb545] font-bold mb-2 uppercase text-xs tracking-widest">
            AI Travel Persona
          </h3>
          <p className="text-white leading-relaxed">{insight}</p>
        </div>
      )}

      {cities.length === 0 && (
        <p className="text-gray-400 text-sm text-center">
          Add some cities first to unlock AI insights.
        </p>
      )}
    </div>
  );
};

export default Insight;

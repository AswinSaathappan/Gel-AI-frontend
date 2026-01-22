import { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ProcessingPipeline } from './components/ProcessingPipeline';
import { DeepLearningPanel } from './components/DeepLearningPanel';
import { ResultSection } from './components/ResultSection';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { motion } from 'motion/react';

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isReadyToProcess, setIsReadyToProcess] = useState(false);

  const [analysisResult, setAnalysisResult] = useState<{
  error: number;
  threshold: number;
  result: "Normal" | "Anomalous";
} | null>(null);


  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setShowResults(false);
    setIsReadyToProcess(true);
  };

 const handleStartProcess = async () => {
  setIsReadyToProcess(false);
  setIsProcessing(true);

  const response = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: uploadedImage })
  });

  const data = await response.json();

  setAnalysisResult(data);
  setIsProcessing(false);
  setShowResults(true);
};



  const handleReset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setIsProcessing(false);
    setIsReadyToProcess(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] to-[#1F2933] relative">
      {/* Floating particle background */}
      <NeuralBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-6 py-12 max-w-7xl">
          {!uploadedImage ? (
            <InputSection onImageUpload={handleImageUpload} />
          ) : (
            <div className="space-y-16">
              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.1] text-[#E5E7EB] rounded-lg transition-all border border-white/[0.12] hover:border-white/[0.2]"
                >
                  Upload New Image
                </button>
              </div>
              
              {isReadyToProcess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-8"
                >
                  {/* Show uploaded image preview */}
                  <div className="max-w-2xl w-full bg-white/[0.06] backdrop-blur-md rounded-xl p-6 border border-white/[0.12]">
                    <p className="text-center text-[#9CA3AF] mb-4" style={{ fontWeight: 300 }}>
                      Uploaded Image Preview
                    </p>
                    <div className="aspect-[4/3] bg-[#0F172A]/50 rounded-lg overflow-hidden">
                      <img
                        src={uploadedImage}
                        alt="Uploaded gel electrophoresis"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Start Analysis Button */}
                  <button
                    onClick={handleStartProcess}
                    className="px-12 py-5 bg-[#8FBFB4]/20 backdrop-blur-md hover:bg-[#8FBFB4]/30 text-[#8FBFB4] text-xl rounded-xl transition-all border-2 border-[#8FBFB4]/40 hover:border-[#8FBFB4]/60 shadow-lg shadow-[#8FBFB4]/20 hover:shadow-[#8FBFB4]/30 hover:scale-105"
                    style={{ fontWeight: 300 }}
                  >
                    ▶ Start Analysis
                  </button>
                </motion.div>
              )}
              
              {!isReadyToProcess && (
                <ProcessingPipeline 
                  originalImage={uploadedImage} 
                  isProcessing={isProcessing}
                />
              )}
              
              {showResults && (
                <>
                  <DeepLearningPanel originalImage={uploadedImage} />
                  {analysisResult && (
  <ResultSection
    reconstructionError={analysisResult.error}
    threshold={analysisResult.threshold}
    result={analysisResult.result}
  />
)}

                </>
              )}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
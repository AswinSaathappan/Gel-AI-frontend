import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

/* 🔹 Props coming from backend */
interface ResultSectionProps {
  reconstructionError: number;
  threshold: number;
  result: "Normal" | "Anomalous";
}

export function ResultSection({
  reconstructionError,
  threshold,
  result
}: ResultSectionProps) {

  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  /* 🔹 Final decision */
  const isAnomalous = result === "Anomalous";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl text-[#E5E7EB]" style={{ fontWeight: 300 }}>
          📊 Analysis Result
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">

        {/* ================= Reconstruction Error Card ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -3 }}
          className="bg-white/[0.06] backdrop-blur-md rounded-xl p-7 border border-white/[0.12]"
        >
          <h3 className="text-lg text-[#E5E7EB] mb-6" style={{ fontWeight: 300 }}>
            Reconstruction Error
          </h3>

          <div className="text-center mb-8">
            <div
              className="text-6xl text-[#E5E7EB] mb-2"
              style={{ fontWeight: 200 }}
            >
              {reconstructionError.toFixed(4)}
            </div>
            <p className="text-sm text-[#9CA3AF]">Mean Squared Error</p>
          </div>

          {/* Threshold Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-[#9CA3AF]">
              <span>Threshold: {threshold.toFixed(4)}</span>
              <span>{((reconstructionError / 0.1) * 100).toFixed(0)}%</span>
            </div>

            <div className="relative h-2 bg-[#0F172A]/50 rounded-full overflow-hidden">
              {/* Threshold marker */}
              <div
                className="absolute top-0 bottom-0 w-px bg-white/40"
                style={{ left: `${(threshold / 0.1) * 100}%` }}
              ></div>

              {/* Error bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(reconstructionError / 0.1) * 100}%` }}
                transition={{ duration: 1.2 }}
                className="h-full rounded-full"
                style={{
                  background: isAnomalous
                    ? 'rgba(252, 165, 165, 0.6)'
                    : 'rgba(125, 211, 199, 0.6)'
                }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* ================= Final Decision Card ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/[0.06] backdrop-blur-md rounded-xl p-7 border border-white/[0.12]"
        >
          <div className="text-center">
            {isAnomalous ? (
              <AlertTriangle
                className="w-16 h-16 mx-auto mb-5"
                style={{ color: '#FCA5A5' }}
              />
            ) : (
              <CheckCircle2
                className="w-16 h-16 mx-auto mb-5"
                style={{ color: '#7DD3C7' }}
              />
            )}

            <p
              className="text-xl mb-2"
              style={{
                color: isAnomalous ? '#FCA5A5' : '#7DD3C7',
                fontWeight: 300
              }}
            >
              {isAnomalous
                ? '⚠️ Anomalous Pattern Detected'
                : '✅ Normal-like Electrophoresis Pattern'}
            </p>

            <p className="text-sm text-[#9CA3AF]">
              {isAnomalous
                ? 'Pattern deviates significantly from learned normal distributions'
                : 'Pattern lies within learned normal distributions'}
            </p>
          </div>
        </motion.div>

        {/* ================= Explainability Section ================= */}
        <div>
          <button
            onClick={() => setIsExplainerOpen(!isExplainerOpen)}
            className="w-full bg-white/[0.04] backdrop-blur-md rounded-xl p-4 border border-white/[0.08] flex justify-between items-center"
          >
            <span className="text-[#E5E7EB]">🔍 Why this result?</span>
            {isExplainerOpen ? (
              <ChevronUp className="text-[#7DD3C7]" />
            ) : (
              <ChevronDown className="text-[#7DD3C7]" />
            )}
          </button>

          <AnimatePresence>
            {isExplainerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white/[0.03] rounded-xl p-6 mt-3"
              >
                <ul className="text-sm text-[#9CA3AF] space-y-2">
                  {isAnomalous ? (
                    <>
                      <li>• High reconstruction error in band regions</li>
                      <li>• Irregular band spacing and intensity</li>
                      <li>• Poor autoencoder reconstruction</li>
                    </>
                  ) : (
                    <>
                      <li>• Reconstruction error below threshold</li>
                      <li>• Band patterns match learned distributions</li>
                      <li>• Consistent intensity and spacing</li>
                    </>
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

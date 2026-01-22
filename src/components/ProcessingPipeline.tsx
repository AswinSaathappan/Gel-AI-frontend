import { motion } from 'motion/react';
import { ArrowDown, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

interface ProcessingPipelineProps {
  originalImage: string;
  isProcessing: boolean;
}

export function ProcessingPipeline({ originalImage, isProcessing }: ProcessingPipelineProps) {
  // Generate mock processed images
  const processedImages = useMemo(() => ({
    original: originalImage,
    grayscale: originalImage,
    denoised: originalImage,
    edges: originalImage,
    bands: originalImage,
  }), [originalImage]);

  const steps = [
    { id: 'Step 1', title: 'Original Image', image: processedImages.original, filter: 'none' },
    { id: 'Step 2', title: 'Grayscale Conversion', image: processedImages.grayscale, filter: 'grayscale(100%)' },
    { id: 'Step 3', title: 'Noise Reduction', image: processedImages.denoised, filter: 'grayscale(100%) blur(0.5px)' },
    { id: 'Step 4', title: 'Edge Detection', image: processedImages.edges, filter: 'grayscale(100%) contrast(150%) brightness(80%)' },
    { id: 'Step 5', title: 'Band Extraction', image: processedImages.bands, filter: 'grayscale(100%) contrast(200%)' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl text-[#E5E7EB] flex items-center justify-center gap-3" style={{ fontWeight: 300 }}>
          <span>🧪</span>
          <span>Image Processing Pipeline</span>
        </h2>
      </div>

      <div className="relative">
        {/* Processing overlay */}
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md z-20 rounded-2xl flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[#7DD3C7] animate-spin mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-[#E5E7EB] text-lg" style={{ fontWeight: 300 }}>Processing image...</p>
            </div>
          </motion.div>
        )}

        {/* Vertical pipeline steps */}
        <div className="max-w-md mx-auto space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Step number and title above */}
              <div className="text-center">
                <p className="text-sm text-[#9CA3AF] mb-1">{step.id}</p>
                <p className="text-[#E5E7EB]" style={{ fontWeight: 300 }}>{step.title}</p>
              </div>

              {/* Image card with hover interaction */}
              <motion.div 
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
                className="bg-white/[0.06] backdrop-blur-md rounded-xl p-4 border border-white/[0.12] cursor-pointer group"
                style={{
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                  transition: 'box-shadow 0.25s ease-out, backdrop-filter 0.25s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 0 20px rgba(143, 191, 180, 0.05)';
                  e.currentTarget.style.backdropFilter = 'blur(24px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.backdropFilter = 'blur(20px)';
                }}
              >
                <div className="aspect-[4/3] bg-[#0F172A]/50 rounded-lg overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    style={{ filter: step.filter }}
                  />
                </div>
              </motion.div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                  className="flex justify-center py-2"
                >
                  <motion.div
                    animate={{ 
                      y: [0, 6, 0]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <ArrowDown className="w-5 h-5 text-[#8FBFB4]/60" strokeWidth={2} />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl p-5 max-w-3xl mx-auto"
        style={{
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)'
        }}
      >
        <p className="text-[#9CA3AF] text-center text-sm leading-relaxed" style={{ fontWeight: 300 }}>
          Classical image processing techniques are used to suppress background noise and isolate electrophoresis band structures before learning.
        </p>
      </motion.div>
    </div>
  );
}
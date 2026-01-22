import { motion } from 'motion/react';
import { Brain, Filter, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Methodology Overview Title */}
          <h3 className="text-2xl text-[#E5E7EB] text-center mb-10" style={{ fontWeight: 300 }}>
            Methodology Overview
          </h3>

          {/* Image Processing Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Filter className="w-5 h-5 text-[#7DD3C7]" strokeWidth={1.5} />
              </motion.div>
              <h4 className="text-base text-[#E5E7EB]" style={{ fontWeight: 300 }}>Image Processing</h4>
            </div>
            <div className="pl-8 text-sm text-[#9CA3AF]" style={{ fontWeight: 300 }}>
              Grayscale Conversion · Noise Reduction · Edge Detection · Morphological Background Removal · Band Enhancement
            </div>
          </div>

          {/* Deep Learning Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Brain className="w-5 h-5 text-[#7DD3C7]" strokeWidth={1.5} />
              </motion.div>
              <h4 className="text-base text-[#E5E7EB]" style={{ fontWeight: 300 }}>Deep Learning</h4>
            </div>
            <div className="pl-8 text-sm text-[#9CA3AF]" style={{ fontWeight: 300 }}>
              Unsupervised Convolutional Autoencoder · Reconstruction Error Analysis · Anomaly Heatmap Visualization
            </div>
          </div>

          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl p-6 mb-10"
            style={{
              boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)'
            }}
          >
            <p className="text-[#9CA3AF] text-center leading-relaxed" style={{ fontWeight: 300 }}>
              Electrophoresis band patterns are analyzed through structured image processing and unsupervised deep learning to detect deviations from learned distributions.
            </p>
          </motion.div>

          {/* Technology icons */}
          <div className="flex items-center justify-center gap-12 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div 
                className="w-12 h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.12] transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <Filter className="w-6 h-6 text-[#8FBFB4]" strokeWidth={1.5} />
                </motion.div>
              </div>
              <span className="text-xs text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors" style={{ fontWeight: 300 }}>
                Image Processing
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              
              <div 
                className="w-12 h-12 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center group-hover:border-white/[0.12] transition-all duration-300"
              >
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Cpu className="w-6 h-6 text-[#8FBFB4]" strokeWidth={1.5} />
                </motion.div>
              </div>
              <span className="text-xs text-[#6B7280] group-hover:text-[#9CA3AF] transition-colors" style={{ fontWeight: 300 }}>
  CNN Autoencoder
</span>

            </motion.div>
          </div>

          {/* Minimal divider */}
          <div className="relative h-px max-w-md mx-auto bg-white/[0.06]"></div>
        </motion.div>
      </div>
    </footer>
  );
}
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.08]">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            {/* Pulsing scientific icon */}
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Activity 
                className="w-10 h-10 text-[#8FBFB4]" 
                strokeWidth={1}
              />
            </motion.div>
            
            <h1 className="text-5xl text-[#E5E7EB] tracking-tight" style={{ fontWeight: 300 }}>
              Gel Electrophoresis Pattern Analyzer
            </h1>
          </div>
          
          <p className="text-lg text-[#9CA3AF] tracking-wide" style={{ letterSpacing: '0.05em' }}>
            Image Processing and Deep Learning based Anomaly Detection
          </p>
          
          {/* Minimal divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-10 h-[1px] max-w-md mx-auto bg-white/[0.1]"
          />
        </motion.div>
      </div>
    </header>
  );
}
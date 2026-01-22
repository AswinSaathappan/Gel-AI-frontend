import { motion } from 'motion/react';

interface DeepLearningPanelProps {
  originalImage: string;
}

export function DeepLearningPanel({ originalImage }: DeepLearningPanelProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl text-[#E5E7EB] flex items-center justify-center gap-3" style={{ fontWeight: 300 }}>
          <span>🧠</span>
          <span>Deep Learning Analysis</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Autoencoder Reconstruction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ 
            y: -3,
            transition: { duration: 0.25, ease: "easeOut" }
          }}
          className="bg-white/[0.06] backdrop-blur-md rounded-xl p-6 border border-white/[0.12] cursor-pointer"
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
          <h3 className="text-lg text-[#E5E7EB] mb-6" style={{ fontWeight: 300 }}>
            Autoencoder Reconstruction
          </h3>

          <div className="space-y-5">
            {/* Original */}
            <div>
              <p className="text-xs text-[#9CA3AF] mb-2">Input Band Image</p>
              <div 
                className="aspect-[4/3] bg-[#0F172A]/50 rounded-lg overflow-hidden"
              >
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(200%)' }}
                />
              </div>
            </div>

            {/* Reconstructed */}
            <div>
              <p className="text-xs text-[#9CA3AF] mb-2">Reconstructed Image</p>
              <div 
                className="aspect-[4/3] bg-[#0F172A]/50 rounded-lg overflow-hidden relative"
              >
                <img
                  src={originalImage}
                  alt="Reconstructed"
                  className="w-full h-full object-cover"
                  style={{ filter: 'grayscale(100%) contrast(180%) blur(0.5px)' }}
                />
                <div className="absolute inset-0 bg-[#7DD3C7]/[0.03]"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Anomaly Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          whileHover={{ 
            y: -3,
            transition: { duration: 0.25, ease: "easeOut" }
          }}
          className="bg-white/[0.06] backdrop-blur-md rounded-xl p-6 border border-white/[0.12] cursor-pointer"
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
          <h3 className="text-lg text-[#E5E7EB] mb-6" style={{ fontWeight: 300 }}>
            Anomaly Heatmap
          </h3>

          <div>
            <p className="text-xs text-[#9CA3AF] mb-2">Deviation Regions</p>
            <div 
              className="aspect-[4/3] bg-[#0F172A]/50 rounded-lg overflow-hidden relative"
            >
              <img
                src={originalImage}
                alt="Heatmap"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(200%)' }}
              />
              
              {/* Soft heatmap overlay */}
              <div 
                className="absolute inset-0 mix-blend-screen opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(253, 224, 71, 0.3) 0%, rgba(252, 165, 165, 0.3) 100%)'
                }}
              ></div>
              
              {/* Subtle anomaly spots */}
              <motion.div
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(252, 165, 165, 0.5) 0%, transparent 70%)'
                }}
              ></motion.div>
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-1/3 w-20 h-12 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, transparent 70%)'
                }}
              ></motion.div>
            </div>

            {/* Heatmap legend */}
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-[#9CA3AF]">Low</span>
              <div 
                className="flex-1 h-1.5 mx-4 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(125, 211, 199, 0.2) 0%, rgba(253, 224, 71, 0.4) 50%, rgba(252, 165, 165, 0.5) 100%)'
                }}
              ></div>
              <span className="text-[#FCA5A5]">High</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Caption */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl p-5 max-w-4xl mx-auto"
        style={{
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)'
        }}
      >
        <p className="text-[#9CA3AF] text-center text-sm leading-relaxed" style={{ fontWeight: 300 }}>
          An unsupervised autoencoder learns dominant band patterns and reconstructs unseen samples.
        </p>
      </motion.div>
    </div>
  );
}
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';

interface InputSectionProps {
  onImageUpload: (imageUrl: string) => void;
}

export function InputSection({ onImageUpload }: InputSectionProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-2xl mx-auto mt-24"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl text-[#E5E7EB] mb-2" style={{ fontWeight: 300 }}>
          Upload Gel Electrophoresis Image
        </h2>
        <p className="text-sm text-[#9CA3AF]">(PNG / JPG)</p>
      </div>

      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative block rounded-2xl p-20 cursor-pointer
          transition-all duration-300 group
          ${isDragging 
            ? 'bg-white/[0.12] border-white/[0.2]' 
            : 'bg-white/[0.06] border-white/[0.12] hover:bg-white/[0.08] hover:border-white/[0.16]'
          }
        `}
        style={{
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          boxShadow: isDragging 
            ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
            : '0 4px 24px rgba(0, 0, 0, 0.08)',
          transform: isDragging ? 'translateY(-3px)' : 'translateY(0)'
        }}
      >
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-center">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-block mb-5"
          >
            <Upload 
              className="w-16 h-16 mx-auto text-[#8FBFB4]" 
              strokeWidth={1}
            />
          </motion.div>
          
          <p className="text-lg text-[#E5E7EB] mb-1" style={{ fontWeight: 300 }}>
            {isDragging ? 'Drop image here' : 'Drag & drop your image'}
          </p>
          <p className="text-sm text-[#9CA3AF]">
            or click to browse
          </p>
        </div>

        {/* Glass reflection */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
          }}
        />
      </label>
    </motion.div>
  );
}
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImagePreviewProps {
  src?: string;
  alt: string;
  className?: string;
}

const PLACEHOLDER_IMAGE = '/placeholder.svg';

export function ImagePreview({ src, alt, className = '' }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const imageSrc = src || PLACEHOLDER_IMAGE;
  const hasImage = !!src;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`relative w-12 h-12 rounded border border-border overflow-hidden bg-muted flex items-center justify-center hover:opacity-80 transition-opacity ${className}`}
      >
        {hasImage ? (
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="flex items-center justify-center p-4">
            {hasImage ? (
              <img
                src={imageSrc}
                alt={alt}
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-muted-foreground">
                <ImageIcon className="h-16 w-16" />
                <p>No image available</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

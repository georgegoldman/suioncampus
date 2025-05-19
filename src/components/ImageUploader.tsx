import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function useImageUploader(onUploadSuccess: (url: string) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'suioncampus');
    formData.append('cloud_name', 'georgegoldman');

    try {
      setLoading(true);
      const response = await fetch('https://api.cloudinary.com/v1_1/georgegoldman/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        toast({
          title: 'Image uploaded successfully!',
          description: 'Your image has been uploaded to Cloudinary.',
        });
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (err) {
      console.log(err);
      setError('Failed to upload image.');
      toast({
        title: 'Error',
        description: 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const FileInput = () => (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleUpload}
      disabled={loading}
      style={{ display: 'none' }}
    />
  );

  return {
    FileInput,
    triggerFileInput,
    loading,
    error
  };
}